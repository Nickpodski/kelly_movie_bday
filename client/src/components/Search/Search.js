import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: 	'#FFFFFF'
  },
  inline: {
    display: 'inline',
    color: '#FFFFFF'
  },
}));

export default function Search(props) {
  const classes = useStyles();

  const renderResults = props.results.map((item, index) => {
    return(
      <ListItem key={"Movie" + index} alignItems="flex-start">
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
    )
  })

  return (
    <List className={classes.root}>
      {renderResults}
    </List>
  );
}