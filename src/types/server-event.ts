import { UUID } from './common';
import { Phase } from './game';
import { Issue, IssueId } from './issue';
import { PlayerId, Player } from './player';

export const SERVER_EVENT_GAME_STATE = 'SERVER_EVENT::GAME_STATE';
export const SERVER_EVENT_GAME_ACTIVATED = 'SERVER_EVENT::GAME_ACTIVATED';

export const SERVER_EVENT_PLAYER_ADDED = 'SERVER_EVENT::PLAYER_ADDED';
export const SERVER_EVENT_PLAYER_DISCONNECTED = 'SERVER_EVENT::PLAYER_DISCONNECTED';

export const SERVER_EVENT_ISSUE_OPENED = 'SERVER_EVENT::ISSUE_OPENED';
export const SERVER_EVENT_ISSUE_CLOSED = 'SERVER_EVENT::ISSUE_CLOSED';
export const SERVER_EVENT_ISSUE_MOVED = 'SERVER_EVENT::UPDATED_POINTS';
export const SERVER_EVENT_PLAYER_SKIPPED = 'SERVER_EVENT::PLAYER_SKIPPED';
export const SERVER_EVENT_PLAYER_MOVED = 'SERVER_EVENT::MOVE_CONFIRMED';

type ServerEventId = UUID;

interface BaseServerEvent {
	id: ServerEventId;
}

export interface GameStateServerEvent extends BaseServerEvent {
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

export interface GameActivatedServerEvent extends BaseServerEvent {
	type: typeof SERVER_EVENT_GAME_ACTIVATED;
	phase: Phase;
}
interface GameActivatedAction {
	type: typeof SERVER_EVENT_GAME_ACTIVATED;
	payload: Omit<GameActivatedServerEvent, 'type'>;
}

export interface PlayerAddedServerEvent extends BaseServerEvent {
	type: typeof SERVER_EVENT_PLAYER_ADDED;
	eventByPlayerId: PlayerId;
	players: Array<Player>;
}
interface PlayerAddedAction {
	type: typeof SERVER_EVENT_PLAYER_ADDED;
	payload: Omit<PlayerAddedServerEvent, 'type'>;
}

export interface PlayerDisconnectedServerEvent extends BaseServerEvent {
	type: typeof SERVER_EVENT_PLAYER_DISCONNECTED;
	activePlayerId: PlayerId;
	eventByPlayerId: PlayerId;
	phase: Phase;
}
interface PlayerDisconnectedAction {
	type: typeof SERVER_EVENT_PLAYER_DISCONNECTED;
	payload: Omit<PlayerAddedServerEvent, 'type'>;
}

export interface IssueOpenedServerEvent extends BaseServerEvent {
	type: typeof SERVER_EVENT_ISSUE_OPENED;
	eventByPlayerId: PlayerId;
	issueId: IssueId;
}
interface IssueOpenedAction {
	type: typeof SERVER_EVENT_ISSUE_OPENED;
	payload: Omit<IssueOpenedServerEvent, 'type'>;
}

export interface IssueClosedServerEvent extends BaseServerEvent {
	type: typeof SERVER_EVENT_ISSUE_CLOSED;
	eventByPlayerId: PlayerId;
	// TODO: should we add issueId here?
}
interface IssueClosedAction {
	type: typeof SERVER_EVENT_ISSUE_CLOSED;
	payload: Omit<IssueClosedServerEvent, 'type'>;
}

export interface IssueMovedServerEvent extends BaseServerEvent {
	type: typeof SERVER_EVENT_ISSUE_MOVED;
	eventByPlayerId: PlayerId;
	issue: Issue;
}
interface IssueMovedAction {
	type: typeof SERVER_EVENT_ISSUE_MOVED;
	payload: Omit<IssueMovedServerEvent, 'type'>;
}

export interface PlayerSkippedServerEvent extends BaseServerEvent {
	type: typeof SERVER_EVENT_PLAYER_SKIPPED;
	activePlayerId: PlayerId;
	eventByPlayerId: PlayerId;
	phase: Phase;
}
interface PlayerSkippedAction {
	type: typeof SERVER_EVENT_PLAYER_SKIPPED;
	payload: Omit<PlayerSkippedServerEvent, 'type'>;
}

export interface PlayerMovedServerEvent extends BaseServerEvent {
	type: typeof SERVER_EVENT_PLAYER_MOVED;
	activePlayerId: PlayerId;
	eventByPlayerId: PlayerId;
	phase: Phase;
}
interface PlayerMovedAction {
	type: typeof SERVER_EVENT_PLAYER_MOVED;
	payload: Omit<PlayerMovedServerEvent, 'type'>;
}

export type ServerEventActionTypes =
	| GameStateAction
	| GameActivatedAction
	| PlayerAddedAction
	| PlayerDisconnectedAction
	| IssueOpenedAction
	| IssueClosedAction
	| IssueMovedAction
	| PlayerSkippedAction
	| PlayerMovedAction;
