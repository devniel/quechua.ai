import * as React from 'react';

import { CacheProvider, useTheme } from '@emotion/react';
import { Container, IconButton, useMediaQuery } from '@mui/material';
import PropTypes, { InferProps } from 'prop-types';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useStore, wrapper } from '../redux/store';

import { AppProps } from 'next/app';
import { Box } from '@mui/material/node_modules/@mui/system';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ConnectedRouter } from 'connected-next-router';
import CssBaseline from '@mui/material/CssBaseline';
import { EmotionCache } from '@emotion/utils';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from '../createEmotionCache';
import { getTheme } from '../theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function CustomApp(props: CustomAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = useMemo(() => getTheme(mode), [mode]);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  useLayoutEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

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
              <Box
                sx={{
                  display: 'flex',
                  width: 'auto',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.default',
                  color: 'text.primary',
                  borderRadius: 1,
                  p: 3,
                  position: 'absolute',
                  right: 0,
                }}
              >
                {theme.palette.mode} mode
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                >
                  {theme.palette.mode === 'dark' ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </Box>
              <Component {...pageProps} />
            </Box>
          </ThemeProvider>
        </CacheProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default wrapper.withRedux(CustomApp);
