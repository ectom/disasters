import React, { useEffect, useState } from 'react';
import { Button, FormControl, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import decode from 'jwt-decode';
import { store } from '../../store';

const auth = require( '@planet/client/api/auth' );
// const errors = require( '@planet/client/api/errors' );

const useStyles = makeStyles( theme => ( {
  paper: {
    position: 'absolute',
    width: '35%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing( 2, 4, 3 ),
    marginLeft: '30%',
    marginRight: '35%',
    marginTop: '10%'
  },
} ) );

export const LoginContainer = ( {user, handleOpen, handleLogin, handleLogout} ) => {
  const classes = useStyles();
  
  let [email, setEmail] = useState('');
  useEffect(() => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test( email.toLowerCase() ) ) {
      setValidEmail( true )
    } else {
      setValidEmail( false )
    }
  }, [email]);
  
  let [password, setPassword] = useState( '');
  useEffect(() => {
    if ( password.length > 0 ) {
      setValidPassword( true )
    } else {
      setValidPassword( false )
    }
  }, [password] );
  
  let [errors, setErrors] = useState('');
  useEffect((errors) => {
    console.log( errors )
  }, [errors] );
  
  let [validEmail, setValidEmail] = useState( false );
  let [validPassword, setValidPassword] = useState( false );
  
  let [theUser, setTheUser] = useState( store.getState() );
  useEffect(() => {
    // let mounted = true;
    // if(mounted){
      // handleLogin( theUser );
    console.log(theUser);
    // }
    // return () => mounted = false;
  }, [theUser]);
  
  const login = () => {             // TODO this is being called when the modal is opened in the navbar, not when the credentials are entered and logged i\
    handleOpen();
    auth.login( email, password ).then( token => {
      const credentials = decode( token );
      if ( credentials ) {
        let info = {
          user_id: credentials.user_id,
          api_key: credentials.api_key,
          user_name: credentials.user_name,
          email: credentials.email,
          isLoggedIn: true
        };
        handleLogin(info, () => {
          setTheUser( store.getState );
        });
      }
    } ).catch( err => {
      console.log( err );
      if ( err.status === 400 ) {
        setErrors( err.errors.email[0] );
      } else if ( err.status === 401 ) {
        setErrors( err.body.message );
      }
    } )
  };

  const logout = () => {
    handleLogout();
  };

  // TODO better way to name actions might fix this?
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  };

  const onChangePass = (e) => {
    setPassword(e.target.value)
  };
  
  const Login = () => {
    if (user.isLoggedIn) {
      return (
        <>
        <h4>Welcome {user.user_name}!</h4>
        <Button onClick={() => logout()}>Logout</Button>
        <h1>Earthquakes</h1>
        </>
      )
    }
    return (
      <Paper className={classes.paper}>
        <h2>Log In to Planet Labs</h2>
        <FormControl>
          <TextField required={true} name={'email'} placeholder={'Email'} variant={'outlined'}
                     onChange={( e ) => {onChangeEmail( e )}} value={email}/>
          <TextField required={true} name={'password'} placeholder={'Password'} type="password" variant={'outlined'}
                     onChange={( e ) => {onChangePass( e )}} value={password}/>
          <Button disabled={!validEmail && !validPassword} onClick={() => login()}>Login</Button>
        </FormControl>
      </Paper>
    )
  };

  return(<Login/>)
};
