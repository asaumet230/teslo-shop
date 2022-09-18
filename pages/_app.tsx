import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

// Themes:
import { lightTheme } from '../themes';

//Styles:
import '../styles/globals.css';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {

  return (

    <SWRConfig value={{
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}>
      <ThemeProvider theme={lightTheme} >
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  )

}

export default MyApp;
