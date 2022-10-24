import { useMemo } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';

// MUI:
import { Box, Card, CardContent, Divider, Grid, Typography, Link, Chip } from '@mui/material';

// Icons:
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';

// Layout:
import { ShopLayout } from '../../components/layouts';

// Components:
import { CartList, OrderSummary } from '../../components/cart';

import { getOrderById } from '../../database/dbOrders';

import { IOrder } from '../../interfaces';
import { countries } from '../../utils';


interface Props {
    order: IOrder;
}

export const OrderPage: NextPage<Props> = ({ order }) => {


    const { numberOfItems, subtotal, total, taxRate, _id, shippingAddress, isPaid, orderItems } = order;
    const { firstName, lastName, address, address2, city, country, zip, state, phone } = shippingAddress;

    const orderPropsValues = { numberOfItems, subtotal, taxRate, total };
    const selectedCountry = useMemo(() => countries.find(c => c.code === country), [country]);

    return (
        <ShopLayout title='Orden No: 12343536' pageDescription='Orden No: 12343536'>

            <Typography variant='h1' component='h1' sx={{ mb: 4, textAlign: 'center' }}>Orden No: {_id}</Typography>

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

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
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
                                        ) : (
                                            <h1>Pagar</h1>
                                        )
                                }

                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default OrderPage;


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query as { id: string };
    const session: any = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false
            }
        }
    }

    const order = await getOrderById(id);

    if (!order) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }

    if (order.user !== session.user.id) {
        return {
            redirect: {
                destination: '/orders/history',
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