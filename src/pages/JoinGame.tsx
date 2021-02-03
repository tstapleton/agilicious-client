import React from 'react';
import { Button, TextInputField, Pane, majorScale } from 'evergreen-ui';
import Logo from '../components/Logo';

interface Props {
	onJoinGame: () => void;
	onPlayerNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	playerName: string;
}

export default function JoinGame(props: Props) {
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
			</Pane>
			<Pane textAlign="center" marginTop={majorScale(4)}>
				<Button appearance="primary" onClick={props.onJoinGame}>
					Join game
				</Button>
			</Pane>
		</Pane>
	);
}
