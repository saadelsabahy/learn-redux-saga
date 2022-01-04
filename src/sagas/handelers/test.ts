import {
	actionChannel,
	call,
	delay,
	fork,
	join,
	put,
	StrictEffect,
	take,
	takeEvery,
	takeLatest,
} from 'redux-saga/effects';

function* testSaga() {
	delay(5000);
	try {
		console.log('hello in test');
		console.log(put({ type: 'ACTION_FROM_WORKER' }));
	} catch (error) {}
}
function* secondTestSaga() {
	try {
		console.log('hello in test2');
		console.log(put({ type: 'ACTION_FROM_SECOND' }));
	} catch (error) {}
}

// function* requestSequentially(type: string) {
// 	const chan = yield actionChannel(type);
// 	let index = 0;
// 	while (true) {
// 		const ac = yield take(chan);
// 		yield (index += 1);
// 		console.log('channel', ac, index);
// 	}
// }

function* watchTestSaga(): Generator<StrictEffect> {
	//action inside take must be dispatched to execute what after it
	yield take('test');
	yield call(testSaga);
	console.log('wait until call execution complete');

	yield fork(secondTestSaga);
	console.log('not wait until fork execution complete');

	//yield fork(requestSequentially, 'SAVE_SEQUENTIALLY');
}

export default watchTestSaga;
