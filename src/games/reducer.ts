import * as Types from '../types';

const initialState: Types.GameState = {
	phase: 'START',
};

export function gameReducer(state = initialState, action: Types.EventActionTypes): Types.GameState {
	switch (action.type) {
		case Types.CLIENT_EVENT_CREATE_GAME:
			const { avatarSetId, gameId } = action.payload;
			return {
				...state,
				avatarSetId,
				gameId,
			};
		case Types.SERVER_EVENT_GAME_STATE:
			const { phase } = action.payload;
			return {
				...state,
				phase,
			};
		default:
			return state;
	}
}
