import React, { useState, useEffect } from 'react';

import { NextPage, GetServerSideProps } from 'next';
import useSWR from 'swr';
import { getSession } from 'next-auth/react';


import { Grid, MenuItem, Select, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import PeopleOutline from '@mui/icons-material/PeopleOutline';

import { AdminLayout } from '../../components/layouts';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../config';



const UsersPage: NextPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {

        if (data) {
            setUsers(data);
        }

    }, [data]);


    if (!data && !error) {
        return <></>;
    }

    if (error) {
        console.log(error);
        return <Typography>Error al cargar la información</Typography>
    }


    const onRoleUpdated = async (userId: string, newRole: string) => {

        const previousUsers = users.map(user => ({ ...user }));

        const upatedUsers = users.map(user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }));

        setUsers(upatedUsers);

        try {

            await tesloApi.put('/admin/users', { userId, role: newRole });


        } catch (error) {
            setUsers(previousUsers);
            console.log(error);
            alert('No se pudo actualizar el perfil del usuario');

        }
    }

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nombre', width: 300 },
        { field: 'email', headerName: 'Correo', width: 250 },
        {
            field: 'role',
            headerName: 'Perfil',
            width: 250,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Select
                        value={row.role}
                        label='Perfil'
                        onChange={(event) => onRoleUpdated(row.id, event.target.value)}
                        sx={{ width: '250px' }}
                    >
                        <MenuItem value={'ADMIN_ROLE'}>Administrador</MenuItem>
                        <MenuItem value={'USER_ROLE'}>Cliente</MenuItem>
                        <MenuItem value={'SALES_ROLE'}>Vendedor</MenuItem>
                    </Select>
                )
            }
        },


    ];

    const rows = users.map(({ _id, email, firstName, lastName, role }) => ({
        id: _id,
        name: `${firstName} ${lastName}`,
        email,
        role
    }));


    return (
        <AdminLayout
            title='Usuarios'
            subTitle='Mantenimiento de usuarios'
            icon={<PeopleOutline />}>

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

export default UsersPage;

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