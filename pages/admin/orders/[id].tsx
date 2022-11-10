import React, { useMemo } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { Typography, Chip, Grid, Card, CardContent, Divider, Box, CircularProgress } from '@mui/material';

import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';

import { AdminLayout } from '../../../components/layouts';
import { CartList, OrderSummary } from '../../../components/cart';

import { IOrder } from '../../../interfaces';
import { getOrderById } from '../../../database';

import { countries } from '../../../utils';

interface Props {
    order: IOrder;
}

const AdminOrderIdPage: NextPage<Props> = ({ order }) => {

    const { numberOfItems, subtotal, total, taxRate, _id, shippingAddress, isPaid, orderItems } = order;
    const { firstName, lastName, address, address2, city, country, zip, state, phone } = shippingAddress;

    const orderPropsValues = { numberOfItems, subtotal, taxRate, total };
    const selectedCountry = useMemo(() => countries.find(c => c.code === country), [country]);

    return (
        <AdminLayout title={`Orden No:${_id}`} subTitle='Información de la orden' icon={<StickyNote2OutlinedIcon />}>
            {

                !isPaid ?
                    (<Chip
                        sx={{ my: 2 }}
                        label='Pendiente de pago'
                        variant='outlined'
                        color='error'
                        icon={<CreditCardOffOutlined />}
                    />) : (

                        <Chip
                            sx={{ my: 2 }}
                            label='Orden Pagada'
                            variant='outlined'
                            color='success'
                            icon={<CreditScoreOutlined />}
                        />
                    )
            }

            <Grid container spacing={3} className='fadeIn'>

                <Grid item xs={12} sm={7}>
                    <CartList products={orderItems} />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card' sx={{ padding: '5px 10px' }}>
                        <CardContent>

                            <Typography variant='h2' fontWeight={500}>{numberOfItems > 1 ? (`Resumen: (${numberOfItems} productos)`) : (`Resumen: (${numberOfItems} producto)`)}</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Typography sx={{ textTransform: 'capitalize' }}>{`${firstName} ${lastName}`}</Typography>
                            <Typography sx={{ textTransform: 'capitalize' }}>{address2 ? `${address}, ${address2}` : `${address}`}</Typography>
                            <Typography sx={{ textTransform: 'capitalize' }}>{`${city} - ${state}, zip ${zip}`}</Typography>
                            <Typography sx={{ textTransform: 'capitalize' }}>{selectedCountry?.name}</Typography>
                            <Typography mb={2} sx={{ textTransform: 'capitalize' }}>{phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <OrderSummary orderPropsValues={orderPropsValues} />

                            <Box sx={{ display: 'block', mt: 3, width: '100%' }}>

                                <Box>
                                    {
                                        isPaid ?
                                            (
                                                <Chip
                                                    sx={{ my: 2 }}
                                                    label='Orden Pagada'
                                                    variant='outlined'
                                                    color='success'
                                                    icon={<CreditScoreOutlined />}
                                                />
                                            ) : <Chip
                                                sx={{ my: 2 }}
                                                label='Pendiente de Pago'
                                                variant='outlined'
                                                color='error'
                                                icon={<CreditCardOffOutlined />}
                                            />
                                    }
                                </Box>


                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>


        </AdminLayout>
    )
}

export default AdminOrderIdPage;

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query as { id: string };
    const session: any = await getSession({ req });


    if (session?.user.role !== 'ADMIN_ROLE') {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const order = await getOrderById(id);

    if (!order) {
        return {
            redirect: {
                destination: '/admin/orders',
                permanent: false
            }
        }
    }

    return {
        props: {
            order
        }
    }
}