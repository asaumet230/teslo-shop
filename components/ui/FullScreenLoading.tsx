import React, { FC } from 'react';

//MUI:
import { Box, CircularProgress, Typography } from '@mui/material';

export const FullScreenLoading: FC = () => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'>
            <Typography
                variant='h2'
                component='h2'
                fontWeight={200}
                fontSize={20}
                marginBottom={2}
            >Cargando...</Typography>
            <CircularProgress thickness={2} />
        </Box>
    )
}

export default FullScreenLoading