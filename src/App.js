import React from 'react';
import { Provider } from 'react-redux';
import { Counter } from './components/Counter/Counter';
import './App.css';
import Earthquakes from './components/Earthquakes';
import { LoginPage } from './components/Login/LoginPage';
import { store } from './store';

function App() {
  
  return (
    <>
      <Provider store={store}>
        {/*<Counter/>*/}
        <LoginPage/>
        <h1>Earthquakes</h1>
        <Earthquakes/>
      </Provider>
    </>
  );
}

export default App;
