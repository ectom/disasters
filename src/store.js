import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loginReducer } from './reducers/login';
import { countReducer } from './reducers/counter';

const reducers = combineReducers({count: countReducer, login: loginReducer});

export const store = createStore(reducers, composeWithDevTools());
