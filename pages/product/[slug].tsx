import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

//* import { useRouter } from "next/router";

//* MUI:
import { Box, Grid, Typography, Button, Chip } from "@mui/material";

//* Hooks:
//* import { useProducts } from "../../hooks";

//* Layout:
import { ShopLayout } from "../../components/layouts";

//* Components:
import { ProductSlideShow, SizeSelector } from '../../components/products';
import { ItemCounter } from "../../components/ui";

// DB Conection:
import { getAllProductsSlug, getProductBySlug } from "../../database";

//* Interface:
import { IProducts } from '../../interfaces';


//* Example Data:
//* import { initialData } from '../../database/products';


//* Product:
//* const product = initialData.products[0];

interface Props {
    product: IProducts
}

export const slug: NextPage<Props> = ({ product }) => {

    /* //? Esto no se debe hacer porque los boots de google o otro buscador ven un loading o un mensaje, no ven el SEO esto se puede hacer en React puro o en una SPA cuando no importa el SEO.
        const router = useRouter();
        const { product, message, isLoading } = useProducts(`products/${router.query.slug}`);
        if (isLoading) return ( <FullScreenLoading /> );
        if (!product) return ( <h1>{message}</h1> );
    */

    return (
        <ShopLayout title={product.title} pageDescription={product.description} >
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
                            <ItemCounter />
                            <SizeSelector
                                // selectedSize={product.sizes[0]} 
                                sizes={product.sizes} />
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
        </ShopLayout >
    )
}

export default slug;

//* No usas SSR
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {

//     const { slug } = params as { slug: string };
//     const product: (IProducts | null) = await getProductBySlug(slug);

//     if (!product) {

//         return {
//             redirect: {
//                 destination: '/404',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {
//             product
//         }
//     }
// }




export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const productsSlugs = await getAllProductsSlug();

    return {
        paths: productsSlugs.map(({ slug }) => ({
            params: { slug }
        })),
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug = '' } = params as { slug: string };

    const product = await getProductBySlug(slug);

    if (!product) {

        return {
            redirect: {
                destination: '/404',
                permanent: false,
            }
        }
    }

    return {
        props: {
            product
        },
        revalidate: 86400 //Esto indicaria a Nextjs que regenere esta pagina cada 24 horas, el valor esta en segundos ISR
    }
}
