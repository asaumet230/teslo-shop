import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Themes:
import { lightTheme } from '../themes';

//Styles:
import '../styles/globals.css';

// Providers:
import { UiProvider, CartProvider, AuthProvider } from '../context/';

function MyApp({ Component, pageProps }: AppProps) {

  return (

    <SessionProvider>

      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>


        <SWRConfig value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}>

          <AuthProvider>
            <CartProvider>

              <UiProvider>
                <ThemeProvider theme={lightTheme} >
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UiProvider>

            </CartProvider>
          </AuthProvider>

        </SWRConfig>

      </PayPalScriptProvider>
    </SessionProvider>
  )

}

export default MyApp;
