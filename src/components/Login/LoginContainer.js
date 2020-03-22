import React from 'react';
import { Paper, TextField, Button, FormControl } from '@material-ui/core';
import decode from 'jwt-decode';
import useStateWithCallback from 'use-state-with-callback';
const auth = require('@planet/client/api/auth');
const errors = require('@planet/client/api/errors');

export const LoginContainer = ( {state, handleLogin, handleLogout} ) => {
  const [email, setEmail] = useStateWithCallback('');
  const [password, setPassword] = useStateWithCallback('');
  const [errors, setErrors] = useStateWithCallback('', errors => {console.log(errors)});
  const [validEmail, setValidEmail] = useStateWithCallback(false);
  const [validPassword, setValidPassword] = useStateWithCallback(false);
  const [user, setUser] = useStateWithCallback(state);
  
   // user = {
   //   program_id: 29,
   //   token_type: "auth",
   //   role_level: 100,
   //   organization_id: 216940,
   //   user_id: 222661,
   //   plan_template_id: null,
   //   membership_id: 214303,
   //   organization_name: "testplanetexplorer+haha@gmail.com",
   //   2fa: false,
   //   exp: 1582848363,
   //   api_key: "02b45fb49026440cac7f27804d71e35a",
   //   user_name: "test test",
   //   email: "testplanetexplorer+haha@gmail.com"
   // }
  
  const login = () => {
    auth.login( email, password ).then(token => {
      const credentials = decode(token);
      if(credentials){
        setUser(credentials, () => handleLogin(user));
      }
    }).catch(err => {
      console.log(err);
      if(err.status === 400){
        setErrors(err.errors.email[0]);
      } else if(err.status === 401){
        setErrors(err.body.message);
      }
    })
  };
  
  const logout = () => {
    handleLogout();
  };
  
  const onChangeEmail = (e) => {
    setEmail(e.target.value, () => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(email.toLowerCase())){
        setValidEmail(true)
      } else {
        setValidEmail(false)
      }
    })
  };
  
  const onChangePass = (e) => {
    setPassword(e.target.value, () => {
      if(password.length > 0){
        setValidPassword(true)
      } else {
        setValidPassword(false)
      }
    })
  };
 
  return(
    <Paper>
      <FormControl>
        <TextField required={true} name={'email'} placeholder={'Email'} variant={'outlined'} onChange={(e) => onChangeEmail(e)} value={email}/>
        <TextField required={true} name={'password'} placeholder={'Password'} type="password" variant={'outlined'} onChange={(e) => onChangePass(e)} value={password}/>
        <Button disabled={!validEmail && !validPassword} onClick={() => {login()}}>Login</Button>
      </FormControl>
    </Paper>
  )
};