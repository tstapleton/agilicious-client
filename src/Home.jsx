import React from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import './Home.css';

export default function Home() {
	const gameId = v4();
	return (
		<div className="Home">
			<h1>Agilitious</h1>
			<Link to={`/games/${gameId}`}>Start a new game</Link>
		</div>
	);
}