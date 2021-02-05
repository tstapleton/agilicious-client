import { v4 } from 'uuid';
import * as Types from '../types';

const initialState: Types.PlayersState = {
	currentPlayer: {
		playerId: v4(),
		name: '',
	},
	players: [],
};

export function playersReducer(
	state = initialState,
	action: Types.EventActionTypes
): Types.PlayersState {
	switch (action.type) {
		case Types.CLIENT_EVENT_CREATE_GAME:
		case Types.CLIENT_EVENT_JOIN_GAME: {
			const { playerId, name } = action.payload;
			return {
				...state,
				currentPlayer: {
					name,
					playerId,
				},
			};
		}
		case Types.SERVER_EVENT_GAME_STATE: {
			const { activePlayerId, gameOwnerId, players } = action.payload;
			return {
				...state,
				activePlayerId,
				gameOwnerId,
				players,
			};
		}
		case Types.SERVER_EVENT_PLAYER_ADDED: {
			const { players } = action.payload;
			return {
				...state,
				players,
			};
		}
		case Types.SERVER_EVENT_PLAYER_DISCONNECTED: {
			const { eventByPlayerId } = action.payload;
			return {
				...state,
				players: state.players.map((player: Types.Player) => {
					if (player.id === eventByPlayerId) {
						return {
							...player,
							connected: false,
						};
					}
					return player;
				}),
			};
		}
		case Types.SERVER_EVENT_PLAYER_SKIPPED:
		case Types.SERVER_EVENT_PLAYER_MOVED: {
			const { activePlayerId } = action.payload;
			return {
				...state,
				activePlayerId,
			};
		}
		default:
			return state;
	}
}
