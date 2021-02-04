import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import Modal from 'react-modal';
// import Sidebar from '../components/Sidebar';
// import Table from '../components/Table';
import GamePlaySidebar from './GamePlaySidebar';
import { selectCurrentPlayer, selectIsConnected } from '../players/selectors';
import { joinGame } from '../games/actions';
import * as Types from '../types';

export default function GamePlay() {
	console.log('GamePlay');

	const { gameId } = useParams<{ gameId: Types.GameId }>();

	const player = useSelector(selectCurrentPlayer);
	const isConnected = useSelector((state: Types.RootState) =>
		selectIsConnected(state, player.playerId)
	);

	const dispatch = useDispatch();
	// TODO: error about websocket not connected yet, so quick "fix" here
	setTimeout(() => {
		if (!isConnected) {
			console.log('Not connected, joining game...');
			dispatch(joinGame(gameId, player.playerId, player.name));
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

// interface Props {
// 	activePlayerId: string;
// 	issues: Types.Issue[];
// 	playerId: string;
// 	players: Types.Player[];

// 	onJoinGame: () => void;

// 	onCardClick: (cardId: string, metadata: any, laneId: string) => void;
// 	onCardMove: (
// 		cardId: string,
// 		sourceLaneId: string,
// 		targetLaneId: string,
// 		position: number,
// 		cardDetails: any
// 	) => void;
// 	onMovePass: () => void;
// 	onMoveSave: () => void;

// 	modalIssue?: Types.Issue;
// 	modalIsOpen: boolean;
// 	onModalClose: () => void;
// }

// Modal.setAppElement('#root');
