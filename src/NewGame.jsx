import React from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { v4 } from 'uuid';
import './NewGame.css';
import SidebarHeader from './SidebarHeader';

const defaultPlayerId = v4();

export default function NewGame() {
	const gameId = v4();
	const [playerName, setPlayerName] = useLocalStorage('playerName', '');
	const [playerId, setPlayerId] = useLocalStorage('playerId', defaultPlayerId);

	const handleNameChange = (event) => {
		console.log(`handleChange ${event.target.value}`);
		setPlayerName(event.target.value);
	}

	const handleFileUpload = (event) => {
		const formData = new FormData();
		formData.append('file', event.target.files[0]);

		if (!playerId) {
			setPlayerId(defaultPlayerId);
		}
	};

	return (
		<div className="NewGame">
			<SidebarHeader />
			<form>
				<label>Player name</label>
				<input onChange={handleNameChange} type="text" value={playerName} />
				<label>Upload Jira issues</label>
				<input accept=".csv" className="custom-file-input" type="file" onChange={handleFileUpload} />
			</form>
			<Link to={`/games/${gameId}`}><button>Start a new game</button></Link>
			<p>Share this game with your teammates:</p>
			<p>{`https://www.agilitious.app/games/${gameId}`}</p>
		</div>
	)
}
