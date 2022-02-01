import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/material/node_modules/@mui/system';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.@emotion/styled file.
   */
  return (
    <Container maxWidth="sm" sx={{ height: '100vh', margin: 0, padding: 0 }}>
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
