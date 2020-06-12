import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Table from './Table';
import './Game.css';

export default function Game() {
	const { gameId } = useParams();
	console.log(`gameId: ${gameId}`);

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
