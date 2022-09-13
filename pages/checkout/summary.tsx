import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link } from '@mui/material';

// Layout:
import { ShopLayout } from '../../components/layouts';

// Components:
import { CartList, OrderSummary } from '../../components/cart';


export const SummaryPage: NextPage = () => {

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

                            <Typography variant='h2' fontWeight={500}>Resumen (3 productos)</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between' mt={2}>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always' color='secondary' >
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>


                            <Typography>Andres Felipe Saumet</Typography>
                            <Typography>Calle 26 No 2A-36</Typography>
                            <Typography>Santa Marta - Magdalena, zip 470006</Typography>
                            <Typography>Colombia</Typography>
                            <Typography mb={2}>+605-3017826682</Typography>

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