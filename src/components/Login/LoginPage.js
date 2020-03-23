import { connect } from 'react-redux';
import { LoginContainer } from './LoginContainer';

const mapStateToProps = state => {
  return {
    user: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: ( user ) => dispatch( { type: 'LOGIN', payload: user } ),
    handleLogout: () => dispatch( { type: 'LOGOUT' } )
  }
};

export const LoginPage = connect( mapStateToProps, mapDispatchToProps )( LoginContainer );