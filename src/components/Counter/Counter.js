import { connect } from 'react-redux';
import { Container } from './Container';

const mapStateToProps = state => {
  return {
    count: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleIncrementClick: () => dispatch( { type: 'INCREMENT' } ),
    handleDecrementClick: () => dispatch( { type: 'DECREMENT' } )
  }
};

export const Counter = connect( mapStateToProps, mapDispatchToProps )( Container );