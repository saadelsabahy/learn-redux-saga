import { getUserRequest } from './ActionTypes';

export const onGetUserRequest = () => {
	return {
		type: getUserRequest,
	};
};
