import { FC, useMemo, useState } from 'react'

import NextLink from 'next/link';


// MUI:
import {
    Grid,
    Card,
    Chip,
    CardActionArea,
    CardMedia,
    Box,
    Typography,
    Link
} from '@mui/material';

// Interfaces:
import { IProducts } from '../../interfaces';

interface Props {
    product: IProducts;
}

export const ProductCard: FC<Props> = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const productImage = useMemo(() => {

        const image1 = product.images[1].includes('https') ? product.images[1] : `/products/${product.images[1]}`;
        const image2 = product.images[0].includes('https') ? product.images[0] : `/products/${product.images[0]}`;

        return isHovered ? image1 : image2;

    }, [isHovered, product.images]);

    return (
        <Grid
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            item
            xs={6}
            sm={4}>

            <Card>

                <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                    <Link>

                        <CardActionArea >

                            {
                                product.inStock === 0 && (
                                    <Chip
                                        color='primary'
                                        label='Agotado'
                                        sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }} />
                                )
                            }

                            <CardMedia
                                className="fadeIn"
                                component='img'
                                image={productImage}
                                alt={product.title}
                                onLoad={() => setIsImageLoaded(true)} />

                        </CardActionArea>

                    </Link>
                </NextLink>

            </Card>

            <Box
                sx={{
                    marginTop: 1,
                    display: isImageLoaded ? 'block' : 'none'
                }}
                className="fadeIn">

                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={400}>{`$${product.price}`}</Typography>

            </Box>

        </Grid>
    )
}

export default ProductCard;