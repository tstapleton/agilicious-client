import * as Types from '../types';

export const selectGameId = (state: Types.RootState) => state.game.gameId;

export const selectGamePhase = (state: Types.RootState) => state.game.phase;

export const selectPlayersFinished = (state: Types.RootState) => state.game.playersFinished;

export const selectColumns = (state: Types.RootState) => state.game.columns;

export const selectHasJoined = (state: Types.RootState) => !!state.game.gameId;

export const selectOpenIssueId = (state: Types.RootState) => state.game.ui.openIssueId;
