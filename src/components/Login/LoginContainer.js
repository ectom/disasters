import React, { useEffect, useState } from 'react';
import { Paper, TextField, Button, FormControl } from '@material-ui/core';
import decode from 'jwt-decode';
import useStateWithCallback from 'use-state-with-callback';

const auth = require( '@planet/client/api/auth' );
const errors = require( '@planet/client/api/errors' );


export const LoginContainer = ( {state, handleLogin, handleLogout} ) => {
  
  let [email, setEmail] = useState('');
  useEffect(() => {
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
  
  let [user, setUser] = useState( state );
  useEffect(() => {
    console.log( user )
    handleLogin( user )
  }, [user]);
  
  const login = () => {
    auth.login( email, password ).then( token => {
      const credentials = decode( token );
      if ( credentials ) {
        console.log(credentials)
        setUser( credentials );
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

  return(
    <Paper>
      <h1>State: {state}</h1>
      <FormControl>
        <TextField required={true} name={'email'} placeholder={'Email'} variant={'outlined'} onChange={(e) => onChangeEmail(e)} value={email}/>
        <TextField required={true} name={'password'} placeholder={'Password'} type="password" variant={'outlined'} onChange={(e) => onChangePass(e)} value={password}/>
        <Button disabled={!validEmail && !validPassword} onClick={() => login()}>Login</Button>
      </FormControl>
    </Paper>
  )
};
