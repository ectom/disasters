import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loginReducer } from './reducers/login';

export const store = createStore(loginReducer, composeWithDevTools());
