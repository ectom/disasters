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
      errors: '',
      validEmail: false,
      validPassword: false
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
      console.log(user)
//      if user:
    }).catch(err => {
      console.log(err)
      if(err.status === 400){
        this.setState({errors: err.errors.email[0]}, () => {
          console.log(this.state.errors)
        });
      } else if(err.status === 401){
        this.setState({errors: err.body.message}, () => {
          console.log(this.state.errors)
        });
      }
    })
  };
  
  onChangeEmail(e) {
    this.setState({email: e.target.value}, () => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.state.email.toLowerCase())){
        this.setState({validEmail: true})
      } else {
        this.setState({validEmail: false})
      }
    })
  }
  
  onChangePass(e) {
    this.setState({password: e.target.value}, () => {
      if(this.state.password.length > 0){
        this.setState({validPassword: true})
      } else {
        this.setState({validPassword: false})
      }
    })
  }
  
  render(){
    return(
      <Paper>
        <FormControl>
          <TextField required={true} name={'email'} placeholder={'Email'} variant={'outlined'} onChange={(e) => this.onChangeEmail(e)} value={this.state.email}/>
          <TextField required={true} name={'password'} placeholder={'Password'} type="password" variant={'outlined'} onChange={(e) => this.onChangePass(e)} value={this.state.password}/>
          <Button disabled={!this.state.validEmail && !this.state.validPassword} onClick={() => {this.login()}}>Login</Button>
        </FormControl>
      </Paper>
    )
  }
}