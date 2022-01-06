import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import {
	addUser,
	login,
	logout,
	newMessage,
	removeUser,
} from '../actions/chat';
import { IChatInitialState } from '../types';

const initial: IChatInitialState = {
	app: {
		username: '',
	},
	users: {},
	messages: [],
};

export const app = createReducer<typeof initial.app>(
	{
		[`${login}`]: (state, payload) => {
			return { ...state, username: payload.userName };
		},
		[`${logout}`]: (state, payload) => {
			return { ...state, username: null };
		},
	},
	initial.app
);

export const users = createReducer<typeof initial.users>(
	{
		[`${addUser}`]: (state, payload) => {
			return { ...state, [payload.userName]: true };
		},
		[`${removeUser}`]: (state, payload) => {
			const newState = { ...state };
			delete newState[payload.userName];
			return newState;
		},
	},
	initial.users
);

export const messages = createReducer<typeof initial.messages>(
	{
		[`${newMessage}`]: (state, payload) => {
			const { message } = payload;

			return [...state, message];
		},
	},
	initial.messages
);
