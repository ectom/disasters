import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { LoginPage } from './components/Login/LoginPage';
import { store } from './store';

function App() {
  
  return (
    <>
      <Provider store={store}>
        <LoginPage/>
      </Provider>
    </>
  );
}

export default App;
