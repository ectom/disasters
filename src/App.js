import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Earthquakes from './components/Earthquakes';
import LoginPage from './components/LoginPage';

function App() {
  
  const countReducer = function (state = 0, action) {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      default:
        return state;
    }
  };
  
  let store = createStore(countReducer);
  
  const mapStateToProps = state => {
    return {
      count: state
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
      handleDecrementClick: () => dispatch({type: 'DECREMENT'})
    }
  };
  
  const Component = ({count, handleIncrementClick, handleDecrementClick}) => (
    <div className="App">
      <h1>Helloworld React & Redux! {count}</h1>
      <button onClick={handleDecrementClick}>Decrement</button>
      <button onClick={handleIncrementClick}>Increment</button>
      <LoginPage/>
      <h1>Earthquakes</h1>
      <Earthquakes/>
    </div>
  );
  
  const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
  
  return (
    <Provider store={store}>
      <Container/>
    </Provider>
  );
}

export default App;
