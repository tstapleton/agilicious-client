import React, { useState } from 'react';
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
	const [fileName, setFileName] = useState('');

	const handleNameChange = (event) => {
		setPlayerName(event.target.value);
	}

	const uploadIssues = async (data) => {
		const response = await fetch(`http://localhost:8000/games/${gameId}/issues`, {
			method: 'PUT',
			headers: {
				'content-type': 'text/plain'
			},
			body: data
		});
	};

	const handleFileUpload = (event) => {
		const fileReader = new FileReader();
		fileReader.onload = (e) => {
			uploadIssues(e.target.result);
		}
		setFileName(event.target.files[0].name);
		fileReader.readAsText(event.target.files[0])

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
				{fileName && <span className="file-upload-name">{fileName}</span>}
			</form>
			<Link to={`/games/${gameId}`}><button>Start a new game</button></Link>
			<p>Share this game with your teammates:</p>
			<p>{`https://www.agilitious.app/games/${gameId}`}</p>
		</div>
	)
}
