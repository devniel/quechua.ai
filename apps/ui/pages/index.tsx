import { useTheme } from '@emotion/react';
import {
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/material/node_modules/@mui/system';
import { push } from 'connected-next-router';
import { createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  DEFAULT_PAGE_SEARCH_RESULTS,
  DEFAULT_PAGE_START,
} from '../constants/constants';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function Index() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [query, setQuery] = useState<string>('');
  const dispatch = useDispatch();

  /** When changing query text */
  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  /** Handle search */
  const handleSearch = () => {
    dispatch(
      push({
        pathname: DEFAULT_PAGE_SEARCH_RESULTS,
        query: { query, page: DEFAULT_PAGE_START },
      })
    );
  };

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
        <TextField
          fullWidth
          label="search for a quechua word"
          id="fullWidth"
          value={query}
          onChange={handleChangeQuery}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              handleSearch();
              ev.preventDefault();
            }
          }}
        />
        <Button variant="contained" sx={{ m: 3 }} onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </Container>
  );
}

export default Index;
