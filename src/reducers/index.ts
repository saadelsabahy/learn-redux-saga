import { combineReducers } from 'redux';
import { app, messages, users as chatUsers } from './Chat';
import counter from './Counter';
import socket from './socket';
import users from './users';
const reducers = combineReducers({
	counter,
	users,
	socket,
	app,
	messages,
	chatUsers,
});

export default reducers;
