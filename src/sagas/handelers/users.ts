import { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import {
	call,
	CallEffect,
	put,
	PutEffect,
	StrictEffect,
	takeEvery,
} from 'redux-saga/effects';
import {
	getUserFailed,
	getUserRequest,
	getUserSuccess,
} from '../../actions/ActionTypes';
import Api from '../../api';
import { IUser, IUsersInitialState } from '../../types';
import { getUsers } from '../requests/users';

function* getUserSaga(dispatch) {
	try {
		const users: AxiosResponse = yield call(Api.get, '/users');
		yield put({ type: getUserSuccess, payload: { users: users.data } });
	} catch (error) {
		yield put({
			type: getUserFailed,
			payload: { errorMessage: 'error occur' },
		});
	}
}

function* watchUsersSaga(): Generator<StrictEffect> {
	yield takeEvery(getUserRequest, getUserSaga);
}

export default watchUsersSaga;
