import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF'
  },
  inline: {
    display: 'inline',
    color: '#FFFFFF'
  },
  divider: {
    backgroundColor: theme.palette.secondary.main
  },
  pagination: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  grid: {
    flexGrow: 1,
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const { totalPages, movie, nextPage, clickMovie } = props;
  const [page, setPage] = useState(1);


  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
    nextPage(newPage, movie);
    window.scrollTo( 0, 0 );
  };

  const clickSingleMovie = (event) => {
    const index = event.currentTarget.id;
    event.preventDefault();
    clickMovie(index);
  }


  const renderResults = props.results.map((item, index) => {
    return (
      <>
        <ListItem
        key={"Movie" + index} 
        alignItems="flex-start"
        id={index} 
        onClick={clickSingleMovie}
        >
          <ListItemAvatar>
            <Avatar variant="square" alt={item.title} src={item.poster} />
          </ListItemAvatar>
          <ListItemText
            primary={item.title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {item.overview}
                </Typography>
                {item.releaseDate}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider key={"Divider" + index} component="li" className={classes.divider} />
      </>
    )
  })

  return (
    <Grid container alignContent='center'>
      <Grid item className={classes.grid}>
      <div className={classes.pagination}>
        <Pagination 
        count={totalPages} 
        color="primary" 
        onChange={handleChangePage}
        page={page}
        />
      </div>
      </Grid>
      <Grid item>
      <List className={classes.root}>
        {renderResults}
      </List>
      <div className={classes.pagination}>
        <Pagination 
        count={totalPages} 
        color="primary" 
        onChange={handleChangePage}
        page={page}
        />
      </div>
      </Grid>
    </ Grid>
  );
}