import { END, eventChannel } from 'redux-saga';
import { call, cancel, fork, put, select, take } from 'redux-saga/effects';
import io from 'socket.io-client';
import {
	addUser,
	login,
	logout,
	newMessage,
	removeUser,
	sendMessage,
} from '../../actions/chat';

function connect() {
	const socket = io('http://192.168.1.6:3000', {
		transports: ['websocket'],
		//jsonp: false,
		forceNew: true,
	});
	return new Promise((resolve) => {
		resolve(socket);
	});
}

// function* deleteMessageListener(messageID, emit) {
// 	let messages = yield select(getMessages);
// 	const newMessages = messages.filter((message) => message._id !== messageID);
// 	emit(newMessages);
// }
function subscribe(socket) {
	return eventChannel((emit) => {
		// socket.on('users.login', ({ username }) => {
		// 	emit(addUser({ username }));
		// });
		// socket.on('users.logout', ({ username }) => {
		// 	emit(removeUser({ username }));
		// });
		socket.on('message', (message) => {
			const {
				id,
				user: { id: userId, name },
				value,
				time,
			} = message;
			const receivedMessage = {
				_id: id,
				text: value,
				createdAt: new Date(time),
				user: {
					_id: userId,
					name,
					//avatar: 'https://placeimg.com/140/140/any',
				},
			};
			emit(newMessage({ message: receivedMessage }));
		});
		//socket.on('deleteMessage', deleteMessageListener);
		socket.emit('getMessages', (erro) => {
			console.log('get messages err');
		});

		socket.on('disconnect', (e) => {
			console.log('disconnected from saga');
		});
		return () => {
			emit(END);
		};
	});
}

function* read(socket) {
	try {
		const channel = yield call(subscribe, socket);

		while (true) {
			let action = yield take(channel);
			yield put(action);
		}
	} catch (error) {
		console.log('read error', error);
	}
}

function* send(socket) {
	while (true) {
		const { payload } = yield take(`${sendMessage}`);
		socket.emit('message', payload);
	}
}

function* handleIO(socket) {
	yield fork(read, socket);
	yield fork(send, socket);
}

export default function* flow() {
	while (true) {
		let {
			payload: { userName },
		} = yield take(`${login}`);
		yield put(addUser({ userName }));

		const socket = yield call(connect);
		console.log('connect', socket);
		// socket.emit('login', { username: payload.username });

		const task = yield fork(handleIO, socket);

		let {
			payload: { userName: name },
		} = yield take(`${logout}`);
		yield put(removeUser({ userName: name }));
		yield cancel(task);
		// socket.emit('logout');
	}
}
