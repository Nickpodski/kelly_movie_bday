import './App.css';
import NavBar from './components/NavBar/NavBar';
import { ThemeProvider } from '@material-ui/styles';
import theme from './components/theme/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar/>
    </ThemeProvider>
  );
}

export default App;
