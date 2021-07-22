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

function App() {
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

  const setWithExpiry = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item));
  }

  const saveUserData = (data) => {
    setUserData({
      email: data.user.username,
      movies_watched: data.user.movies_watched,
      movies_watched_theater: data.user.movies_watched_theater,
      isLoggedIn: true
    });
  }

  return (
    <ThemeProvider theme={theme}>
      {userData.isLoggedIn
        ? (
          <div>
            <NavBar />
            <div>
              <Switch>
                <Route exact path={["/", "/cardnote"]}>
                  <CardNote />
                </Route>
                <Route exact path={["/theater"]}>
                  <Theater />
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
