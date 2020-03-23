import { connect } from 'react-redux';
import { CounterContainer } from './CounterContainer';

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

export const Counter = connect( mapStateToProps, mapDispatchToProps )( CounterContainer );
