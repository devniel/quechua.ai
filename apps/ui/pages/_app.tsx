import { AppProps } from 'next/app';
import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, useTheme } from '@emotion/react';
import { getTheme } from '../theme';
import createEmotionCache from '../createEmotionCache';
import { EmotionCache } from '@emotion/utils';
import { Provider } from 'react-redux';
import { useStore, wrapper } from '../redux/store';
import { ConnectedRouter } from 'connected-next-router';
import { Container, IconButton } from '@mui/material';
import { Box } from '@mui/material/node_modules/@mui/system';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function CustomApp(props: CustomAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );
  const theme = React.useMemo(() => getTheme(mode), [mode]);

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
