import React, {useState} from 'react';
import { Paper, TextField, Button, FormControl } from '@material-ui/core';
import decode from 'jwt-decode';
import useStateWithCallback from 'use-state-with-callback';
const auth = require('@planet/client/api/auth');
const errors = require('@planet/client/api/errors');

export const Container = ({state, handleLogin, handleLogout}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useStateWithCallback('', errors => {console.log(errors)});
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [user, setUser] = useState(state)
  
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
    auth.login( this.state.email, this.state.password ).then(token => {
      const user = decode(token);
      if(user){
        handleLogin(user);
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
    this.setState({email: e.target.value}, () => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(state.email.toLowerCase())){
        setState({validEmail: true})
      } else {
        this.setState({validEmail: false})
      }
    })
  };
  
  const onChangePass = (e) => {
    this.setState({password: e.target.value}, () => {
      if(state.password.length > 0){
        setState( {validPassword: true})
      } else {
        this.setState({validPassword: false})
      }
    })
  };
 
  return(
    <Paper>
      <FormControl>
        <TextField required={true} name={'email'} placeholder={'Email'} variant={'outlined'} onChange={(e) => onChangeEmail(e)} value={state.email}/>
        <TextField required={true} name={'password'} placeholder={'Password'} type="password" variant={'outlined'} onChange={(e) => onChangePass(e)} value={state.password}/>
        <Button disabled={!this.state.validEmail && !this.state.validPassword} onClick={() => {this.login()}}>Login</Button>
      </FormControl>
    </Paper>
  )
  
}