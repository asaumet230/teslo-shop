import { useContext, useEffect, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useForm } from "react-hook-form";
import { getSession, signIn, getProviders } from 'next-auth/react';

// MUI:
import { Box, Grid, TextField, Typography, Button, Link, InputAdornment, IconButton, Chip, Divider } from '@mui/material';

// Icons:
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import GitHubIcon from '@mui/icons-material/GitHub';

import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts';
import { isEmail } from '../../utils/validations';




type FormData = {
    email: string;
    password: string;
}


const LoginPage: NextPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    // const { loginUser, startAuth, errorMessage, isErrorLogged } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);

    const [showError, setShowError] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState('');

    const [providers, setProviders] = useState<any>([]);

    const router = useRouter();

    useEffect(() => {

        getProviders().then(prov => {

            if (prov) {
                const providers = Object.values(prov);
                setProviders(providers);
            }
        });

    }, []);


    // useEffect(() => {

    //     if (isErrorLogged) {

    //         setShowError(true);
    //         setShowErrorMessage(errorMessage);

    //         setTimeout(() => {
    //             setShowError(false);
    //             setShowErrorMessage('');
    //             startAuth();
    //         }, 3000);
    //     }
    // }, [isErrorLogged, errorMessage]);


    const onLoginuser = async ({ email, password }: FormData) => {

        // const isValidLogin = await loginUser(email, password);

        // if (isValidLogin) {

        //     const destination = router.query.p?.toString() || '';
        //     return router.replace(destination);
        // };

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false
        });

        if (!res?.ok) {

            setShowError(true);
            setShowErrorMessage(res?.error || '');

            setTimeout(() => {
                setShowError(false);
                setShowErrorMessage('');
            }, 3000);

            return
        }

        const destination = router.query.p?.toString() || '';
        return router.replace(destination);
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

                        <Grid item xs={12}>
                            <Divider sx={{ width: '100%', mt: 2 }} />
                            <Typography mt={2}> Ingresa con redes sociales:</Typography>
                            {
                                providers.map((prov: any) => {

                                    if (prov.name !== 'Custom Login') {

                                        return (
                                            <Button
                                                key={prov.id}
                                                variant='outlined'
                                                fullWidth
                                                color="primary"
                                                sx={{ mt: 3 }}
                                                startIcon={<GitHubIcon />}
                                                onClick={() => signIn(prov.id)}
                                            >
                                                {prov.name}
                                            </Button>
                                        )
                                    }

                                })
                            }
                        </Grid>

                    </Grid>
                </Box>

            </form>

        </AuthLayout >
    )
}

export default LoginPage;


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });
    const { p = '/' } = query;

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}