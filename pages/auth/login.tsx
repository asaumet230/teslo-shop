import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useForm } from "react-hook-form";

// MUI:
import { Box, Grid, TextField, Typography, Button, Link, InputAdornment, IconButton, Chip } from '@mui/material';

// Icons:
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';
import ErrorOutline from '@mui/icons-material/ErrorOutline';


import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts';
import { isEmail } from '../../utils/validations';





type FormData = {
    email: string;
    password: string;
}


const LoginPage: NextPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const { loginUser, startAuth, errorMessage, isErrorLogged } = useContext(AuthContext);
    const [showError, setShowError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState('');

    const router = useRouter();

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


    const onLoginuser = async ({ email, password }: FormData) => {

        const isValidLogin = await loginUser(email, password);

        if (isValidLogin) {

            const destination = router.query.p?.toString() || '';
            return router.replace(destination);
        };


    }

    return (
        <AuthLayout title='Página - Login' description='Accede a tu cuenta Teslo - shop'>

            <form onSubmit={handleSubmit(onLoginuser)} noValidate>
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
                                {...register('email', {
                                    required: 'El campo es requerido',
                                    validate: isEmail

                                })}
                                type='email'
                                label='Correo'
                                variant='filled'
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <AccountCircleRounded />
                                        </InputAdornment>
                                    )
                                }}
                                error={errors.email ? true : false}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12} my={1}>
                            <TextField
                                {...register('password', {
                                    required: 'El campo es requerido',
                                    minLength: { value: 6, message: 'El password debe de tener mínimo 6 caracteres' }
                                })}
                                label='Contraseña'
                                variant='filled'
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                error={errors.password ? true : false}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12} my={2}>
                            <Button
                                type="submit"
                                fullWidth
                                color='secondary'
                                className='circular-btn'
                                sx={{ paddin: '10px', fontSize: '18px' }}>
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} passHref>
                                <Link color='secondary' underline='always'>
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>

                    </Grid>
                </Box>

            </form>

        </AuthLayout >
    )
}

export default LoginPage;