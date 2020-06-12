import React, { useState } from 'react';
import Modal from 'react-modal';
import { Redirect, useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import Sidebar from './Sidebar';
import Table from './Table';
import useLocalStorage from 'react-use-localstorage';
import { v4 } from 'uuid';

import './Game.css';

Modal.setAppElement('#root');
const defaultPlayerId = v4();

export default function Game() {
	const { gameId } = useParams();
	console.log(`gameId: ${gameId}`);

	const [socketUrl, setSocketUrl] = useState('ws://localhost:8000');
	const [issues, setIssues] = useState([]);
	const [players, setPlayers] = useState([]);
	const [activePlayerId, setActivePlayerId] = useState();

	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalIssue, setModalIssue] = useState();

	const [playerId, setPlayerId] = useLocalStorage('playerId', defaultPlayerId);
	const [playerName, setPlayerName] = useLocalStorage('playerName', '');

	const joinGame = () => {
		if (playerId) {
			sendJsonMessage({ type: 'JOIN_GAME', gameId, playerId });
		}
	}
	const handleMessage = (event) => {
		const { type, ...payload } = JSON.parse(event.data);
		switch (type) {
			case 'GAME_STATE':
				setActivePlayerId(payload.activePlayerId);
				setPlayerId(payload.playerId);
				setPlayers(payload.players);
				setIssues(payload.issues);
				break;
			case 'UPDATED_POINTS': {
				const updatedIssues = issues.map(issue =>
					issue.id === payload.issue.id ? payload.issue : issue
				)
				setIssues(updatedIssues);
				break;
			}
			case 'ISSUE_OPENED': {
				const issue = issues.find(i => i.id === payload.issueId);
				setIsOpen(true);
				setModalIssue(issue);
				break;
			}
			case 'ISSUE_CLOSED': {
				setIsOpen(false);
				setModalIssue(undefined);
				break;
			}
			case 'PLAYER_ADDED': {
				setPlayers(payload.players)
				break;
			}
			case 'MOVE_CONFIRMED': {
				setActivePlayerId(payload.activePlayerId);
				break;
			}
			case 'PLAYER_SKIPPED': {
				setActivePlayerId(payload.activePlayerId);
				break;
			}
			default:
				return;
		}
	}

	const onCardMove = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
		sendJsonMessage({
			type: 'UPDATE_POINTS',
			playerId,
			points: parseInt(targetLaneId, 10),
			issueId: cardId,
			gameId,
		})
	}

	const onCardClick = (cardId, metadata, laneId) => {
		sendJsonMessage({
			type: 'OPEN_ISSUE',
			playerId,
			issueId: cardId,
			gameId,
		})
	}
	const onModalClose = () => {
		sendJsonMessage({
			type: 'CLOSE_ISSUE',
			playerId,
			issueId: modalIssue.id,
			gameId,
		})
	}

	const onMoveSave = () => {
		sendJsonMessage({
			type: 'CONFIRM_MOVE',
			playerId,
			gameId,
		});
	}
	const onMovePass = () => {
		sendJsonMessage({
			type: 'NO_CHANGE',
			playerId,
			gameId,
		})
	}
	const {
		sendJsonMessage,
		lastJsonMessage,
		readyState,
	} = useWebSocket(socketUrl, {
		onOpen: joinGame,
		onMessage: handleMessage,
		shouldReconnect: (closeEvent) => true,
	});

	if (!playerId || !playerName) {
		return <Redirect to={`/games/${gameId}/join`} />;
	}

	return (
		<div className="Game">
			<div className="game-sidebar">
				<Sidebar
					activePlayerId={activePlayerId}
					currentPlayerId={playerId}
					onMovePass={onMovePass}
					onMoveSave={onMoveSave}
					players={players} />
			</div>
			<div className="game-table">
				<Table
					isMoveAllowed={playerId === activePlayerId}
					onCardClick={onCardClick}
					onCardMove={onCardMove}
					issues={issues} />
			</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={onModalClose}>
					<h1>Hello from modal {modalIssue && modalIssue.title}</h1>
			</Modal>
		</div>
	);
}
