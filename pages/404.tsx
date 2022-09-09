import { FC } from "react";
import { Box, Typography } from '@mui/material';

// Components:
import { ShopLayout } from "../components/layouts";


export const Custom404: FC = () => {

    return (
        <ShopLayout title="Page Not Found" pageDescription="No se pudo encontrar esta página">
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{
                    flexDirection: { xs: 'column', sm: 'row' }
                }}>
                <Typography variant="h1" component="h1" fontSize={80} fontWeight={200}>404 |</Typography>
                <Typography marginLeft={2}>Página no encontrada</Typography>
            </Box>
        </ShopLayout>
    )
}

export default Custom404;