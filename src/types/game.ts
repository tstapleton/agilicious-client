import { UUID } from './common';
import { AvatarId, PlayerId } from './player';
import { IssueId } from './issue';

export type AvatarSetId = UUID;
export type GameId = UUID;
export type Phase = 'START' | 'PLAYING' | 'GAME_OVER' | 'FINISHED';

export interface Column {
	points: number;
	issueIds: Array<IssueId>;
}

export interface GameUI {
	openIssueId?: IssueId;
}

export interface GameState {
	avatarSetId?: AvatarSetId;
	columns: Array<Column>;
	gameId?: GameId;
	phase: Phase;
	playersFinished: Array<PlayerId>;
	ui: GameUI;
}

export interface AvatarSet {
	avatarSetId: AvatarId;
	avatarIds: Array<AvatarId>;
}
