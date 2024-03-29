import React, { useState, useRef } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import InputBase from '@material-ui/core/InputBase';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: theme.palette.secondary.main
    },
  }, 
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function BottomAppBar(props) {
  const { onChange, onSubmit, handleLogout } = props;
  let history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const formRef = useRef();

  const searchMovie = (e) => {
    e.preventDefault();
    history.push("/search");
    onSubmit();
    formRef.current.reset();
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    const path = e.currentTarget.id;
    setAnchorEl(null);
    if (path === "/logout") {
      handleLogout();
    } else {
      history.push(path);
    }
    
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          {/* <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon />
          </Fab> */}
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            color="inherit"
            className={classes.menu}
          >
            <MenuItem id="/cardnote" onClick={handleClose}>Card Note</MenuItem>
            <MenuItem id="/theater" onClick={handleClose}>Theater Movie List</MenuItem>
            <MenuItem id="/together" onClick={handleClose}>Movies Together List</MenuItem>
            <MenuItem id="/logout" onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <div className={classes.grow} />
          <form className={classes.search} onSubmit={searchMovie} ref={formRef}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={onChange}
            />
          </form>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}