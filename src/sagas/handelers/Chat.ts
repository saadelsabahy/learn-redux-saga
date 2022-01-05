import { END, eventChannel } from 'redux-saga';
import {
	all,
	call,
	put,
	take,
	takeEvery,
	takeLatest,
} from 'redux-saga/effects';
import { io, Socket } from 'socket.io-client';
import {
	getSocketData,
	getSocketDataFailed,
	getSocketDataSuccess,
	joinChat,
	joinChatFailed,
	joinChatSuccess,
	stopSocketServer,
} from '../../actions/ActionTypes';

const onJoin = (socket: Socket) => {
	socket.on('disconnect', () => {
		socket.connect();
		console.log(' saga chat socket disconnected');
	});

	socket.emit('join', { username: 'tes', room: 'test' }, (error) => {
		if (error) {
			console.log({ error });
		}
		//emitter(new Date(msg.time).toString());
	});
	return eventChannel((emitter) => {
		socket.on('roomData', ({ room, users }) => {
			console.log('new room', { room, users });
			emitter({ room, users });
			// navigation.navigate('Chat', { userName, roomName });
		});
		return () => {
			emitter(END);
		};
	});
};

// function* sagaStopSocket() {
// 	yield put({
// 		type: stopSocketServer,
// 		payload: { errorMessage: 'server disconnected' },
// 	});
// }
const runJoinChatAction = function* () {
	const socket: Socket = io('http://localhost:3000', {
		transports: ['websocket'],
	});
	const chan = yield call(onJoin, socket);
	while (true) {
		try {
			const value = yield take(chan);
			yield put({ type: joinChatSuccess, payload: { data: value } });
		} catch (err) {
			yield put({
				type: joinChatFailed,
				payload: { errorMessage: err },
			});
			console.error('socket error:', err);
			// socketChannel is still open in catch block
			// if we want end the socketChannel, we need close it explicitly
			// socketChannel.close()
		}
	}
};
function* getChatDataWatcher() {
	yield takeLatest(joinChat, runJoinChatAction);
}

export default getChatDataWatcher;
