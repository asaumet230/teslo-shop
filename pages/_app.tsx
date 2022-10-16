import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';

// Themes:
import { lightTheme } from '../themes';

//Styles:
import '../styles/globals.css';

// Providers:
import { UiProvider, CartProvider, AuthProvider } from '../context/';

function MyApp({ Component, pageProps }: AppProps) {

  return (

    <SessionProvider>
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
    </SessionProvider>
  )

}

export default MyApp;
