import React from 'react';
import Modal from 'react-modal';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import * as Types from '../types';

interface Props {
	activePlayerId: string;
	issues: Types.Issue[];
	playerId: string;
	players: Types.Player[];

	onJoinGame: () => void;

	onCardClick: (cardId: string, metadata: any, laneId: string) => void;
	onCardMove: (
		cardId: string,
		sourceLaneId: string,
		targetLaneId: string,
		position: number,
		cardDetails: any
	) => void;
	onMovePass: () => void;
	onMoveSave: () => void;

	modalIssue?: Types.Issue;
	modalIsOpen: boolean;
	onModalClose: () => void;
}

Modal.setAppElement('#root');

export default function PlayGame(props: Props) {
	// props.onJoinGame();
	console.log('hello');

	return (
		<div className="Game">
			<div className="game-sidebar">
				<Sidebar
					activePlayerId={props.activePlayerId}
					currentPlayerId={props.playerId}
					onMovePass={props.onMovePass}
					onMoveSave={props.onMoveSave}
					players={props.players}
				/>
			</div>
			<div className="game-table">
				<Table
					isMoveAllowed={props.playerId === props.activePlayerId}
					onCardClick={props.onCardClick}
					onCardMove={props.onCardMove}
					issues={props.issues}
				/>
			</div>
			<Modal isOpen={props.modalIsOpen} onRequestClose={props.onModalClose}>
				<h1>Hello from modal {props.modalIssue && props.modalIssue.title}</h1>
			</Modal>
		</div>
	);
}
