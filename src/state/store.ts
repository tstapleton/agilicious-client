import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import webSocketMiddleware from '../web-socket/middleware';
import { loadState, saveState } from './local-storage';

export default function configureStore() {
	const persistedState = loadState();

	const store = createStore(
		rootReducer,
		persistedState,
		composeWithDevTools(applyMiddleware(webSocketMiddleware))
	);

	// TODO: get this working
	// if (process.env.NODE_ENV === 'development' && module.hot) {
	// 	module.hot.accept('./reducers', () => {
	// 		const newRootReducer = require('./reducers').default;
	// 		store.replaceReducer(newRootReducer);
	// 	})
	// }

	store.subscribe(() => {
		// TODO: throttle
		saveState({
			players: {
				playerId: store.getState().players.playerId,
				players: [],
			},
		});
	});

	return store;
}
