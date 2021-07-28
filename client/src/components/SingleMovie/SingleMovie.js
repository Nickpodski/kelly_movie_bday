import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';
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

const SingleMovie = (props) => {
  const { movie, addMWT, addMWNT, userData } = props;
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const handleMovieAdd = () => {
    setOpen(true);
  }

  const addMovieTheater = (e) => {
    e.preventDefault();
    setOpen(false);
    addMWT(movie);
  }

  const addMovieNoTheater = (e) => {
    e.preventDefault();
    setOpen(false);
    addMWNT(movie);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const goBack = (e) => {
    e.preventDefault();
    history.push("/search");
  }

  const renderAdd = () => {
    const mWT = userData.movies_watched_theater;
    const mWNT = userData.movies_watched;
    if (mWT.some(e => e.movie_id === movie.id || mWNT.some(e => e.movie_id === movie.id))) {
      return true;
    } else {
      return false;
    }
  }

  const [watched] = useState(renderAdd);


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Theater</h2>
      <p id="simple-modal-description">
        Did we watch this in the movie theater?
      </p>
      <Button variant="contained" color="primary" onClick={addMovieTheater}>
        Yes
      </Button>
      <Button variant="contained" color="primary" onClick={addMovieNoTheater}>
        No
      </Button>
    </div>
  );

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
                  {watched
                    ? (null)
                    : (
                      <Icon
                        color="secondary"
                        onClick={handleMovieAdd}
                        className={classes.icon}
                      >
                        add_circle
                      </Icon>
                    )
                  }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {movie.overview}
                  <br />
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <br />
                  Release Date: {movie.releaseDate}
                  <br />
                  Rating: {movie.rating}
                  <br />
                  Vote Count: {movie.voteCount}
                  <br />
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default SingleMovie;