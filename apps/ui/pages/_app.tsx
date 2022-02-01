import { AppProps } from 'next/app';
import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import { EmotionCache } from '@emotion/utils';
import { Provider } from 'react-redux';
import { useStore, wrapper } from '../redux/store';
import { ConnectedRouter } from 'connected-next-router';
import { Container } from '@mui/material';
import { Box } from '@mui/material/node_modules/@mui/system';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function CustomApp(props: CustomAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <ConnectedRouter>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>My page</title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Box
              display={'flex'}
              justifyContent="center"
              sx={{ width: '100%' }}
            >
              <Component {...pageProps} />
            </Box>
          </ThemeProvider>
        </CacheProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default wrapper.withRedux(CustomApp);
