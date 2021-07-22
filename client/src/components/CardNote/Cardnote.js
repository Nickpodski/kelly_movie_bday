import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  body: {
    margin: theme.spacing(2),
    color: 	'#FFFFFF',
    textAlign: 'center'
  }
}));

function CardNote() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.body}>
        Happy birthday my beautifully gorgeous hot ass girlfriend! I had a billion ideas of what to do for your birthday! I’m really glad you were so excited by wingspan at target and I got it. One of my ideas kind of fell in place when we went to see black widow and it triggered an inspiration. And to be honest I almost changed my mind again before I saw the gift on amazon I got. I was always planning on making some sort of website, and I got it done; Even with my indecisive/procrastination spiral! My ultimate thought around this idea was how we both love watching movies, and have always had a little debate on whose watched more. Which led me to this! Why not just keep track of what we’ve watched together! That’s all that really matters, because I plan on watching movies with you for the rest of my life! I love you so much! Happy  3 21st birthday!
      </Typography>
      <Typography variant="body1" className={classes.body}>
        P.S. It’s going to be fun trying to remember what we’ve watched together already! Which is why the box will be just for movies in theaters together!
      </Typography>
    </div>
  )
}

export default CardNote;