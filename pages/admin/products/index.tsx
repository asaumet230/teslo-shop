import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';
import useSWR from 'swr';
import { getSession } from 'next-auth/react';

import { CardMedia, Grid, Link, Typography, Box, Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import AddBoxOutlined from '@mui/icons-material/AddBoxOutlined';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { AdminLayout } from '../../../components/layouts';
import { IProducts } from '../../../interfaces';


const columns: GridColDef[] = [
    {
        field: 'img',
        headerName: 'Imagen',
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer' >
                    <CardMedia
                        component='img'
                        alt={`${row.title}`}
                        className='fadeIn'
                        image={row.img.includes('https') ? `${row.img}` : `/products/${row.img}`}
                    />
                </a>
            )
        }
    },
    {
        field: 'title',
        headerName: 'Titulo',
        width: 300,
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <NextLink href={`/product/${row.slug}`} passHref>
                    <Link underline='always' target='_blank' rel='noreferrer'>
                        {row.title}
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'gender', headerName: 'Género' },
    { field: 'type', headerName: 'Tipo' },
    { field: 'inStock', headerName: 'Inventario' },
    { field: 'price', headerName: 'Precio' },
    { field: 'sizes', headerName: 'Tallas', width: 250 },
    {
        field: 'edit',
        headerName: 'Editar',
        width: 300,
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <NextLink href={`/admin/products/${row.slug}`} passHref>
                    <Link underline='none'>
                        <Button
                            endIcon={<EditOutlinedIcon />}
                            sx={{ backgroundColor: '#e2e2e2' }}>
                            Editar
                        </Button>
                    </Link>
                </NextLink>
            )
        }
    }
];


const ProductsPage: NextPage = () => {


    const { data, error } = useSWR<IProducts[]>('/api/admin/products');

    if (!data && !error) {
        return <></>;
    }

    if (error) {
        console.log(error);
        return <Typography>Error al cargar la información</Typography>
    }

    const rows = data!.map((product) => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        price: `$${product.price} USD`,
        inStock: product.inStock,
        sizes: product.sizes.join(', '),
        slug: product.slug
    }));

    return (
        <AdminLayout
            title={`Productos ${data?.length} `}
            subTitle='Mantenimiento de productos'
            icon={<CategoryOutlined />}>

            <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
                <NextLink href='/admin/products/new' passHref>
                    <Link>
                        <Button
                            startIcon={<AddBoxOutlined />}
                            color='secondary'>
                            Crear Producto
                        </Button>
                    </Link>
                </NextLink>
            </Box>

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

export default ProductsPage;


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