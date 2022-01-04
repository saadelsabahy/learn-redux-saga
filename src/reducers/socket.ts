import { AnyAction } from 'redux';
import {
	decrement,
	getSocketData,
	getSocketDataFailed,
	getSocketDataSuccess,
	getUserFailed,
	getUserRequest,
	getUserSuccess,
	increment,
	stopSocketServer,
} from '../actions/ActionTypes';
import IAction, { ISocketInitialState, IUsersInitialState } from '../types';

const initialState: ISocketInitialState = {
	loading: false,
	connected: false,
	errorMessage: '',
	data: '',
};

export default (
	state = initialState,
	{ type, payload }: IAction<ISocketInitialState>
) => {
	switch (type) {
		case getSocketData:
			return { ...state, loading: true };
		case getSocketDataSuccess:
			return {
				...state,
				data: payload?.data,
				loading: false,
				connected: true,
			};
		case getSocketDataFailed:
			return {
				...state,
				errorMessage: payload?.errorMessage,
				loading: false,
				connected: false,
			};
		case stopSocketServer:
			return {
				...state,
				errorMessage: payload?.errorMessage,
				connected: false,
			};
		default:
			return state;
	}
};
