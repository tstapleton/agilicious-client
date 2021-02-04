import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import Modal from 'react-modal';
// import Sidebar from '../components/Sidebar';
// import Table from '../components/Table';
import GamePlaySidebar from './GamePlaySidebar';
import { joinGame } from '../games/actions';
import * as Types from '../types';

export default function GamePlay() {
	console.log('GamePlay');

	const { gameId } = useParams<{ gameId: Types.GameId }>();

	const selectPlayerId = (state: Types.RootState) => state.players.playerId;
	const playerId = useSelector(selectPlayerId);

	const selectIsConnected = (state: Types.RootState) => {
		const player = state.players.players.find(
			(player: Types.Player) => player.id === state.players.playerId
		);
		if (!player) {
			return false;
		}
		return player.connected;
	};
	const isConnected = useSelector(selectIsConnected);

	const dispatch = useDispatch();
	// TODO: error about websocket not connected yet, so quick "fix" here
	setTimeout(() => {
		if (!isConnected) {
			console.log('Not connected, joining game...');
			dispatch(joinGame(gameId, playerId, 'hello'));
		}
	}, 1000);

	return (
		<>
			<h1>Game Play</h1>
			<GamePlaySidebar />
		</>
		// <div className="Game">
		// 	<div className="game-sidebar">
		// 		<Sidebar
		// 			activePlayerId={props.activePlayerId}
		// 			currentPlayerId={props.playerId}
		// 			onMovePass={props.onMovePass}
		// 			onMoveSave={props.onMoveSave}
		// 			players={props.players}
		// 		/>
		// 	</div>
		// 	<div className="game-table">
		// 		<Table
		// 			isMoveAllowed={props.playerId === props.activePlayerId}
		// 			onCardClick={props.onCardClick}
		// 			onCardMove={props.onCardMove}
		// 			issues={props.issues}
		// 		/>
		// 	</div>
		// 	<Modal isOpen={props.modalIsOpen} onRequestClose={props.onModalClose}>
		// 		<h1>Hello from modal {props.modalIssue && props.modalIssue.title}</h1>
		// 	</Modal>
		// </div>
	);
}
