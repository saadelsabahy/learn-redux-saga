import { AnyAction } from 'redux';
import {
	decrement,
	getUserFailed,
	getUserRequest,
	getUserSuccess,
	increment,
} from '../actions/ActionTypes';
import IAction, { IUsersInitialState } from '../types';

const initialState: IUsersInitialState = {
	loading: false,
	errorMessage: '',
	users: [],
};

export default (
	state = initialState,
	{ type, payload }: IAction<IUsersInitialState>
) => {
	switch (type) {
		case getUserRequest:
			return { ...state, loading: true };
		case getUserSuccess:
			return { ...state, users: payload.users, loading: false };
		case getUserFailed:
			return {
				...state,
				errorMessage: payload.errorMessage,
				loading: false,
			};
		default:
			return state;
	}
};
