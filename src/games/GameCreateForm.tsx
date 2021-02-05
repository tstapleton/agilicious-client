import React, { useState } from 'react';
import { Button, TextInputField, Pane, Paragraph, majorScale } from 'evergreen-ui';
import Logo from '../components/Logo';
import * as Types from '../types';
import AvatarSetSelector from '../components/AvatarSetSelector';

interface Props {
	gameId: Types.GameId;
	onSubmit: (playerName: Types.PlayerName, avatarSetId: Types.AvatarSetId) => void;
	playerName: Types.PlayerName;
}

export default function GameCreateForm(props: Props) {
	const [playerName, setPlayerName] = useState(props.playerName);
	const [avatarSetId, setAvatarSetId] = useState('46efff1b-5ca2-57fc-8e98-f1bad529f45f');
	const handlePlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setPlayerName(event.target.value);

	const handleSubmit = () => {
		props.onSubmit(playerName, avatarSetId);
	};

	const handleSelectAvatarSet = (selectedAvatarSetId: Types.AvatarSetId) => {
		setAvatarSetId(selectedAvatarSetId);
	};

	return (
		<Pane marginTop={majorScale(2)} width={majorScale(80)} marginLeft="auto" marginRight="auto">
			<Logo variant="small" />
			<Pane marginTop={majorScale(6)} width={majorScale(50)} marginRight="auto">
				<TextInputField
					label="Player name"
					placeholder="Your name"
					onChange={handlePlayerNameChange}
					value={playerName}
				/>
			</Pane>
			<Pane marginTop={majorScale(4)}>
				<AvatarSetSelector selectedAvatarSetId={avatarSetId} onSelect={handleSelectAvatarSet} />
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
