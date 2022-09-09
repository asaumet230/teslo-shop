import type { NextPage } from 'next';
import { Typography } from '@mui/material';

//Components:
import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';


// Data:
import { initialData } from '../database/products';



const HomePage: NextPage = () => {


  return (
    <ShopLayout
      title={'Teslo-Shop - Home'}
      pageDescription={'Encuentra los mejores productos de Tesla aquí'}>

      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ marginBottom: '1px' }}>Todos los productos</Typography>

      <ProductList products={initialData.products} />

    </ShopLayout>

  )
}

export default HomePage;
