import { getSocketData, getUserRequest } from './ActionTypes';

export const onGetUserRequest = () => {
	return {
		type: getUserRequest,
	};
};

export const onGetSocketRequest = () => {
	return {
		type: getSocketData,
	};
};
