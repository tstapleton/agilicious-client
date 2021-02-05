import { UUID } from './common';

export type AvatarId = UUID;
export type PlayerId = UUID;
export type PlayerName = string;

export interface Player {
	avatarId: AvatarId;
	connected: boolean;
	id: PlayerId;
	name: PlayerName;
}

export interface CurrentPlayer {
	playerId: PlayerId;
	name: PlayerName;
}

export interface PlayersState {
	activePlayerId?: PlayerId;
	currentPlayer: CurrentPlayer;
	gameOwnerId?: PlayerId;
	players: Array<Player>;
}
