import React, {Component} from 'react';
import { Paper, TextField, Button, FormControl, Typography } from '@material-ui/core';
import { lightGreen } from '@material-ui/core/colors';

const auth = require('@planet/client/api/auth');
const errors = require('@planet/client/api/errors');

export default class LoginPage extends Component {
  constructor( props ){
    super( props );
    this.state = {
      email: '',
      password: ''
    }
  }
  
  login(){
    auth.login( this.state.email, this.state.password ).then((res) => {
      console.log(res);
    })
  };
  
  onChangeEmail(e) {
    this.setState({email: e.target.value})
  }
  
  onChangePass(e) {
    this.setState({password: e.target.value})
  }
  
  render(){
    return(
      <Paper>
        <FormControl>
          <TextField name={'email'} placeholder={'Email'} variant={'outlined'} onChange={(e) => this.onChangeEmail(e)} value={this.state.email}/>
          <TextField name={'password'} placeholder={'Password'} type="password" variant={'outlined'} onChange={(e) => this.onChangePass(e)} value={this.state.password}/>
          <Button onClick={() => {this.login()}}>Login</Button>
        </FormControl>
      </Paper>
    )
  }
}