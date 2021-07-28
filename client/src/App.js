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
import SingleMovie from './components/SingleMovie/SingleMovie';
import axios from "axios";
import SingleList from './components/SingleList/SingleList';
import Together from './components/Together/Together';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

function App() {
  let history = useHistory();
  const classes = useStyles();
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [singleMovie, setSingleMovie] = useState([]);
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

  const saveUserMoviesWatched = (data) => {
    setUserData({
      username: data.username,
      movies_watched: data.movies_watched,
      movies_watched_theater: data.movies_watched_theater,
      isLoggedIn: true
    });
  };

  const handleLogout = () => {
    setUserData({
      username: "",
      movies_watched: [],
      movies_watched_theater: [],
      isLoggedIn: false
    });
    history.push("/");
  };

  const searchClickMovie = (index) => {
    setSingleMovie(searchResults[index]);
    history.push("/singlemovie");
  }

  const theaterListClickMovie = (index) => {
    setSingleMovie(userData.movies_watched_theater[index]);
    history.push("/singlemovielist");
  }

  const ListClickMovie = (index) => {
    setSingleMovie(userData.movies_watched[index]);
    history.push("/singlemovielist");
  }

  const addMWNT = (movie) => {
    const movieData = {
      "title": movie.title,
      "movie_id": movie.id,
      "movie_genres": movie.genres,
      "poster": movie.poster,
      "overview": movie.overview,
      "release_date": movie.releaseDate,
      "rating": movie.rating,
      "vote_count": movie.voteCount
    }
    const moviesWatched = userData.movies_watched;
    moviesWatched.push(movieData);
    const newUserData = {
      username: userData.username,
      movies_watched: moviesWatched,
      movies_watched_theater: userData.movies_watched_theater,
      isLoggedIn: true
    }
    saveUserMoviesWatched(newUserData);
    history.push("/search");
    addMWNTReq(userData.username, moviesWatched);
  }

  const addMWT = (movie) => {
    const movieData = {
      "title": movie.title,
      "movie_id": movie.id,
      "movie_genres": movie.genres,
      "poster": movie.poster,
      "overview": movie.overview,
      "release_date": movie.releaseDate,
      "rating": movie.rating,
      "vote_count": movie.voteCount
    }
    const moviesTheater = userData.movies_watched_theater;
    const moviesWatched = userData.movies_watched;
    moviesTheater.push(movieData);
    moviesWatched.push(movieData);
    const newUserData = {
      username: userData.username,
      movies_watched: moviesWatched,
      movies_watched_theater: moviesTheater,
      isLoggedIn: true
    }
    saveUserMoviesWatched(newUserData);
    history.push("/search");
    addMWNTReq(userData.username, moviesWatched);
    addMWTReq(userData.username, moviesTheater);
  }

  const addMWTReq = ( username, moviesTheater) => {
    axios.put('/api/user/addmoviewatchtheater', { username, moviesTheater })
      .then(res => {
        console.log(res.data.message);
      })
      .catch((error) => {
        if(error.response) {
          console.log(error.response.data.message);
        } else if (error.request) {
          console.log('Server connection Issue');
        } else {
          console.log(error.message);
        }
      })
  }

  const addMWNTReq = ( username, moviesWatched) => {
    axios.put('/api/user/addmoviewatched', { username, moviesWatched })
      .then(res => {
        console.log(res.data.message);
      })
      .catch((error) => {
        if(error.response) {
          console.log(error.response.data.message);
        } else if (error.request) {
          console.log('Server connection Issue');
        } else {
          console.log(error.message);
        }
      })
  }

  return (
    <ThemeProvider theme={theme}>
      {userData.isLoggedIn
        ? (
          <div>
            <NavBar 
            onChange={handleInputChange} 
            onSubmit={handleSumbit} 
            handleLogout={handleLogout}
            />
            <div className={classes.toolbar}>
              <Switch>
                <Route exact path={["/", "/cardnote"]}>
                  <CardNote />
                </Route>
                <Route exact path={["/theater"]}>
                  <Theater 
                  theaterList={userData.movies_watched_theater}
                  clickMovie={theaterListClickMovie}
                  />
                </Route>
                <Route exact path={["/together"]}>
                  <Together
                  togetherList={userData.movies_watched}
                  clickMovie={ListClickMovie}
                  />
                </Route>
                <Route exact path={["/singlemovie"]}>
                  <SingleMovie 
                  movie={singleMovie}
                  addMWNT={addMWNT}
                  addMWT={addMWT}
                  userData={userData}
                  />
                </Route>
                <Route exact path={["/search"]}>
                  <SearchMovie 
                  results={searchResults}
                  nextPage={getSearchResults}
                  totalPages={totalPages}
                  movie={searchMovie}
                  clickMovie={searchClickMovie}
                  />
                </Route>
                <Route exact path={["/singlemovielist"]}>
                  <SingleList 
                  movie={singleMovie}
                  userData={userData}
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
