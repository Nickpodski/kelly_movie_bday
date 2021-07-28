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

export default function Theater(props) {
  const classes = useStyles();
  const { clickMovie, theaterList } = props;

  const clickSingleMovie = (event) => {
    const index = event.currentTarget.id;
    event.preventDefault();
    clickMovie(index);
  }


  const renderResults = theaterList.map((item, index) => {
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
                {item.release_date}
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
      <List className={classes.root}>
        {renderResults}
      </List>
      </Grid>
    </ Grid>
  );
}