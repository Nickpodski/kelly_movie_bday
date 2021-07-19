import { createTheme } from '@material-ui/core/styles';
import { deepPurple, red } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: red[500],
    },
  },
});

export default theme;