import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100vh',
    margin: theme.spacing(4),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  header: {
    margin: theme.spacing(1),
    color: theme.palette.primary.main
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Login(props) {
  const { saveUserData } = props;
  const classes = useStyles();
  const formRef = useRef();
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");

  const onUserNameChange = (event) => {
    const newUserName = event.target.value;
    setUserName(newUserName);
  }

  const onPassWordChange = (event) => {
    const newPassWord = event.target.value;
    setPassWord(newPassWord);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    formRef.current.reset();
    axios.post('api/user/login', { username, password } )
      .then(async (res) => {
        saveUserData(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.message);
        } else if (error.request) {
          console.log('Server connection Issue!');
        } else {
          console.log(error.message);
        }
      })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className={classes.root}>
          <div>{/* Help's layout! */}</div>
          <div>
            <Typography variant="h4" className={classes.header} gutterBottom component="h4">
              Happy Birthday Kelly!
            </Typography>
            <form onSubmit={handleSubmit} ref={formRef}>
                <TextField
                  id="outlined-full-width"
                  label="Username"
                  style={{ margin: 8 }}
                  placeholder="Enter Username"
                  helperText="Check your envelope!"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={onUserNameChange}
                />
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  style={{ margin: 8 }}
                  placeholder="Enter Password"
                  helperText="Check your envelope!"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={onPassWordChange}
                />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
                onClick={handleSubmit}
                type="submit"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>


  )
}

export default Login;