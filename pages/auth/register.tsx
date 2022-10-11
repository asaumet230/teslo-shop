import { useContext, useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";

// MUI:
import { Box, Chip, Grid, TextField, Typography, Button, Link, InputAdornment, IconButton } from '@mui/material';

// Icons:
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';
import ErrorOutline from '@mui/icons-material/ErrorOutline';

import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts';
import { isEmail } from '../../utils';



type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    password2: string;
}

const RegisterPage: NextPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const { registerUser, startAuth, isErrorLogged, errorMessage } = useContext(AuthContext);

    const router = useRouter();
    const password = useRef({});
    password.current = watch("password", "");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState('');

    useEffect(() => {

        if (isErrorLogged) {

            setShowError(true);
            setShowErrorMessage(errorMessage);


            setTimeout(() => {
                setShowError(false);
                setShowErrorMessage('');
                startAuth();
            }, 3000);
        }
    }, [isErrorLogged, errorMessage]);

    const onUserRegister = async ({ firstName, lastName, email, password, password2 }: FormData) => {

        const isValidUserRegister = await registerUser(firstName, lastName, email, password);
        if (isValidUserRegister) return router.replace('/');

    }

    return (
        <AuthLayout title='Página - Login' description='Accede a tu cuenta Teslo - shop'>
            <form onSubmit={handleSubmit(onUserRegister)} noValidate>
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
                            {
                                showError &&
                                <Chip
                                    label={showErrorMessage}
                                    color='error'
                                    icon={<ErrorOutline />}
                                    className="fadeIn"
                                />
                            }

                        </Grid>

                        <Grid item xs={12} my={1}>
                            <TextField
                                label='Nombres'
                                variant='filled'
                                fullWidth
                                {...register('firstName', {
                                    required: 'El nombre es obligatorio',
                                    minLength: { value: 2, message: 'El nombre debe de tener mínimo tres caracteres' }
                                })}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message} />
                        </Grid>

                        <Grid item xs={12} my={1}>
                            <TextField
                                label='Appellidos'
                                variant='filled'
                                fullWidth
                                {...register('lastName', {
                                    required: 'El nombre es obligatorio',
                                    minLength: { value: 2, message: 'El apellido debe de tener mínimo tres caracteres' }
                                })}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message} />
                        </Grid>

                        <Grid item xs={12} my={1}>
                            <TextField
                                type='email'
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
                                }}
                                {...register('email', {
                                    required: 'El email es obligatorio',
                                    validate: isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message} />
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
                                }}
                                {...register('password', {
                                    required: 'El password es obligatorio',
                                    minLength: { value: 6, message: 'La contraseña debe de tener mínimo tres caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message} />
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
                                }}
                                {...register('password2', {
                                    validate: value => value === password.current || "Las contraseñas no son correctas"
                                })}
                                error={!!errors.password2}
                                helperText={errors.password2?.message} />
                        </Grid>

                        <Grid item xs={12} my={3}>
                            <Button
                                type='submit'
                                fullWidth
                                color='secondary'
                                className='circular-btn'
                                sx={{ paddin: '10px', fontSize: '18px' }}>
                                Registrarse
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

            </form>

        </AuthLayout >
    )
}

export default RegisterPage;