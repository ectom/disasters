import { connect } from 'react-redux';
import { LoginContainer } from './LoginContainer';

const mapStateToProps = state => {
  return {
    user: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (user) => {return dispatch({ type: 'LOGIN', payload: user })},
    handleLogout:() => {return dispatch( { type: 'LOGOUT' } )}
  }
};

export const LoginPage = connect( mapStateToProps, mapDispatchToProps )( LoginContainer );