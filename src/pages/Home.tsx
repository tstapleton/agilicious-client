import React from 'react';
import { Link } from 'react-router-dom';
import deer from '../icons/deer-black.svg';
import './Home.css';

export default function Home() {
	return (
		<div className="Home">
			<img src={deer} alt="logo" />
			<h1>Agilicious</h1>
			<p>An expeditious and nutritious estimation game</p>
			<Link to={`/games/new`}><button>Start a new game</button></Link>
		</div>
	);
}