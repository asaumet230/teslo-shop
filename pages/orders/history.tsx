import { NextPage } from 'next';
import NextLink from 'next/link';

// MUI:
import { Chip, Grid, Typography, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Layout:
import { ShopLayout } from '../../components/layouts';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Estado',
        description: 'Muestra el estado de pago de la orden',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {

            return (
                params.row.paid ?
                    (<Chip color='success' label='Pagada' variant='outlined' />) : (<Chip color='error' label='No Pagada' variant='outlined' />)
            )
        }
    },
    {
        field: 'order',
        headerName: 'Orden Número',
        width: 300,
        description: 'Número d la orden',
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always' color='secondary'>
                        {`Ver orden ${params.row.id}`}
                    </Link>
                </NextLink>
            )
        }
    },
];

const rows = [
    { id: 1, paid: true, fullName: 'Andres Felipe Saumet' },
    { id: 2, paid: false, fullName: 'Laura Davila' },
    { id: 3, paid: true, fullName: 'Luciana Saumet' },
    { id: 4, paid: false, fullName: 'Armando Saumet' },
    { id: 5, paid: true, fullName: 'Rosalina Saumet' },
    { id: 6, paid: true, fullName: 'Luz Teresa Saumet' },
    { id: 7, paid: true, fullName: 'Miguel Angel Salcedo' },
    { id: 8, paid: false, fullName: 'Leonila Buitron' },
    { id: 9, paid: true, fullName: 'Patricia Perdomo' },
    { id: 10, paid: true, fullName: 'Julio Saumet' },
];


export const HistoryPage: NextPage = () => {
    return (
        <ShopLayout title='Historial - Compras' pageDescription='Historial de compras'>
            <Typography
                variant='h1'
                component='h1'
                my={2}
                textAlign='center'
            >Historial de Compras</Typography>

            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default HistoryPage;