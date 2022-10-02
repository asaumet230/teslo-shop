import { NextPage } from 'next';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';

// Layout:
import { ShopLayout } from '../../components/layouts';

// Components:
import { CartList, OrderSummary } from '../../components/cart';


export const CartPage: NextPage = () => {

   

    return (
        <ShopLayout title={'Carrito - 3'} pageDescription={'Carrito de compras'}>

            <Typography variant='h1' component='h1' sx={{ mb: 4, textAlign: 'center' }}>Carrito</Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} sm={7}>
                    <CartList editable={true} />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className='summary-card' sx={{ padding: '5px 10px' }}>
                        <CardContent>

                            <Typography variant='h2' fontWeight={500}>Orden</Typography>
                            <Divider sx={{ my: 1 }} />

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Checkout
                                </Button>
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default CartPage;