import { UUID } from './common';
import { Phase } from './game';
import { Issue } from './issue';
import { PlayerId, Player } from './player';

export const SERVER_EVENT_GAME_STATE = 'SERVER_EVENT::GAME_STATE';
export const SERVER_EVENT_PLAYER_ADDED = 'SERVER_EVENT::PLAYER_ADDED';
export const SERVER_EVENT_PLAYER_DISCONNECTED = 'SERVER_EVENT::PLAYER_DISCONNECTED';

type ServerEventId = UUID;

interface ServerEvent {
	id: ServerEventId;
}

// TODO: @jim can gameId be passed here so reducer doesn't need to handle client events?
export interface GameStateServerEvent extends ServerEvent {
	type: typeof SERVER_EVENT_GAME_STATE;
	activePlayerId: PlayerId;
	eventByPlayerId: PlayerId;
	gameOwnerId: PlayerId;
	issues: Array<Issue>;
	phase: Phase;
	playerId: PlayerId;
	players: Array<Player>;
}

interface GameStateAction {
	type: typeof SERVER_EVENT_GAME_STATE;
	payload: Omit<GameStateServerEvent, 'type'>;
}

export interface PlayerAddedServerEvent extends ServerEvent {
	type: typeof SERVER_EVENT_PLAYER_ADDED;
	eventByPlayerId: PlayerId;
	players: Array<Player>;
}

interface PlayerAddedAction {
	type: typeof SERVER_EVENT_PLAYER_ADDED;
	payload: Omit<PlayerAddedServerEvent, 'type'>;
}

export interface PlayerDisconnectedServerEvent extends ServerEvent {
	type: typeof SERVER_EVENT_PLAYER_DISCONNECTED;
	eventByPlayerId: PlayerId;
	activePlayerId: PlayerId;
	phase: Phase;
}

interface PlayerDisconnectedAction {
	type: typeof SERVER_EVENT_PLAYER_DISCONNECTED;
	payload: Omit<PlayerAddedServerEvent, 'type'>;
}

export type ServerEventActionTypes = GameStateAction | PlayerAddedAction | PlayerDisconnectedAction;
