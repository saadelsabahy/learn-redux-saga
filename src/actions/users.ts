import { getSocketData, getUserRequest, joinChat } from './ActionTypes';

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

export const onJoinChat = () => {
	return {
		type: joinChat,
	};
};
