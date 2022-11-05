import { FC, useContext } from 'react';
import NextLink from "next/link";

// MUI:
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';

// Contexts:
import { UiContext } from '../../context';


export const AdminNavbar: FC = () => {

    const { toggleSideMenu } = useContext(UiContext);


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

                <Button onClick={toggleSideMenu}>
                    Menú
                </Button>

            </Toolbar>
        </AppBar >
    )
}

export default AdminNavbar;