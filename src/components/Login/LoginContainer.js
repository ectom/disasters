import React, { useEffect, useState } from 'react';
import { Paper, TextField, Button, FormControl } from '@material-ui/core';
import decode from 'jwt-decode';
import Earthquakes from '../Earthquakes';

const auth = require( '@planet/client/api/auth' );
// const errors = require( '@planet/client/api/errors' );


export const LoginContainer = ( {user, handleLogin, handleLogout} ) => {
  
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
  
  let [theUser, setTheUser] = useState( user );
  useEffect(() => {
    handleLogin( theUser )
  }, [theUser]);
  
  const login = () => {
    auth.login( email, password ).then( token => {
      const credentials = decode( token );
      if ( credentials ) {
        let info = {
          user_id: '',
          api_key: '',
          user_name: '',
          email: '',
          isLoggedIn: true
        };
        info['user_id'] = credentials.user_id;
        info['api_key'] = credentials.api_key;
        info['user_name'] = credentials.user_name;
        info['email'] = credentials.email;
        setTheUser( info );
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
    if (user.login.isLoggedIn) {
      return (
        <>
        <h4>Welcome {user.login.user_name}!</h4>
        <Button onClick={() => logout()}>Logout</Button>
        <h1>Earthquakes</h1>
        {/*<Earthquakes/>*/}
        </>
      )
    }
    return (
      <>
      <h2>Log In</h2>
      <Paper>
        <FormControl>
          <TextField required={true} name={'email'} placeholder={'Email'} variant={'outlined'} onChange={(e) => onChangeEmail(e)} value={email}/>
          <TextField required={true} name={'password'} placeholder={'Password'} type="password" variant={'outlined'} onChange={(e) => onChangePass(e)} value={password}/>
          <Button disabled={!validEmail && !validPassword} onClick={() => login()}>Login</Button>
        </FormControl>
        <Earthquakes/>
      </Paper>
      </>
    )
  };

  return(<Login/>)
};
