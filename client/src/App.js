import './App.css';
import NavBar from './components/NavBar/NavBar';
import CardNote from './components/CardNote/Cardnote';
import Theater from './components/Theater/Theater';
import Login from './components/Login/Login'
import { ThemeProvider } from '@material-ui/styles';
import theme from './components/theme/theme'
import Box from '@material-ui/core/Box';
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation, useHistory } from "react-router-dom";
import SearchMovie from './components/Search/Search';
import { fetchTotalPages, searchMovies } from "../src/utils/API";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

function App() {
  let history = useHistory();
  const classes = useStyles();
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  // const [currentPage, setCurrentPage] = useState();

  const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  const [userData, setUserData] = useState(getWithExpiry('userData') || {
    username: "",
    movies_watched: [],
    movies_watched_theater: [],
    isLoggedIn: false
  });

  useEffect(() => {
    setWithExpiry('userData', userData, 3600000);
  }, [userData]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setSearchMovie(newValue);
  };

  const setWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item));
  }

  const getSearchResults = async (page, search) => {
    const res = await searchMovies(search, page);
    if (res) {
      setSearchResults(res);
    }
  };

  const getTotalPages = async (search) => {
    const res = await fetchTotalPages(search);
    setTotalPages(res);
  };

  const handleSumbit = () => {
    window.scrollTo(0, 0);
    // setCurrentPage(1);
    getTotalPages(searchMovie);
    getSearchResults(1, searchMovie);
  };

  const saveUserData = (data) => {
    setUserData({
      username: data.user.username,
      movies_watched: data.user.movies_watched,
      movies_watched_theater: data.user.movies_watched_theater,
      isLoggedIn: true
    });
  }

  const handleLogout = () => {
    setUserData({
      username: "",
      movies_watched: [],
      movies_watched_theater: [],
      isLoggedIn: false
    });
    history.push("/");
  }

  return (
    <ThemeProvider theme={theme}>
      {userData.isLoggedIn
        ? (
          <div>
            <NavBar 
            onChange={handleInputChange} 
            onSubmit={handleSumbit} />
            <div className={classes.toolbar}>
              <Switch>
                <Route exact path={["/", "/cardnote"]}>
                  <CardNote />
                </Route>
                <Route exact path={["/theater"]}>
                  <Theater />
                </Route>
                <Route exact path={["/logout"]}>
                  {handleLogout}
                  <LogoutScreen />
                </Route>
                <Route exact path={["/search"]}>
                  <SearchMovie 
                  results={searchResults}
                  nextPage={getSearchResults}
                  totalPages={totalPages}
                  movie={searchMovie}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        )
        : (
          <Login
            saveUserData={saveUserData}
          />
        )
      }
    </ThemeProvider>
  );
}

export default App;
