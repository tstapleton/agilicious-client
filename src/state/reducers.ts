import { combineReducers } from 'redux';
import { gameReducer } from '../games/reducer';
import { issuesReducer } from '../issues/reducer';
import { playersReducer } from '../players/reducer';
import { webSocketReducer } from '../web-socket/reducer';

export const rootReducer = combineReducers({
	game: gameReducer,
	issues: issuesReducer,
	players: playersReducer,
	webSocket: webSocketReducer,
});
