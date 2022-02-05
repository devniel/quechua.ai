import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

// Create a theme instance.
export const getTheme = (mode = 'light' as PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
    },
  });
