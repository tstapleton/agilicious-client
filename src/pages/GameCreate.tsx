import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import GameCreateForm from './GameCreateForm';
import { createGame } from '../games/actions';
import * as Types from '../types';

export default function GameCreate() {
	const { gameId } = useParams<{ gameId: Types.GameId }>();
	const dispatch = useDispatch();

	const playerName = 'hello';

	const handleSubmit = () => {
		console.log('handleSubmit');
		dispatch(createGame(gameId, playerName));
	};

	return <GameCreateForm gameId={gameId} onSubmit={handleSubmit} playerName={playerName} />;
}
