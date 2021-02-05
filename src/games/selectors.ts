import * as Types from '../types';

export const selectGameId = (state: Types.RootState) => state.game.gameId;

export const selectGamePhase = (state: Types.RootState) => state.game.phase;

export const selectPlayersFinished = (state: Types.RootState) => state.game.playersFinished;
