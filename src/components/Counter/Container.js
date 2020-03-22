import React from 'react';

export const Container = ( {count, handleIncrementClick, handleDecrementClick}) => (
  <div className="App">
    <h1>Count: {count}</h1>
    <button onClick={handleDecrementClick}>Decrement</button>
    <button onClick={handleIncrementClick}>Increment</button>
  </div>
);
