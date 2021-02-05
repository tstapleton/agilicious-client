import { UUID } from './common';
import { PlayerId } from './player';

export type AvatarSetId = UUID;
export type GameId = UUID;
export type Phase = 'START' | 'PLAYING' | 'FINISHED';

export interface GameState {
	avatarSetId?: AvatarSetId;
	gameId?: GameId;
	phase: Phase;
	playersFinished: Array<PlayerId>;
}
