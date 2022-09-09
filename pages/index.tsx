import type { NextPage } from 'next';
import { Typography, Grid, Card, CardActionArea, CardMedia } from '@mui/material';

//Components:
import { ShopLayout } from '../components/layouts';

// Data:
import { initialData } from '../database/products';


const HomePage: NextPage = () => {


  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejores productos de Tesla aquí'}>

      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ marginBottom: '1px' }}>Todos los productos</Typography>

      <Grid container spacing={4}>

        {
          initialData.products.map((product, index) => (
            <Grid item key={index} xs={6} sm={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    image={`products/${product.images[0]}`}
                    alt={product.title} />
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>

    </ShopLayout>

  )
}

export default HomePage;
