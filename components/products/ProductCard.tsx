import { FC, useMemo, useState } from 'react'

import NextLink from 'next/link';


// MUI:
import {
    Grid,
    Card,
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

        return isHovered ? `/products/${product.images[1]}` : `/products/${product.images[0]}`;

    }, [isHovered, product.images]);

    return (
        <Grid
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            item
            xs={6}
            sm={4}>

            <Card>

                <NextLink href="product/slug" passHref prefetch={false}>
                    <Link>
                        <CardActionArea >
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