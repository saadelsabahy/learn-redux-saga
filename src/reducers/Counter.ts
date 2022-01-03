import { AnyAction } from 'redux';
import { decrement, increment } from '../actions/ActionTypes';
import IAction, { ICounterInitialState, IUsersInitialState } from '../types';

const initialState: ICounterInitialState = {
	counter: 0,
};

export default (
	state = initialState,
	{ type, payload }: IAction<IUsersInitialState>
) => {
	switch (type) {
		case increment:
			return { ...state, counter: state.counter + 1 };
		case decrement:
			return { ...state, counter: state.counter - 1 };
		default:
			return state;
	}
};
