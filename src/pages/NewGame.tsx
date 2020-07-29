import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { v4 } from 'uuid';
import Logo from '../components/Logo';
import { Button, Paragraph, TextInputField, Pane, majorScale, FilePicker, FormField } from 'evergreen-ui';

const gameId = v4();
const defaultPlayerId = v4();

export default function NewGame() {
	const [playerName, setPlayerName] = useLocalStorage('playerName', '');
	const [playerId, setPlayerId] = useLocalStorage('playerId', defaultPlayerId);
	const [fileName, setFileName] = useState('');

	const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
	const baseUrl = `${protocol}://${process.env.REACT_APP_BASE_URL}`;

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPlayerName(event.target.value);
	}

	const uploadIssues = async (data: string | ArrayBuffer) => {
		await fetch(`${baseUrl}/api/games/${gameId}/issues`, {
			method: 'PUT',
			headers: {
				'content-type': 'text/plain'
			},
			body: data
		});
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		if (!file) {
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = (e) => {
			if (e.target && e.target.result) {
				uploadIssues(e.target.result);
			}
		}

		setFileName(file.name);
		fileReader.readAsText(file)

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
					value={playerName} />
				<FormField label="Jira issues">
					<FilePicker
						accept=".csv"
						onChange={handleFileUpload}
						placeholder="Upload export from Jira" />
				</FormField>
			</Pane>
			<Pane textAlign="center" marginTop={majorScale(4)}>
				<Button
					appearance="primary"
					is={Link}
					to={{
						pathname: `/games/${gameId}`,
						state: {
							newGame: true
						}
					}}>Start a new game</Button>
			</Pane>
			<Pane textAlign="center" marginTop={majorScale(10)}>
				<Paragraph>Share this game with your teammates: </Paragraph>
				<Paragraph>{`${baseUrl}/games/${gameId}`}</Paragraph>
			</Pane>
		</Pane>
	)
}
