import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { v4 } from 'uuid';
import './JoinGame.css';
import SidebarHeader from './SidebarHeader';

const defaultPlayerId = v4();

export default function JoinGame() {
	const { gameId } = useParams();

	const [playerName, setPlayerName] = useLocalStorage('playerName', '');
	const [playerId, setPlayerId] = useLocalStorage('playerId', defaultPlayerId);

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(`handleChange ${event.target.value}`);
		setPlayerName(event.target.value);

		if (!playerId) {
			setPlayerId(defaultPlayerId);
		}
	}

	return (
		<div className="JoinGame">
			<SidebarHeader />
			<form>
				<label>Player name</label>
				<input onChange={handleNameChange} type="text" value={playerName} />
			</form>
			<Link to={`/games/${gameId}`}><button>Join game</button></Link>
		</div>
	)
}
