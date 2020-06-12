import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Sidebar from './Sidebar';
import Table from './Table';

import './Game.css';

export default function Game() {
	const [socketUrl, setSocketUrl] = useState('ws://localhost:8000');
	const [playerId, setPlayerId] = useState();
	const [issues, setIssues] = useState([]);

	const { gameId } = useParams();
	console.log(`gameId: ${gameId}`);

	const joinGame = () => sendJsonMessage({ type: 'JOIN_GAME', gameId });
	const handleMessage = (event) => {
		const data = JSON.parse(event.data);
		setPlayerId(data.gameState.playerId);
		setIssues(data.gameState.issues);
	}

	const onCardMove = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
		sendJsonMessage({
			type: 'UPDATE_POINTS',
			playerId,
			points: targetLaneId,
			issueId: cardId,
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

	return (
		<div className="Game">
			<div className="game-sidebar">
				<Sidebar />
			</div>
			<div className="game-table">
				<Table onCardMove={onCardMove} issues={issues} />
			</div>
		</div>
	);
}
