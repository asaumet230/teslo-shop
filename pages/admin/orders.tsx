import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import useSWR from 'swr';
import { getSession } from 'next-auth/react';
import dayjs from 'dayjs';

import { Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';

import { AdminLayout } from '../../components/layouts';
import { IOrder, IUser } from '../../interfaces';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'Orden Id', width: 250 },
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre', width: 250 },
    { field: 'total', headerName: 'Monto Total', width: 150 },
    {
        field: 'isPaid',
        headerName: 'Estado',
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                row.isPaid ?
                    (
                        <Chip
                            sx={{ my: 2 }}
                            label='Pagada'
                            variant='outlined'
                            color='success'
                            icon={<CreditScoreOutlined />}
                        />
                    )
                    :
                    (
                        <Chip
                            sx={{ my: 2 }}
                            label='Pendiente'
                            variant='outlined'
                            color='error'
                            icon={<CreditCardOffOutlined />}
                        />)
            )
        },
        width: 150
    },
    { field: 'noProducts', headerName: 'No. Productos', width: 150, align: 'center' },
    {
        field: 'check',
        headerName: 'Ver orden',
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>Ver orden</a>
            )
        }
    },
    { field: 'createdAt', headerName: 'Creada en:', width: 200, align: 'center' },
];


const ordersPage: NextPage = () => {


    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if (!data && !error) {
        return <></>;
    }

    if (error) {
        console.log(error);
        return <Typography>Error al cargar la información</Typography>
    }

    const rows = data!.map(({ _id, user, total, isPaid, numberOfItems, createdAt }) => ({
        id: _id,
        email: (user as IUser).email,
        name: `${(user as IUser).firstName} ${(user as IUser).lastName}`,
        total: `$${total} USD`,
        isPaid,
        noProducts: numberOfItems,
        createdAt: dayjs(createdAt).format('YYYY-MM-DD')
    }));

    return (
        <AdminLayout
            title='Ordenes'
            subTitle='Ordenes de clientes'
            icon={<ConfirmationNumberOutlined />}>

            <Grid container className='fadeIn' paddingTop={3}>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows!}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>

        </AdminLayout>
    )
}

export default ordersPage;


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({ req });

    if (session?.user.role !== 'ADMIN_ROLE') {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}