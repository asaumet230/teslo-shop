import type { NextPage } from 'next';

import { Typography } from '@mui/material';

//Components:
import { ShopLayout } from '../../components/layouts';
import { FullScreenLoading } from '../../components/ui';
import { ProductList } from '../../components/products';


// Hooks:
import { useProducts } from '../../hooks';


const WomenPage: NextPage = () => {

    const { products, isLoading } = useProducts('products?gender=women');

    return (
        <ShopLayout
            title={'Teslo-Shop | Women'}
            pageDescription={'Encuentra los mejores productos de Tesla para mujeres aquí'}>

            <Typography variant='h1' component='h1'>Mujeres</Typography>
            <Typography variant='h2' sx={{ marginBottom: '1px' }}>Productos para mujeres</Typography>

            {
                isLoading ? (<FullScreenLoading />) : (<ProductList products={products} />)
            }

        </ShopLayout>

    )
}

export default WomenPage;
