import { NextPage } from 'next';
import NextLink from 'next/link';

// MUI:
import { Box, Link, Typography } from '@mui/material';

// Icons:
import { RemoveShoppingCartOutlined } from '@mui/icons-material';

// Layout:
import { ShopLayout } from '../../components/layouts';

const EmptyPage: NextPage = () => {

    return (
        <ShopLayout title='Carrito Vació' pageDescription='No hay artículos en el carrito'>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{
                    flexDirection: { xs: 'column', sm: 'row' }
                }}>

                <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />

                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'>
                    <Typography>Su carrito está vació</Typography>

                    <NextLink href='/' passHref>
                        <Link typography='h4' color='secondary'>
                            Regresar
                        </Link>
                    </NextLink>

                </Box>

            </Box>
        </ShopLayout>
    )
}

export default EmptyPage;