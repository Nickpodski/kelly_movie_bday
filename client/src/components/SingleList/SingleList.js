import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90vw",
  },
  media: {
    height: "60vh",
    width: "auto"
  },
  paper: {
    position: 'absolute',
    width: "60vw",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  icon: {
    fontSize: 40,
  }
}));

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const SingleList = (props) => {
  const { movie, addMWT, addMWNT, userData } = props;
  const classes = useStyles();
  let history = useHistory();

  const goBack = (e) => {
    e.preventDefault();
    history.push("/together");
  }

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item >
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={movie.poster}
                title={movie.title}
                component="img"
                onClick={goBack}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {movie.overview}
                  <br />
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <br />
                  Release Date: {movie.release_date}
                  <br />
                  Rating: {movie.rating}
                  <br />
                  Vote Count: {movie.vote_count}
                  <br />
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default SingleList;