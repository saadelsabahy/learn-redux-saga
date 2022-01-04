import { Action } from 'redux';

export interface ICounterInitialState {
	counter: 0;
}

export interface IUsersInitialState {
	loading: boolean;
	errorMessage: string;
	users: IUser[];
}

export interface ISocketInitialState {
	loading: boolean;
	errorMessage: string;
	connected: boolean;
	data: string;
}

export interface IUser {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

export default interface IAction<T> extends Action<string> {
	type: string;
	payload?: T;
}
