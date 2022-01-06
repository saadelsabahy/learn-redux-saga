import { all } from 'redux-saga/effects';
import chatFlow from './handelers/Chat';
import getAsyncDataWatcher from './handelers/Socket';
import watchTestSaga from './handelers/test';
import watchUsersSaga from './handelers/users';

export default function* rootSaga() {
	yield all([
		watchUsersSaga(),
		watchTestSaga(),
		getAsyncDataWatcher(),
		chatFlow(),
	]);
}
