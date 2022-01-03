import { all } from 'redux-saga/effects';
import watchUsersSaga from './handelers/users';

export default function* rootSaga() {
	yield all([watchUsersSaga()]);
}
