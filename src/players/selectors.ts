import * as Types from '../types';

export const selectCurrentPlayer = (state: Types.RootState) => state.players.currentPlayer;

export const selectIsConnected = (state: Types.RootState, playerId: Types.PlayerId) => {
	const player = state.players.players.find((player: Types.Player) => player.id === playerId);
	if (!player) {
		return false;
	}
	return player.connected;
};

export const selectActivePlayerId = (state: Types.RootState) => state.players.activePlayerId;

export const selectPlayers = (state: Types.RootState) => state.players.players;
