import type { NextPage } from 'next';

import { Typography } from '@mui/material';

//Components:
import { ShopLayout } from '../../components/layouts';
import { FullScreenLoading } from '../../components/ui';
import { ProductList } from '../../components/products';


// Hooks:
import { useProducts } from '../../hooks';


const MensPage: NextPage = () => {

    const { products, isLoading } = useProducts('products?gender=men');

    return (
        <ShopLayout
            title={'Teslo-Shop | Mens'}
            pageDescription={'Encuentra los mejores productos de Tesla para hombres aquí'}>

            <Typography variant='h1' component='h1'>Hombres</Typography>
            <Typography variant='h2' sx={{ marginBottom: '1px' }}>Productos para hombres</Typography>

            {
                isLoading ? (<FullScreenLoading />) : (<ProductList products={products} />)
            }

        </ShopLayout>

    )
}

export default MensPage;
