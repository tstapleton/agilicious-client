import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Sidebar from './Sidebar';
import Table from './Table';

import './Game.css';

export default function Game() {
	const { gameId } = useParams();
	console.log(`gameId: ${gameId}`);

	const joinGame = () => sendJsonMessage({ type: 'JOIN_GAME', gameId });
	const handleMessage = (event) => console.log(event);

	const [socketUrl, setSocketUrl] = useState('ws://localhost:8000');

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
				<Table />
			</div>
		</div>
	);
}
