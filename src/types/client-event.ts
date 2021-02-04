import { AvatarSetId, GameId } from './game';
import { PlayerName } from './player';

export const CLIENT_EVENT_CREATE_GAME = 'CLIENT_EVENT::CREATE_GAME';

export interface GameCreate {
	avatarSetId: AvatarSetId;
	gameId: GameId;
	name: PlayerName;
}

export interface CreateGameAction {
	type: typeof CLIENT_EVENT_CREATE_GAME;
	payload: GameCreate;
}

export type ClientEventActionTypes = CreateGameAction;
