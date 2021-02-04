import { v4 } from 'uuid';
import * as Types from '../types';

const initialState: Types.PlayersState = {
	playerId: v4(),
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
