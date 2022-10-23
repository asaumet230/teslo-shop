import { useContext, useEffect, useMemo, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link, Chip } from '@mui/material';

import { CartContext } from '../../context';

// Layout:
import { ShopLayout } from '../../components/layouts';

// Components:
import { CartList, OrderSummary } from '../../components/cart';
import { FullScreenLoading } from '../../components/ui';

import { countries, isValidToken } from '../../utils';



export const SummaryPage: NextPage = () => {

    const { numberOfItems, shippingAddress, createOrder } = useContext(CartContext);

    const [isPosting, setIsPosting] = useState(false);
    const [hasErrorMessage, setHasErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    useEffect(() => {

        if (!shippingAddress) {
            router.replace('/checkout/address');
        }
    }, []);

    if (!shippingAddress) return (<FullScreenLoading />);

    const { firstName, lastName, address, address2, city, country, state, zip, phone } = shippingAddress!;
    const selectedCountry = useMemo(() => countries.find(c => c.code === country), [country]);

    const onCreateOrder = async () => {

        setIsPosting(true);
        const { hasError, message } = await createOrder();

        if (hasError) {
            setIsPosting(false);
            setHasErrorMessage(true);
            setErrorMessage(message);
            return;
        }


        router.replace(`/orders/${message}`);
    }


    return (
        <ShopLayout title='Resumen de la orden' pageDescription='Resumen de la orden'>

            <Typography variant='h1' component='h1' sx={{ mb: 4, textAlign: 'center' }}>Resumen de la orden</Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card' sx={{ padding: '5px 10px' }}>

                        <form onSubmit={onCreateOrder}>
                            <CardContent>

                                <Typography variant='h2' fontWeight={500}>Resumen ({`${numberOfItems}  ${numberOfItems === 1 ? 'Producto' : 'Productos'}`})</Typography>
                                <Divider sx={{ my: 1 }} />

                                <Box display='flex' justifyContent='space-between' mt={2}>
                                    <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                    <NextLink href='/checkout/address' passHref>
                                        <Link underline='always' color='secondary' >
                                            Editar
                                        </Link>
                                    </NextLink>
                                </Box>


                                <Typography>{`${firstName}  ${lastName}`}</Typography>
                                <Typography>{`${address} ${address2 ? `, ${address2}` : ''}`}</Typography>
                                <Typography>{`${city} - ${state}, zip code: ${zip}`}</Typography>
                                <Typography>{selectedCountry?.name}</Typography>
                                <Typography mb={2}>{phone}</Typography>

                                <Divider sx={{ my: 1 }} />

                                <Box display='block' textAlign='end'>
                                    <NextLink href='/cart' passHref>
                                        <Link underline='always' color='secondary' >
                                            Editar
                                        </Link>
                                    </NextLink>
                                </Box>

                                <OrderSummary />

                                <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                                    <Button
                                        disabled={isPosting}
                                        onClick={onCreateOrder}
                                        color='secondary'
                                        className='circular-btn'
                                        fullWidth>
                                        Confirmar Orden
                                    </Button>

                                    {
                                        hasErrorMessage && (
                                            <Chip
                                                color="error"
                                                label={errorMessage}
                                                sx={{ display: errorMessage ? 'flex' : 'none', mt: 1 }}
                                            />
                                        )
                                    }

                                </Box>

                            </CardContent>
                        </form>
                    </Card>
                </Grid>

            </Grid >

        </ShopLayout >
    )
}

export default SummaryPage;


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false
            }
        }
    }

    // const { token = '' } = req.cookies;
    // let userId = '';
    // let hasValidToken = false;

    // if (token.length === 0) {
    //     return {
    //         redirect: {
    //             destination: '/auth/login?p=/checkout/summary',
    //             permanent: false
    //         }
    //     }
    // }

    // try {

    //     userId = await isValidToken(token);
    //     hasValidToken = true;

    // } catch (error) {
    //     hasValidToken = false;
    // }


    // if (!hasValidToken) {

    //     return {
    //         redirect: {
    //             destination: '/auth/login?p=/checkout/summary',
    //             permanent: false
    //         }
    //     }
    // }


    return {
        props: {

        }
    }
}