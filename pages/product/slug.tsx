import { NextPage } from "next";

// MUI:
import { Box, Grid, Typography, Button, Chip } from "@mui/material";

// Layout:
import { ShopLayout } from "../../components/layouts";

// Components:
import { ProductSlideShow } from '../../components/products';


// Example Data:
import { initialData } from '../../database/products';


// Product:
const product = initialData.products[0];


export const slug: NextPage = () => {
    return (
        <ShopLayout title={product.title} pageDescription={product.description}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={7}>
                    <ProductSlideShow images={product.images} />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>

                        <Typography variant='h1' component='h1'>{product.title}</Typography>
                        <Typography variant='subtitle1' component='h2'>{`$ ${product.price}`}</Typography>

                        <Box sx={{ my: 2 }}>
                            <Typography variant='subtitle2'>Cantidad</Typography>
                            {/* /TODO: ItemCounter */}
                        </Box>

                        <Button color='secondary' className='circular-btn'>
                            Agregar a carrito
                        </Button>

                        <Chip label="No hay disponibles" color="error" variant="outlined" sx={{ mt: 1 }} />

                        <Box sx={{ mt: 3 }}>
                            <Typography variant='subtitle2'>Descripción:</Typography>
                            <Typography variant='body2' sx={{ textAlign: 'justify' }}>{product.description}</Typography>
                        </Box>

                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default slug;