import { FC } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';

interface Props {
    children: JSX.Element | JSX.Element[];
    title: string;
    description: string;
}

export const AuthLayout: FC<Props> = ({ children, title, description }) => {


    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>

            <main>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height='calc(100vh - 200px)'>
                    {children}
                </Box>
            </main>
        </>
    )
}

export default AuthLayout;