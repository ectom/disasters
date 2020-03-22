import { createStore } from 'redux';
import { countReducer } from './reducers/counter';

export const store = createStore(countReducer);