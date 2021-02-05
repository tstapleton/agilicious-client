import { UUID } from './common';
import { PlayerId } from './player';
import { IssueId } from './issue';

export type AvatarSetId = UUID;
export type GameId = UUID;
export type Phase = 'START' | 'PLAYING' | 'FINISHED';

export interface Column {
	points: number;
	issueIds: Array<IssueId>;
}

export interface GameState {
	avatarSetId?: AvatarSetId;
	columns: Array<Column>;
	gameId?: GameId;
	phase: Phase;
	playersFinished: Array<PlayerId>;
}
