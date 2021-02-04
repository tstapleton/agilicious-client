import { combineReducers } from 'redux';
import { gameReducer } from '../games/reducer';
import { playersReducer } from '../players/reducer';
import { webSocketReducer } from '../web-socket/reducer';

export const rootReducer = combineReducers({
	game: gameReducer,
	players: playersReducer,
	webSocket: webSocketReducer,
});
