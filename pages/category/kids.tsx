import type { NextPage } from 'next';

import { Typography } from '@mui/material';

//Components:
import { ShopLayout } from '../../components/layouts';
import { FullScreenLoading } from '../../components/ui';
import { ProductList } from '../../components/products';


// Hooks:
import { useProducts } from '../../hooks';


const KidsPage: NextPage = () => {

    const { products, isLoading } = useProducts('products?gender=kid');

    return (
        <ShopLayout
            title={'Teslo-Shop | Kids'}
            pageDescription={'Encuentra los mejores productos de Tesla para niños aquí'}>

            <Typography variant='h1' component='h1'>Niños</Typography>
            <Typography variant='h2' sx={{ marginBottom: '1px' }}>Productos para niños</Typography>

            {
                isLoading ? (<FullScreenLoading />) : (<ProductList products={products} />)
            }

        </ShopLayout>

    )
}

export default KidsPage;
