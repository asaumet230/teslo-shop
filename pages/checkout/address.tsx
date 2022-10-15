import { useContext } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { CartContext } from '../../context';
// MUI:
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';

// Layout:
import { ShopLayout } from '../../components/layouts';

import { countries, isValidToken } from '../../utils';




interface FormData {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    state: string;
    country: string;
    phone: string;

}

const getAddressFormCookies = (): FormData => {

    // Lo hace de esta forma porque al cargar este objeto del contexto no es tan rapido como cunado se construye este componente:

    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        state: Cookies.get('state') || '',
        country: Cookies.get('country') || countries[0].code,
        phone: Cookies.get('phone') || '',
    }
}

export const AddressPage: NextPage = () => {

    const { updatedShippingAddress } = useContext(CartContext);


    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFormCookies()
    });

    const router = useRouter();


    const onBillingData = async (data: FormData) => {

        updatedShippingAddress(data);
        router.push('/checkout/summary');
    }


    return (

        <ShopLayout title='Checkout' pageDescription='Página de facturación'>

            <form onSubmit={handleSubmit(onBillingData)} noValidate>
                <Typography variant='h1' component='h1' textAlign='center' sx={{ mb: 3 }}>Datos de Facturación</Typography>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Nombre'
                            variant='filled'
                            type='text'
                            fullWidth
                            {...register('firstName', {
                                required: 'El campo es requerido',
                            })}
                            error={errors.firstName ? true : false}
                            helperText={errors.firstName?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Apellido'
                            variant='filled'
                            fullWidth
                            type="text"
                            {...register('lastName', {
                                required: 'El campo es requerido',
                            })}
                            error={errors.lastName ? true : false}
                            helperText={errors.lastName?.message}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Dirección'
                            variant='filled'
                            type="text"
                            fullWidth
                            {...register('address', {
                                required: 'El campo es requerido',
                            })}
                            error={errors.address ? true : false}
                            helperText={errors.address?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Dirección 2 (opcional)'
                            variant='filled'
                            fullWidth
                            {...register('address2')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Código postal'
                            variant='filled'
                            type="text"
                            fullWidth
                            {...register('zip', {
                                required: 'El campo es requerido',
                            })}
                            error={errors.zip ? true : false}
                            helperText={errors.zip?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Ciudad'
                            variant='filled'
                            type="text"
                            fullWidth
                            {...register('city', {
                                required: 'El campo es requerido',
                            })}
                            error={errors.city ? true : false}
                            helperText={errors.city?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Departamento'
                            variant='filled'
                            fullWidth
                            type="text"
                            {...register('state', {
                                required: 'El campo es requerido',
                            })}
                            error={errors.state ? true : false}
                            helperText={errors.state?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                key={Cookies.get('country') || countries[0].name}
                                select
                                defaultValue={Cookies.get('country') || countries[0].name}
                                variant='filled'
                                label='País'
                                {...register('country', {
                                    required: 'El campo es requerido',
                                })}
                                error={errors.country ? true : false}
                            >
                                {
                                    countries.map(({ name, code }) => (

                                        <MenuItem key={code} value={code}>{name}</MenuItem>

                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Teléfono'
                            variant='filled'
                            fullWidth
                            type="text"
                            {...register('phone', {
                                required: 'El campo es requerido',
                            })}
                            error={errors.phone ? true : false}
                            helperText={errors.phone?.message} />
                    </Grid>
                </Grid>

                <Box
                    display='flex'
                    justifyContent='center'
                    marginTop={4}>
                    <Button
                        type='submit'
                        color='secondary'
                        size='large'
                        className='circular-btn'
                        sx={{ width: '300px' }}>
                        Revisar pedido
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    )
}

export default AddressPage;



//* Esta es la forma como se hacia en versiones de Next menores a la 12.
//* Ahora se usan los middlewares para cada verificación de autenticación que se necesite.
// * Antes tocaba repetir este codigo en cada pagina donde era necesaria la verificación.
export const getServerSideProps: GetServerSideProps = async ({ req }) => {


    const { token = '' } = req.cookies;
    let userId = '';
    let hasValidToken = false;

    if (token.length === 0) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false
            }
        }
    }

    try {

        userId = await isValidToken(token);
        hasValidToken = true;

    } catch (error) {
        hasValidToken = false;
    }


    if (!hasValidToken) {

        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}