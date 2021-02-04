import * as Types from '../types';

const initialState: Types.PlayersState = {
	players: [],
};

export function playersReducer(
	state = initialState,
	action: Types.ServerEventActionTypes
): Types.PlayersState {
	switch (action.type) {
		case Types.SERVER_EVENT_GAME_STATE:
			const { activePlayerId, gameOwnerId, playerId, players } = action.payload;
			return {
				...state,
				activePlayerId,
				gameOwnerId,
				playerId,
				players,
			};
		default:
			return state;
	}
}
