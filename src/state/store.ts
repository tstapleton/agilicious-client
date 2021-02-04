import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import webSocketMiddleware from '../web-socket/middleware';

export default function configureStore() {
	const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(webSocketMiddleware)));

	// TODO: get this working
	// if (process.env.NODE_ENV === 'development' && module.hot) {
	// 	module.hot.accept('./reducers', () => {
	// 		const newRootReducer = require('./reducers').default;
	// 		store.replaceReducer(newRootReducer);
	// 	})
	// }

	return store;
}
