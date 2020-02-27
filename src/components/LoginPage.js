import React, {Component} from 'react';
import { Paper, TextField, Button, FormControl, Typography } from '@material-ui/core';
import { lightGreen } from '@material-ui/core/colors';
import decode from 'jwt-decode';

const auth = require('@planet/client/api/auth');
const errors = require('@planet/client/api/errors');

export default class LoginPage extends Component {
  constructor( props ){
    super( props );
    this.state = {
      email: '',
      password: '',
      errors: ''
    }
  }

//      user = {
//        program_id: 29,
//        token_type: "auth",
//        role_level: 100,
//        organization_id: 216940,
//        user_id: 222661,
//        plan_template_id: null,
//        membership_id: 214303,
//        organization_name: "testplanetexplorer+haha@gmail.com",
//        2fa: false,
//        exp: 1582848363,
//        api_key: "02b45fb49026440cac7f27804d71e35a",
//        user_name: "test test",
//        email: "testplanetexplorer+haha@gmail.com"
//      }

  login(){
    auth.login( this.state.email, this.state.password ).then(token => {
      const user = decode(token)
//      if user:
    }).catch(err => {
      console.log(err)
      if(err.body.errors.email[0]){
        this.setState({errors: err.body.errors.email[0]}, () => {
          console.log(this.state.errors)
        });
      } else if(err.body.message){
        this.setState({errors: err.body.message}, () => {
          console.log(this.state.errors)
        });
      }
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