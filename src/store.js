import { createStore } from 'redux';
import { countReducer } from './reducers/counter';
import { loginReducer } from './reducers/login';

export const store = createStore(countReducer, loginReducer);