import React, { useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import Sidebar from './Sidebar';
import Table from './Table';
import useLocalStorage from 'react-use-localstorage';
import { v4 } from 'uuid';

import './Game.css';

Modal.setAppElement('#root');
const defaultPlayerId = v4();

export default function Game() {
	const [socketUrl, setSocketUrl] = useState('ws://localhost:8000');
	const [issues, setIssues] = useState([]);

	const [modalIsOpen, setIsOpen] = useState(false);
	const closeModal = () => setIsOpen(false);

	const [playerId, setPlayerId] = useLocalStorage('playerId', defaultPlayerId);

	const { gameId } = useParams();
	console.log(`gameId: ${gameId}`);

	const joinGame = () => {
		setPlayerId(playerId);
		sendJsonMessage({ type: 'JOIN_GAME', gameId, playerId });
	}
	const handleMessage = (event) => {
		const { type, ...payload } = JSON.parse(event.data);
		switch (type) {
			case 'GAME_STATE':
				setPlayerId(payload.playerId);
				setIssues(payload.issues);
				break;
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
		console.log(`onCardClick ${cardId}`);
		setIsOpen(true);
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

	return (
		<div className="Game">
			<div className="game-sidebar">
				<Sidebar />
			</div>
			<div className="game-table">
				<Table onCardMove={onCardMove} onCardClick={onCardClick} issues={issues} />
			</div>
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal}><h1>Hello from modal</h1></Modal>
		</div>
	);
}
