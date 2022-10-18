import { useContext, useEffect, useMemo } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link } from '@mui/material';

import { CartContext } from '../../context';

// Layout:
import { ShopLayout } from '../../components/layouts';

// Components:
import { CartList, OrderSummary } from '../../components/cart';
import { FullScreenLoading } from '../../components/ui';

import { countries, isValidToken } from '../../utils';



export const SummaryPage: NextPage = () => {

    const { numberOfItems, shippingAddress } = useContext(CartContext);

    const router = useRouter();

    useEffect(() => {

        if (numberOfItems <= 0 || !shippingAddress) {
            router.replace('/');
        }
    }, []);

    if (numberOfItems <= 0 || !shippingAddress) return (<FullScreenLoading />);

    const { firstName, lastName, address, address2, city, country, state, zip, phone } = shippingAddress;
    const selectedCountry = useMemo(() => countries.find(c => c.code === country), [country]);


    return (
        <ShopLayout title='Resumen de la orden' pageDescription='Resumen de la orden'>

            <Typography variant='h1' component='h1' sx={{ mb: 4, textAlign: 'center' }}>Resumen de la orden</Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card' sx={{ padding: '5px 10px' }}>
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

                            <Box sx={{ mt: 3 }}>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Confirmar Orden
                                </Button>
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
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