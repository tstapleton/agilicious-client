import { UUID } from './common';
import { Phase } from './game';
import { Issue } from './issue';
import { PlayerId, Player } from './player';

export const SERVER_EVENT_GAME_STATE = 'SERVER_EVENT::GAME_STATE';

type ServerEventId = UUID;

interface ServerEvent {
	type: string;
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

export type ServerEventActionTypes = GameStateAction;
