import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import * as Types from '../types';

export default function GamePlaySidebar() {
	console.log('GamePlaySidebar');

	const selectPlayerId = (state: Types.RootState) => state.players.playerId;
	const selectActivePlayerId = (state: Types.RootState) => state.players.activePlayerId;
	const selectPlayers = (state: Types.RootState) => state.players.players;

	const playerId = useSelector(selectPlayerId);
	// TODO: don't force typescript to think this is defined
	const activePlayerId = useSelector(selectActivePlayerId)!;
	const players = useSelector(selectPlayers);

	const handleMovePass = () => console.log('handleMovePass');
	const handleMoveSave = () => console.log('handleMoveSave');

	return (
		<Sidebar
			activePlayerId={activePlayerId}
			currentPlayerId={playerId}
			onMovePass={handleMovePass}
			onMoveSave={handleMoveSave}
			players={players}
		/>
	);
}
