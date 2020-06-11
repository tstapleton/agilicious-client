import React from 'react';
import { useParams } from 'react-router-dom';

export default function Game() {
	const { gameId } = useParams();
	return <h1>Game {gameId}</h1>;
}
