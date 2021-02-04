import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { selectActivePlayerId, selectCurrentPlayer, selectPlayers } from '../players/selectors';

export default function GamePlaySidebar() {
	console.log('GamePlaySidebar');

	const player = useSelector(selectCurrentPlayer);
	// TODO: don't force typescript to think this is defined
	const activePlayerId = useSelector(selectActivePlayerId)!;
	const players = useSelector(selectPlayers);

	const handleMovePass = () => console.log('handleMovePass');
	const handleMoveSave = () => console.log('handleMoveSave');

	return (
		<Sidebar
			activePlayerId={activePlayerId}
			currentPlayerId={player.playerId}
			onMovePass={handleMovePass}
			onMoveSave={handleMoveSave}
			players={players}
		/>
	);
}
