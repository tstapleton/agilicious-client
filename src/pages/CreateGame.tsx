import React from 'react';
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

interface Props {
	gameUrl: string;
	onFileUpload: (files: FileList) => void;
	onCreateGame: () => void;
	onPlayerNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	playerName: string;
}

export default function CreateGame(props: Props) {
	return (
		<Pane marginTop={majorScale(2)} width={majorScale(80)} marginLeft="auto" marginRight="auto">
			<Logo variant="small" />
			<Pane marginTop={majorScale(6)} width={majorScale(50)} marginLeft="auto" marginRight="auto">
				<TextInputField
					label="Player name"
					placeholder="Your name"
					onChange={props.onPlayerNameChange}
					value={props.playerName}
				/>
				<FormField label="Jira issues">
					<FilePicker
						accept=".csv"
						onChange={props.onFileUpload}
						placeholder="Upload export from Jira"
					/>
				</FormField>
			</Pane>
			<Pane textAlign="center" marginTop={majorScale(4)}>
				<Button appearance="primary" onClick={props.onCreateGame}>
					Start a new game
				</Button>
			</Pane>
			<Pane textAlign="center" marginTop={majorScale(10)}>
				<Paragraph>Share this game with your teammates:</Paragraph>
				<Paragraph>{props.gameUrl}</Paragraph>
			</Pane>
		</Pane>
	);
}
