import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../reducers';
import rootSaga from '../sagas';
const sagaMiddleWare = createSagaMiddleware();

export const store = createStore(reducers, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
