import { FC } from 'react';
import { useRouter } from 'next/router';
import NextLink from "next/link";

// MUI:
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';

// Icons:
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';


const menuItem = [
    {
        text: 'Hombres',
        url: '/category/mens'
    },
    {
        text: 'Mujeres',
        url: '/category/women'
    },
    {
        text: 'Niños',
        url: '/category/kids'
    }
];


export const NavBar: FC = () => {

    const { asPath } = useRouter();

    return (
        <AppBar sx={{ borderBottom: '1px solid #f2f2f2', paddingBottom: 0 }}>
            <Toolbar >
                <NextLink href="/" passHref>
                    <Link display="flex" alignItems="center">
                        <Typography variant="h6"> Teslo | </Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box sx={{ flex: 1 }}></Box>


                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>

                    {
                        menuItem.map(({ text, url }) => (
                            <NextLink key={url} href={url} passHref>
                                <Link>
                                    <Button sx={{ marginX: 1 }} color={asPath === url ? 'primary' : 'info'}>{text}</Button>
                                </Link>
                            </NextLink>
                        ))
                    }
                </Box>


                <Box sx={{ flex: 1 }}></Box>

                <IconButton>
                    <SearchOutlined />
                </IconButton>

                <NextLink href="/cart" passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button>
                    Menú
                </Button>

            </Toolbar>
        </AppBar >
    )
}

export default NavBar;