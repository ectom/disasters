import { connect } from 'react-redux';
import { Container } from './Container';

const mapStateToProps = state => {
  return {
    user: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: (user) => dispatch( { type: 'LOGIN', user: user } ),
    handleLogout: () => dispatch( { type: 'LOGOUT' } )
  }
};

export const LoginPage = connect( mapStateToProps, mapDispatchToProps )( Container );