import { NextPage, GetServerSideProps } from 'next';

// MUI:
import { Typography, Box } from '@mui/material';

// Layout:
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';


// DB Helpers:
import { getProductByTerm, getAllproducts } from '../../database';

// Interfaces:
import { IProducts } from '../../interfaces/products';

interface Props {
    products: IProducts[];
    foundProducts: boolean;
    query: string;
}


const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {


    return (
        <ShopLayout
            title={'Teslo-Shop - Search'}
            pageDescription={'Resultado de tu busqueda'}>

            <Typography
                variant='h1'
                component='h1'
                sx={{ marginTop: '10px', textAlign: 'center' }}>Busqueda de Productos</Typography>

            {
                foundProducts ?
                    (
                        <Typography
                            variant='h2'
                            sx={{ marginTop: '10px', margintBottom: '20px' }}>Resultados de {query}:</Typography>
                    )
                    :
                    (
                        <Box

                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            marginTop={2}
                            marginBottom={3}>

                            <Typography
                                variant='h2'
                                sx={{ marginBottom: '1px' }}>No encontramos ningún producto por</Typography>

                            <Typography
                                variant='h2'
                                sx={{
                                    marginBottom: '1px',
                                    marginLeft: '5px',
                                    fontWeight: '900'
                                }}
                                color='secondary'
                                textTransform='capitalize'>{query}</Typography>

                        </Box>
                    )
            }

            <ProductList products={products} />

        </ShopLayout >

    )
}

export default SearchPage;



export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { query = '' } = params as { query: string };

    if (query.length === 0) {

        return {
            redirect: {
                destination: '/404',
                permanent: true
            }
        }
    }

    let products = await getProductByTerm(query);
    const foundProducts = products.length > 0;

    if (!foundProducts) {
        products = await getAllproducts();
    }


    //TODO: 'hay que retornar otros productos si no encuentra nada'

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}