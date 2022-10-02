import { useState } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';

// MUI:
import { Box, Grid, TextField, Typography, Button, Link, InputAdornment, IconButton } from '@mui/material';

// Icons:
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';

// Laoyut:
import { AuthLayout } from '../../components/layouts';



const LoginPage: NextPage = () => {

    const [showPassword, setShowPassword] = useState(false);


    return (
        <AuthLayout title='Página - Login' description='Accede a tu cuenta Teslo - shop'>
            <Box
                sx={{
                    width: { xs: 470, sm: 600 },
                    padding: '30px',
                    borderRadius: '5px'
                }}
                className='summary-card' >

                <Grid container>
                    <Grid item xs={12}>
                        <NextLink href="/" passHref>
                            <Link display="flex" alignItems="center">
                                <Typography variant="h6"> Teslo | </Typography>
                                <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                            </Link>
                        </NextLink>
                        <Typography
                            variant='h6'
                            component='h6'
                            textAlign='center'
                            fontWeight={700}
                            my={2}>Iniciar Sesión</Typography>
                    </Grid>

                    <Grid item xs={12} my={1}>
                        <TextField
                            label='Correo'
                            variant='filled'
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton>
                                            <AccountCircleRounded />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                    </Grid>
                    <Grid item xs={12} my={1}>
                        <TextField
                            label='Contraseña'
                            variant='filled'
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                    </Grid>

                    <Grid item xs={12} my={2}>
                        <Button
                            fullWidth
                            color='secondary'
                            className='circular-btn'
                            sx={{ paddin: '10px', fontSize: '18px' }}>
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <NextLink href='/auth/register' passHref>
                            <Link color='secondary' underline='always'>
                                ¿No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>

                </Grid>
            </Box>
        </AuthLayout >
    )
}

export default LoginPage;