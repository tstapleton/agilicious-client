import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import GameCreateForm from './GameCreateForm';
import { createGame } from '../games/actions';
import * as Types from '../types';

export default function GameCreate() {
	const { gameId } = useParams<{ gameId: Types.GameId }>();
	const dispatch = useDispatch();
	const history = useHistory();

	const selectPlayerId = (state: Types.RootState) => state.players.playerId;
	const playerId = useSelector(selectPlayerId);

	const playerName = 'hello';

	const handleSubmit = () => {
		console.log('handleSubmit', playerId);
		dispatch(createGame(gameId, playerId, playerName));
		history.push(`/games/${gameId}/play`);
	};

	return <GameCreateForm gameId={gameId} onSubmit={handleSubmit} playerName={playerName} />;
}
