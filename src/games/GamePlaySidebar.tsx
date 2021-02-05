import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { selectActivePlayerId, selectCurrentPlayer, selectPlayers } from '../players/selectors';
import { selectGameId, selectGamePhase, selectPlayersFinished } from './selectors';
import { skipMove } from './actions';

export default function GamePlaySidebar() {
	console.log('GamePlaySidebar');

	const dispatch = useDispatch();

	const player = useSelector(selectCurrentPlayer);
	// TODO: don't force typescript to think this is defined
	const activePlayerId = useSelector(selectActivePlayerId)!;
	const players = useSelector(selectPlayers);
	const gamePhase = useSelector(selectGamePhase);

	const gameId = useSelector(selectGameId)!;
	const playersFinished = useSelector(selectPlayersFinished);

	const handleMovePass = () => {
		console.log('handleMovePass');
		dispatch(skipMove(gameId, activePlayerId));
	};
	const handleMoveSave = () => {
		console.log('handleMoveSave');
	};

	return (
		<Sidebar
			activePlayerId={activePlayerId}
			currentPlayerId={player.playerId}
			gamePhase={gamePhase}
			playersFinished={playersFinished}
			onMovePass={handleMovePass}
			onMoveSave={handleMoveSave}
			players={players}
		/>
	);
}
