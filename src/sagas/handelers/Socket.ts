import { END, eventChannel } from 'redux-saga';
import {
	all,
	call,
	put,
	take,
	takeEvery,
	takeLatest,
} from 'redux-saga/effects';
import { io } from 'socket.io-client';
import {
	getSocketData,
	getSocketDataFailed,
	getSocketDataSuccess,
	stopSocketServer,
} from '../../actions/ActionTypes';
import { store } from '../../store';
const receiveMessage = (socket) => {
	socket.on('disconnect', () => {
		socket.connect();
		console.log('socket disconnected');
		store.dispatch({
			type: stopSocketServer,
			payload: { errorMessage: 'server disconnected' },
		});
	});
	return eventChannel((emitter) => {
		socket.on('time-msg', (msg) => {
			emitter(new Date(msg.time).toString());
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
const runOurAction = function* () {
	const socket = io('http://localhost:3000', {
		transports: ['websocket'],
	});
	const chan = yield call(receiveMessage, socket);
	while (true) {
		try {
			const value = yield take(chan);
			yield put({ type: getSocketDataSuccess, payload: { data: value } });
		} catch (err) {
			yield put({
				type: getSocketDataFailed,
				payload: { errorMessage: err },
			});
			console.error('socket error:', err);
			// socketChannel is still open in catch block
			// if we want end the socketChannel, we need close it explicitly
			// socketChannel.close()
		}
	}
};
function* getAsyncDataWatcher() {
	yield takeLatest(getSocketData, runOurAction);
}

export default getAsyncDataWatcher;
