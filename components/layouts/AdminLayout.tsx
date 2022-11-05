import { FC } from "react";
import Head from "next/head";
import { Box, Typography } from "@mui/material";

// Components:
import { Footer, SideMenu } from "../ui";
import { AdminNavbar } from '../admin';


interface Props {
    children: JSX.Element | JSX.Element[];
    title: string;
    subTitle: string;
    icon?: JSX.Element;
}


export const AdminLayout: FC<Props> = ({ children, title, subTitle, icon }) => {


    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="author" content="Teslo Shop" />
                <meta name="description" content="Panel de Admistrador" />
                <meta name="keywords" content={`${title}, tesla, shop, ecommerce`} />

                <meta property="og:title" content={title} />
                <meta property="og:description" content={subTitle} />

            </Head>

            <nav>
                <AdminNavbar />
            </nav>

            <SideMenu />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>

                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    paddingTop={3}
                >
                    <Typography variant='h1' component='h1'>
                        {icon}
                        {' '}
                        {title}
                    </Typography>
                    <Typography variant='h2' component='h2' sx={{ mb: 1 }}>
                        {subTitle}
                    </Typography>
                </Box>

                <Box className='fadeIn'>
                    {children}
                </Box>
            </main>

            <footer>
                <Footer />
            </footer>

        </>
    )
}

export default AdminLayout;