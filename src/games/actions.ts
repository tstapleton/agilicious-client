import * as Types from '../types';

export function createGame(
	gameId: Types.GameId,
	name: Types.PlayerName
): Types.ClientEventActionTypes {
	return {
		type: Types.CLIENT_EVENT_CREATE_GAME,
		payload: {
			avatarSetId: '46efff1b-5ca2-57fc-8e98-f1bad529f45f',
			gameId,
			name,
		},
	};
}
