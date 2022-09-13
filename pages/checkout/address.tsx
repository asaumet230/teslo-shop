import { NextPage } from 'next';

// MUI:
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';

// Layout:
import { ShopLayout } from '../../components/layouts';

export const AddressPage: NextPage = () => {


    return (
        <ShopLayout title='Checkout' pageDescription='Página de facturación'>

            <Typography variant='h1' component='h1' textAlign='center' sx={{ mb: 3 }}>Datos de Facturación</Typography>

            <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                    <TextField label='Nombre' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Apellido' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Dirección' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Dirección 2 (opcional)' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Código postal' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Dirección 2 (opcional)' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Ciudad' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Departamento' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select
                            variant='filled'
                            label='País'
                            value={1}
                        >
                            <MenuItem value={1} disabled selected>--Seleccione País--</MenuItem>
                            <MenuItem value={2}>Colombia</MenuItem>
                            <MenuItem value={3}>Brasil</MenuItem>
                            <MenuItem value={4}>Salvador</MenuItem>
                            <MenuItem value={5}>Panama</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Teléfono' variant='filled' fullWidth />
                </Grid>
            </Grid>

            <Box display='flex' justifyContent='center' marginTop={4}>
                <Button color='secondary' size='large' className='circular-btn' sx={{ width: '300px' }}>
                    Revisar pedido
                </Button>
            </Box>

        </ShopLayout>
    )
}

export default AddressPage;