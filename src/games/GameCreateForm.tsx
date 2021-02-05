import React, { useState } from 'react';
import {
	Button,
	FormField,
	FilePicker,
	TextInputField,
	Pane,
	Paragraph,
	majorScale,
} from 'evergreen-ui';
import Logo from '../components/Logo';
import * as Types from '../types';

interface Props {
	gameId: Types.GameId;
	onSubmit: (playerName: Types.PlayerName, files: FileList) => void;
	playerName: Types.PlayerName;
}

export default function GameCreateForm(props: Props) {
	const [playerName, setPlayerName] = useState(props.playerName);
	const handlePlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setPlayerName(event.target.value);

	const [files, setFiles] = useState<FileList>();
	const handleFileUpload = (files: FileList) => setFiles(files);

	const handleSubmit = () => {
		if (!files) {
			return;
		}
		props.onSubmit(playerName, files);
	};

	return (
		<Pane marginTop={majorScale(2)} width={majorScale(80)} marginLeft="auto" marginRight="auto">
			<Logo variant="small" />
			<Pane marginTop={majorScale(6)} width={majorScale(50)} marginLeft="auto" marginRight="auto">
				<TextInputField
					label="Player name"
					placeholder="Your name"
					onChange={handlePlayerNameChange}
					value={playerName}
				/>
				<FormField label="Jira issues">
					<FilePicker
						accept=".csv"
						onChange={handleFileUpload}
						placeholder="Upload export from Jira"
					/>
				</FormField>
			</Pane>
			<Pane textAlign="center" marginTop={majorScale(4)}>
				<Button appearance="primary" onClick={handleSubmit}>
					Start a new game
				</Button>
			</Pane>
			<Pane textAlign="center" marginTop={majorScale(10)}>
				<Paragraph>Share this game with your teammates:</Paragraph>
				<Paragraph>{`${window.location.origin}/games/${props.gameId}/join`}</Paragraph>
			</Pane>
		</Pane>
	);
}
