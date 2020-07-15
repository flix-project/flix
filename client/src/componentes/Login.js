import React, { useState, useContext, useEffect } from 'react';
import { Link, makeStyles, Container, Checkbox, Grid, Typography, Button, FormControlLabel, TextField, CssBaseline, Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AuthContext from '../context/auth/AuthContext';
import Alert from '@material-ui/lab/Alert';
import MainHeader from './MainHeader';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const Login = (props) => {
const classes= useStyles();

    const authContext = useContext(AuthContext);
    const { message, autenticated, login, spinner } = authContext;
    
      // if password or user doesn't exist
      useEffect(() => {
        if(autenticated && !spinner) {
            props.history.push('/home');
        }
        // eslint-disable-next-line
    }, [message, autenticated, props.history]);

    // State for login
    const [user, saveUser] = useState({
        email: '',
        password: ''
    });

    // destructuring
    const { email, password } = user;

    const onChange = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    // when login
    const onSubmit = e => {
        e.preventDefault();
        // send to action
        login({ email, password });
    }

    return(
  <>
  <MainHeader />
<Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h5" align="center">
                  Search for your favorite movies and TV shows
                </Typography>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form 
        className={classes.form} 
        validate="true"
        onSubmit={onSubmit}
        >
  
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
              { message ? <Alert severity="error" >{message.msg}</Alert> : null }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </>
    );
}
export default Login;