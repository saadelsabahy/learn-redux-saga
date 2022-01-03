import { combineReducers } from 'redux';
import counter from './Counter';
import users from './users';
const reducers = combineReducers({
	counter,
	users,
});

export default reducers;
