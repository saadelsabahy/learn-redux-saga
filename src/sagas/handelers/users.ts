import { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import {
	call,
	CallEffect,
	put,
	PutEffect,
	StrictEffect,
	takeEvery,
	takeLatest,
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
	console.log('get users');

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
	//takeLatest if i press the button twice to fetch data the two actions fires but only one response will return
	// yield takeLatest(getUserRequest, getUserSaga);

	//takeEvery if i press the button twice to fetch data the two actions fires and two responses for  will return
	yield takeEvery(getUserRequest, getUserSaga);
}

export default watchUsersSaga;
