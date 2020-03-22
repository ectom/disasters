import { createStore, combineReducers } from 'redux';
// import { countReducer } from './reducers/counter';
import { loginReducer } from './reducers/login';

// const reducers = combineReducers({count: countReducer, login: loginReducer});

export const store = createStore(loginReducer);