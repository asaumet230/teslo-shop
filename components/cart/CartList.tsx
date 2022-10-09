import { FC, useContext } from 'react';
import NextLink from 'next/link';

// MUI:
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

// Context:
import { CartContext } from '../../context';

// Components:
import { ItemCounter } from '../ui';

// Interfaces:
import { ICartProduct } from '../../interfaces';

// Test Data:
//import { initialData } from '../../database/products';

// const porductsInCart = [

//     initialData.products[0],
//     initialData.products[1],
//     initialData.products[2],
// ]

interface Props {
    editable?: boolean;
}


export const CartList: FC<Props> = ({ editable = false }) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    const onProductQuantityUpdated = (product: ICartProduct, quantity: number) => {

        product.quantity = quantity;
        updateCartQuantity(product);
    }

    const removeProductInCart = (product: ICartProduct) => {
        removeCartProduct(product);
    }


    return (
        <>
            {
                cart.map(product => (

                    <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>

                        <Grid item xs={3}>

                            <NextLink href={`/product/${product.slug}`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.image}`}
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>

                        </Grid>

                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>

                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'> Talla <strong>{product.size}</strong> </Typography>

                                {
                                    editable ?
                                        (
                                            <ItemCounter
                                                maxValue={product.maxQuantity}
                                                onQuantitySelected={(value) => onProductQuantityUpdated(product, value)}
                                                currentValue={product.quantity} />
                                        )
                                        :
                                        <Typography
                                            variant='h6'> {product.quantity} {product.quantity > 1 ? 'Productos' : 'Producto'} </Typography>
                                }


                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' flexDirection='column' alignItems='column'>

                            <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>{`$${product.price}`}</Typography>

                            {
                                editable && (
                                    <Button variant='text' color='secondary' onClick={() => removeProductInCart(product)}>
                                        Remover
                                    </Button>
                                )
                            }

                        </Grid>

                    </Grid>
                ))
            }
        </>
    )
}

export default CartList;