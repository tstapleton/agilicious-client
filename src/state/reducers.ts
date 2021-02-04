import { combineReducers } from 'redux';
import { playersReducer } from '../players/reducer';
import { gameReducer } from '../games/reducer';

export const rootReducer = combineReducers({
	game: gameReducer,
	players: playersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
