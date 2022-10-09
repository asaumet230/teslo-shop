import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from "next/link";

// MUI:
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';

// Icons:
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import ClearOutlined from '@mui/icons-material/ClearOutlined';

// Contexts:
import { UiContext, CartContext } from '../../context';


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

    const { toggleSideMenu } = useContext(UiContext);
    const { numberOfItems } = useContext(CartContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const { asPath, push } = useRouter();


    const onSearchTerm = () => {

        if (searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`);
        setSearchTerm('');

    }


    return (
        <AppBar sx={{
            borderBottom: '1px solid #f2f2f2',
            paddingBottom: 0,
            boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)'
        }}>
            <Toolbar >
                <NextLink href="/" passHref>
                    <Link display="flex" alignItems="center">
                        <Typography variant="h6"> Teslo | </Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box sx={{ flex: 1 }}></Box>


                <Box className="fadeIn" sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'flex' } }}>

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

                {/* Pantallas Grandes */}

                {
                    isSearchVisible ?
                        (
                            <Input
                                className="fadeIn"
                                sx={{ display: { xs: 'none', sm: 'flex' }, marginRight: 1, width: '20vw' }}
                                autoFocus={true}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && onSearchTerm()}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setIsSearchVisible(false)}
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        ) :
                        (
                            <IconButton
                                className="fadeIn"
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                onClick={() => setIsSearchVisible(true)}>
                                <SearchOutlined />
                            </IconButton>
                        )
                }


                {/* Pantallas Pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggleSideMenu}>
                    <SearchOutlined />
                </IconButton>

                <NextLink href="/cart" passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button onClick={toggleSideMenu}>
                    Menú
                </Button>

            </Toolbar>
        </AppBar >
    )
}

export default NavBar;