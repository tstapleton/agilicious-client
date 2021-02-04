import { AvatarSetId, GameId } from './game';
import { PlayerId, PlayerName } from './player';

export const CLIENT_EVENT_CREATE_GAME = 'CLIENT_EVENT::CREATE_GAME';
export const CLIENT_EVENT_JOIN_GAME = 'CLIENT_EVENT::JOIN_GAME';

export interface GameCreate {
	avatarSetId: AvatarSetId;
	gameId: GameId;
	playerId: PlayerId;
	name: PlayerName;
}

export interface CreateGameAction {
	type: typeof CLIENT_EVENT_CREATE_GAME;
	payload: GameCreate;
}

export interface GameJoin {
	gameId: GameId;
	playerId: PlayerId;
	name: PlayerName;
}

export interface JoinGameAction {
	type: typeof CLIENT_EVENT_JOIN_GAME;
	payload: GameJoin;
}

export type ClientEventActionTypes = CreateGameAction | JoinGameAction;
