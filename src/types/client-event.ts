import { AvatarSetId, GameId } from './game';
import { IssueId } from './issue';
import { PlayerId, PlayerName } from './player';

export const CLIENT_EVENT_CREATE_GAME = 'CLIENT_EVENT::CREATE_GAME';
export const CLIENT_EVENT_JOIN_GAME = 'CLIENT_EVENT::JOIN_GAME';

export const CLIENT_EVENT_SKIP_MOVE = 'CLIENT_EVENT::NO_CHANGE';
export const CLIENT_EVENT_SAVE_MOVE = 'CLIENT_EVENT::CONFIRM_MOVE';

export const CLIENT_EVENT_OPEN_ISSUE = 'CLIENT_EVENT::OPEN_ISSUE';
export const CLIENT_EVENT_CLOSE_ISSUE = 'CLIENT_EVENT::CLOSE_ISSUE';
export const CLIENT_EVENT_MOVE_ISSUE = 'CLIENT_EVENT::UPDATE_POINTS';

export const CLIENT_EVENT_ADD_COMMENT = 'CLIENT_EVENT::ADD_COMMENT';

// i don't remember why, but the payloads are in the form $Noun$Verb
// and the actions are in the form $Verb$NounAction

export interface BaseClientEvent {
	gameId: GameId;
	playerId: PlayerId;
}

export interface GameCreate extends BaseClientEvent {
	avatarSetId: AvatarSetId;
	name: PlayerName;
}
export interface CreateGameAction {
	type: typeof CLIENT_EVENT_CREATE_GAME;
	payload: GameCreate;
}

export interface GameJoin extends BaseClientEvent {
	name: PlayerName;
}
export interface JoinGameAction {
	type: typeof CLIENT_EVENT_JOIN_GAME;
	payload: GameJoin;
}

export interface MoveSkip extends BaseClientEvent {}
export interface SkipMoveAction {
	type: typeof CLIENT_EVENT_SKIP_MOVE;
	payload: MoveSkip;
}

export interface MoveSave extends BaseClientEvent {}
export interface SaveMoveAction {
	type: typeof CLIENT_EVENT_SAVE_MOVE;
	payload: MoveSave;
}

export interface IssueOpen extends BaseClientEvent {
	issueId: IssueId;
}
export interface OpenIssueAction {
	type: typeof CLIENT_EVENT_OPEN_ISSUE;
	payload: IssueOpen;
}

export interface IssueClose extends BaseClientEvent {
	issueId: IssueId;
}
export interface CloseIssueAction {
	type: typeof CLIENT_EVENT_CLOSE_ISSUE;
	payload: IssueClose;
}

export interface IssueMove extends BaseClientEvent {
	issueId: IssueId;
	points: number;
}
export interface MoveIssueAction {
	type: typeof CLIENT_EVENT_MOVE_ISSUE;
	payload: IssueMove;
}

export interface AddComment extends BaseClientEvent {
	issueId: IssueId;
	comment: string;
}
export interface CommentAddAction {
	type: typeof CLIENT_EVENT_ADD_COMMENT;
	payload: AddComment;
}

export type ClientEventActionTypes =
	| CreateGameAction
	| JoinGameAction
	| SkipMoveAction
	| SaveMoveAction
	| OpenIssueAction
	| CloseIssueAction
	| MoveIssueAction
	| CommentAddAction;
