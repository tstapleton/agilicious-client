import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { v4 } from 'uuid';
import { Button, TextInputField, Pane, majorScale } from 'evergreen-ui';
import Logo from '../components/Logo';

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
	};

	return (
		<Pane marginTop={majorScale(2)} width={majorScale(80)} marginLeft="auto" marginRight="auto">
			<Logo variant="small" />
			<Pane marginTop={majorScale(6)} width={majorScale(50)} marginLeft="auto" marginRight="auto">
				<TextInputField
					label="Player name"
					placeholder="Your name"
					onChange={handleNameChange}
					value={playerName}
				/>
			</Pane>
			<Pane textAlign="center" marginTop={majorScale(4)}>
				<Button appearance="primary" is={Link} to={`/games/${gameId}`}>
					Join game
				</Button>
			</Pane>
		</Pane>
	);
}
