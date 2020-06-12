import React from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import deer from './icons/deer-black.svg';
import './Home.css';

export default function Home() {
	const gameId = v4();
	return (
		<div className="Home">
			<img src={deer} alt="logo" />
			<h1>Agilitious</h1>
			<p>An expeditious and nutritious estimation game</p>
			<Link to={`/games/${gameId}`}><button>Start a new game</button></Link>
		</div>
	);
}