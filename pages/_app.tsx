import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

// Themes:
import { lightTheme } from '../themes';

//Styles:
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider theme={lightTheme} >
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )

}

export default MyApp;
