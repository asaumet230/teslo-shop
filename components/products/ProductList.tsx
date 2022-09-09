import { FC } from 'react';

// MUI:
import { Grid } from '@mui/material';

// Components:
import ProductCard from './ProductCard';

// Interfaces:
import { IProducts } from '../../interfaces';

interface Props {
    products: IProducts[]
}


export const ProductList: FC<Props> = ({ products }) => {


    return (
        <Grid container spacing={4}>
            {
                products.map(product => (

                    <ProductCard
                        product={product}
                        key={product.slug} />

                ))
            }
        </Grid>
    )
}

export default ProductList;