import React, { useState, useEffect, useRef } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import useSWR from 'swr';

import { getSession } from 'next-auth/react';
import { Grid, Typography } from '@mui/material';

import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import CancelPresentationOutlined from '@mui/icons-material/CancelPresentationOutlined';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import CreditCardOutlined from '@mui/icons-material/CreditCardOutlined';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import GroupOutlined from '@mui/icons-material/GroupOutlined';
import ProductionQuantityLimitsOutlined from '@mui/icons-material/ProductionQuantityLimitsOutlined';

import { AdminLayout } from '../../components/layouts';
import { SummaryTile } from '../../components/admin';


import { DashsboardInsights } from '../../interfaces';


const DashboardPage: NextPage = () => {


    const { data, error } = useSWR<DashsboardInsights>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000 // 30 seg
    });

    const [refreshIn, setRefreshIn] = useState(30);
    const ref = useRef<NodeJS.Timer>();

    useEffect(() => {
        ref.current = setInterval(() => {
            return setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30);
        }, 1000);

        return () => clearInterval(ref.current);

    }, []);


    if (!data && !error) {
        return <></>;
    }

    if (error) {
        console.log(error);
        return <Typography>Error al cargar la información</Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        notPaidORders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory, } = data!;


    return (
        <AdminLayout
            title='Dashboard'
            subTitle='Estadisticas Generales'
            icon={<DashboardOutlined />} >

            <Grid container spacing={2} paddingTop={4}>
                <SummaryTile
                    title={numberOfOrders}
                    subTitle='Ordenes Totales'
                    icon={<CreditCardOutlined sx={{ fontSize: 40 }} color='secondary' />} />

                <SummaryTile
                    title={paidOrders}
                    subTitle='Ordenes pagadas'
                    icon={<AttachMoneyOutlined sx={{ fontSize: 40 }} color='success' />} />

                <SummaryTile
                    title={notPaidORders}
                    subTitle='Ordenes pendientes'
                    icon={<CreditCardOffOutlined sx={{ fontSize: 40 }} color='error' />} />

                <SummaryTile
                    title={numberOfClients}
                    subTitle='Clientes'
                    icon={<GroupOutlined sx={{ fontSize: 40 }} color='primary' />} />

                <SummaryTile
                    title={numberOfProducts}
                    subTitle='Productos'
                    icon={<CategoryOutlined sx={{ fontSize: 40 }} color='warning' />} />

                <SummaryTile
                    title={productsWithNoInventory}
                    subTitle='Sin existencias'
                    icon={<CancelPresentationOutlined sx={{ fontSize: 40 }} color='error' />} />

                <SummaryTile
                    title={lowInventory}
                    subTitle='Bajo Inventario'
                    icon={<ProductionQuantityLimitsOutlined sx={{ fontSize: 40 }} color='warning' />} />

                <SummaryTile
                    title={refreshIn}
                    subTitle='Actualización en'
                    icon={<AccessTimeOutlined sx={{ fontSize: 40 }} color='secondary' />} />

            </Grid>

        </AdminLayout >
    )
}

export default DashboardPage;



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