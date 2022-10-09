import { useContext, useState } from "react";
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

//* import { useRouter } from "next/router";

//* MUI:
import { Box, Grid, Typography, Button, Chip } from "@mui/material";

//* Hooks:
//* import { useProducts } from "../../hooks";

//* Contexts:
import { CartContext } from "../../context";

//* Layout:
import { ShopLayout } from "../../components/layouts";

//* Components:
import { ProductSlideShow, SizeSelector } from '../../components/products';
import { ItemCounter } from "../../components/ui";

// DB Conection:
import { getAllProductsSlug, getProductBySlug } from "../../database";

//* Interface:
import { IProducts, ICartProduct, ISize } from '../../interfaces';



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

    const { addProductToCart } = useContext(CartContext);
    const router = useRouter();

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
        maxQuantity: product.inStock
    });

    const onSelectedSize = (size: ISize) => {

        setTempCartProduct({
            ...tempCartProduct,
            size
        });
    }

    const onQuantitySelected = (quantity: number) => {

        setTempCartProduct((tempCartProduct) => ({
            ...tempCartProduct,
            quantity
        }));
    }

    const onAddProduct = (): void => {

        if (!tempCartProduct.size || tempCartProduct.quantity === 0) {

            console.log('Debe seleccionar Talla y cantidad');
            return;
        };

        addProductToCart(tempCartProduct);
        router.push('/cart');
    }


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
                            <ItemCounter
                                maxValue={product.inStock}
                                onQuantitySelected={onQuantitySelected}
                                currentValue={tempCartProduct.quantity}
                            />
                            <SizeSelector
                                sizes={product.sizes}
                                selectedSize={tempCartProduct.size}
                                onSelectedSize={(size) => onSelectedSize(size)} />
                        </Box>


                        {
                            (product.inStock > 0) ?
                                (
                                    <Button
                                        color='secondary'
                                        className='circular-btn'
                                        onClick={onAddProduct}>
                                        {
                                            !tempCartProduct.size || tempCartProduct.quantity === 0 ? 'Selecciona un talla y cantidad' : 'Agregar a carrito'
                                        }
                                    </Button>
                                ) :
                                (<Chip label="No hay disponibles" color="error" variant="outlined" sx={{ mt: 1 }} />)
                        }


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
