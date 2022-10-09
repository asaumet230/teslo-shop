import { FC, useContext } from 'react';

// MUI:
import { Grid, Typography } from '@mui/material';

// Context:
import { CartContext } from '../../context';

// Utils:
import { currency } from '../../utils';

export const OrderSummary: FC = () => {

    const { numberOfItems, subtotal, taxRate, total } = useContext(CartContext);


    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography sx={{ mt: 1 }}> No. Productos </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1, textAlign: 'end' }}> {numberOfItems} {numberOfItems > 1 ? 'Productos' : 'Producto'}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1 }}> Subtotal </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1, textAlign: 'end' }}> {currency.format(subtotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1 }}> Impuestos({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%) </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1, textAlign: 'end' }}> {currency.format(taxRate)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1 }} variant='subtitle1'> Total: </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1, textAlign: 'end' }} variant='subtitle1'> {currency.format(total)}</Typography>
            </Grid>
        </Grid>
    )
}

export default OrderSummary;