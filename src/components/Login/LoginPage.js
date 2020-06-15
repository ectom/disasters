import { connect } from 'react-redux';
import { LoginContainer } from './LoginContainer';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state,
    handleOpen: ownProps.handleOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: ( user ) => dispatch( { type: 'LOGIN', payload: user } ),
    handleLogout: () => dispatch( { type: 'LOGOUT' } ),
  }
};

export const LoginPage = connect( mapStateToProps, mapDispatchToProps )( LoginContainer );