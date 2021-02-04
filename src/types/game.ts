import { UUID } from './common';

export type AvatarSetId = UUID;
export type GameId = UUID;
export type Phase = 'START' | 'PLAYING' | 'FINISHED';

export interface GameState {
	avatarSetId?: AvatarSetId;
	gameId?: GameId;
	phase: Phase;
}
