import { useTheme } from '@emotion/react';
import {
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/material/node_modules/@mui/system';
import { createContext, useContext } from 'react';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function Index() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.@emotion/styled file.
   */
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h1" component="h2" mb={3}>
          quechua.ai
        </Typography>
        <TextField fullWidth label="search for a quechua word" id="fullWidth" />
        <Button variant="contained" sx={{ m: 3 }}>
          Search
        </Button>
      </Box>
    </Container>
  );
}

export default Index;
