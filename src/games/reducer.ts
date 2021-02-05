import * as Types from '../types';

const initialState: Types.GameState = {
	phase: 'START',
	playersFinished: [],
};

export function gameReducer(state = initialState, action: Types.EventActionTypes): Types.GameState {
	switch (action.type) {
		case Types.CLIENT_EVENT_CREATE_GAME: {
			const { avatarSetId, gameId } = action.payload;
			return {
				...state,
				avatarSetId,
				gameId,
			};
		}
		case Types.CLIENT_EVENT_JOIN_GAME: {
			const { gameId } = action.payload;
			return {
				...state,
				gameId,
			};
		}
		case Types.SERVER_EVENT_GAME_STATE:
			const { phase } = action.payload;
			return {
				...state,
				phase,
			};
		case Types.SERVER_EVENT_PLAYER_MOVED:
			return {
				...state,
				playersFinished: [],
			};
		case Types.SERVER_EVENT_PLAYER_SKIPPED: {
			const { phase, eventByPlayerId } = action.payload;
			return {
				...state,
				phase,
				playersFinished: [...state.playersFinished, eventByPlayerId],
			};
		}
		default:
			return state;
	}
}
