import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import GameJoinForm from './GameJoinForm';
import { joinGame } from '../games/actions';
import { selectCurrentPlayer } from '../players/selectors';
import * as Types from '../types';

export default function GameJoin() {
	const { gameId } = useParams<{ gameId: Types.GameId }>();
	const dispatch = useDispatch();
	const history = useHistory();

	const { playerId, name } = useSelector(selectCurrentPlayer);

	const handleSubmit = (playerName: Types.PlayerName) => {
		console.log('handleSubmit', playerId);
		dispatch(joinGame(gameId, playerId, playerName));
		history.push(`/games/${gameId}/play`);
	};

	return <GameJoinForm gameId={gameId} onSubmit={handleSubmit} playerName={name} />;
}
