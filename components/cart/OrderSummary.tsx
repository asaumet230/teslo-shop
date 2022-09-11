import { FC } from 'react';

// MUI:
import { Grid, Typography } from '@mui/material';

export const OrderSummary: FC = () => {

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography sx={{ mt: 1 }}> No. Productos </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1, textAlign: 'end' }}> 3 Items</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1 }}> Subtotal </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1, textAlign: 'end' }}> {`$${328.05}`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1 }}> Impuestos(19%) </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1, textAlign: 'end' }}> {`$${76.95}`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1 }} variant='subtitle1'> Total: </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography sx={{ mt: 1, textAlign: 'end' }} variant='subtitle1'> {`$${405}`}</Typography>
            </Grid>
        </Grid>
    )
}

export default OrderSummary;