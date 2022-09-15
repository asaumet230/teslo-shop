import { FC } from 'react';
import NextLink from "next/link";

// MUI:
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';

// Icons:
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const NavBar: FC = () => {

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


                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <NextLink href="/category/men" passHref>
                        <Link>
                            <Button>Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/women" passHref>
                        <Link>
                            <Button>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/kid" passHref>
                        <Link>
                            <Button>Niños</Button>
                        </Link>
                    </NextLink>
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
        </AppBar>
    )
}

export default NavBar;