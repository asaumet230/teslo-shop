import { FC } from "react";
import Head from "next/head";

// Components:
import { Footer, NavBar, SideMenu } from "../ui";


interface Props {
    children: JSX.Element | JSX.Element[];
    title: string;
    pageDescription: string;
    imageFullUrl?: string
}


export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {


    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="author" content="Teslo Shop" />
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={`${title}, tesla, shop, ecommerce`} />

                <meta property="og:title" content={title} />
                <meta property="og:description" content={pageDescription} />
                {
                    imageFullUrl && (<meta property="og:image" content={imageFullUrl} />)
                }

            </Head>

            <nav>
                <NavBar />
            </nav>

            <SideMenu />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                {children}
            </main>

            <footer>
                <Footer />
            </footer>

        </>
    )
}

export default ShopLayout;