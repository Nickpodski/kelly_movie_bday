import { createTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: '#808080',
    },
  },
});

export default theme;