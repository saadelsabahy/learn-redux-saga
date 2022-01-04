import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, compose, createStore } from 'redux';
import reducers from '../reducers';
import rootSaga from '../sagas';
const sagaMiddleWare = createSagaMiddleware();

export const store = createStore(
	reducers,
	applyMiddleware(sagaMiddleWare)
	// compose(
	// 	applyMiddleware(sagaMiddleWare),
	// 	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	// 		window.__REDUX_DEVTOOLS_EXTENSION__()
	// )
);
sagaMiddleWare.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store.dispatch({ type: 'test' });
// store.dispatch({ type: 'test' });
// store.dispatch({ type: 'test' });
