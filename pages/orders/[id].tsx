import { useMemo, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { PayPalButtons } from '@paypal/react-paypal-js';

// MUI:
import { Box, Card, CardContent, Divider, Grid, Typography, Link, Chip, CircularProgress } from '@mui/material';

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
import { tesloApi } from '../../config';


interface Props {
    order: IOrder;
    id: string;
}

interface OrderResponseBody {
    id: string;
    status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
}

export const OrderPage: NextPage<Props> = ({ order, id }) => {

    const [isPaying, setIsPaying] = useState(false);
    const router = useRouter();

    const { numberOfItems, subtotal, total, taxRate, _id, shippingAddress, isPaid, orderItems } = order;
    const { firstName, lastName, address, address2, city, country, zip, state, phone } = shippingAddress;

    const orderPropsValues = { numberOfItems, subtotal, taxRate, total };
    const selectedCountry = useMemo(() => countries.find(c => c.code === country), [country]);


    const onOrderCompleted = async (details: OrderResponseBody) => {

        if (details.status !== 'COMPLETED') {
            return alert('No hay pago en paypal');
        }

        setIsPaying(true);

        try {

            const { data } = await tesloApi.post('/orders/pay', {
                transactionId: details.id,
                orderId: order._id,
                userId: id
            });

            console.log({ data });

            router.reload();

        } catch (error) {
            setIsPaying(false);
            console.log(error);
            alert('Error!');
        }
    }

    return (
        <ShopLayout title={`Orden No: ${_id}`} pageDescription={`Estado de la orden No: ${_id}`} >

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

                            <Box sx={{ display: 'block', mt: 3, width: '100%' }}>

                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{ display: isPaying ? 'flex' : 'none' }}>
                                    <CircularProgress />
                                </Box>


                                <Box sx={{ display: isPaying ? 'none' : 'block' }}>
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
                                                <PayPalButtons

                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [
                                                                {
                                                                    amount: {
                                                                        value: total.toString(),
                                                                    },
                                                                },
                                                            ],
                                                        });
                                                    }}
                                                    onApprove={(data, actions) => {
                                                        return actions.order!.capture().then((details) => {
                                                            onOrderCompleted(details);
                                                        });
                                                    }}
                                                />
                                            )
                                    }
                                </Box>


                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout >
    )
}

export default OrderPage;


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query as { id: string };
    const session: any = await getSession({ req });
    console.log(session);

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
            order,
            id: session.user.id
        }
    }
}