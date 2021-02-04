import { UUID } from './common';

export type AvatarId = UUID;
export type PlayerId = UUID;
export type PlayerName = string;
// export type Players = Players[];

export interface Player {
	avatarId: AvatarId;
	connected: boolean;
	id: PlayerId;
	name: PlayerName;
}

export interface PlayersState {
	activePlayerId?: PlayerId;
	gameOwnerId?: PlayerId;
	playerId?: PlayerId;
	players: Array<Player>;
}
