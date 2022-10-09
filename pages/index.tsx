import type { NextPage } from 'next';

import { Typography } from '@mui/material';

//Components:
import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { FullScreenLoading } from '../components/ui';

// Hooks:
import { useProducts } from '../hooks';

//? Data To Design Frontend:
import { initialData } from '../database/seed-data';


const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('products');

  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejores productos de Tesla aquí'}>

      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ marginBottom: '1px' }}>Todos los productos</Typography>

      {
        isLoading ? (<FullScreenLoading />) : (<ProductList products={products} />)
      }

    </ShopLayout>

  )
}

export default HomePage;
