import { useState } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';

// MUI:
import { Box, Grid, TextField, Typography, Button, Link, InputAdornment, IconButton } from '@mui/material';

// Icons:
import { Visibility, VisibilityOff, AccountCircleRounded } from '@mui/icons-material';

// Laoyut:
import { AuthLayout } from '../../components/layouts';

const RegisterPage: NextPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <AuthLayout title='Página - Login' description='Accede a tu cuenta Teslo - shop'>
            <Box
                sx={{
                    width: { xs: 470, sm: 600 },
                    padding: '30px',
                    borderRadius: '5px',
                    marginTop: '150px'
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
                            my={2}>Crear Cuenta</Typography>
                    </Grid>

                    <Grid item xs={12} my={1}>
                        <TextField
                            label='Nombres'
                            variant='filled'
                            fullWidth />
                    </Grid>

                    <Grid item xs={12} my={1}>
                        <TextField
                            label='Appellidos'
                            variant='filled'
                            fullWidth />
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

                    <Grid item xs={12} my={1}>
                        <TextField
                            label='Confirmar Contraseña'
                            variant='filled'
                            type={showConfirmPassword ? 'text' : 'password'}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                    </Grid>

                    <Grid item xs={12} my={3}>
                        <Button
                            fullWidth
                            color='secondary'
                            className='circular-btn'
                            sx={{ paddin: '10px', fontSize: '18px' }}>
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <NextLink href='/auth/login' passHref>
                            <Link color='secondary' underline='always'>
                                ¿Ya tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>

                </Grid>
            </Box>
        </AuthLayout >
    )
}

export default RegisterPage;