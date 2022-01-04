import { combineReducers } from 'redux';
import counter from './Counter';
import socket from './socket';
import users from './users';
const reducers = combineReducers({
	counter,
	users,
	socket,
});

export default reducers;
