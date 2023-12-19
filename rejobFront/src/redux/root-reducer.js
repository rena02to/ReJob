//reducer que armazenamento de todos os reducers
import { combineReducers } from 'redux';
import useReducer from './reducer';

const rootReducer = combineReducers({ useReducer });
export default rootReducer;