import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Earthquakes from './components/Earthquakes';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div className="App">
      <LoginPage/>
      <h1>Earthquakes</h1>
      <Earthquakes/>
    </div>
  );
}

export default App;
