import { FC, useContext } from 'react';

// MUI:
import { Grid, Typography } from '@mui/material';

// Context:
import { CartContext } from '../../context';

// Utils:
import { currency } from '../../utils';

interface Props {
    orderPropsValues?: {
        numberOfItems: number;
        subtotal: number;
        taxRate: number;
        total: number;
    }
}

export const OrderSummary: FC<Props> = ({ orderPropsValues }) => {

    const orderContextValues = useContext(CartContext);

    const summaryValues = orderPropsValues ? orderPropsValues : orderContextValues;

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography sx={{ mt: 1 }}> No. Productos </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1, textAlign: 'end' }}> {summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? 'Productos' : 'Producto'}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1 }}> Subtotal </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1, textAlign: 'end' }}> {currency.format(summaryValues.subtotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1 }}> Impuestos({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%) </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1, textAlign: 'end' }}> {currency.format(summaryValues.taxRate)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1 }} variant='subtitle1'> Total: </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1, textAlign: 'end' }} variant='subtitle1'> {currency.format(summaryValues.total)}</Typography>
            </Grid>
        </Grid>
    )
}

export default OrderSummary;