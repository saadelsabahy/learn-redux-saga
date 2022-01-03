import { AnyAction } from 'redux';
import { decrement, increment } from './ActionTypes';
export const onIncrement = (): AnyAction => {
	return {
		type: increment,
	};
};

export const onDecrement = (): AnyAction => {
	return {
		type: decrement,
	};
};
