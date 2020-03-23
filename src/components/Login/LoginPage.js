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

// const mapDispatchToProps = dispatch => {
//   return {
//     handleIncrementClick: () => dispatch( { type: 'INCREMENT', payload: 'user guy' } ),
//     handleDecrementClick: () => dispatch( { type: 'DECREMENT', payload: 'no user' } )
//   }
// };

export const LoginPage = connect( mapStateToProps, mapDispatchToProps )( LoginContainer );