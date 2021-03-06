import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Pane, majorScale } from 'evergreen-ui';
import { v4 } from 'uuid';
import Logo from './components/Logo';

export default function Home() {
	const gameId = v4();

	return (
		<Pane marginTop={majorScale(5)}>
			<Logo variant="large" />
			<Pane textAlign="center" marginTop={majorScale(2)}>
				<Button data-cy="new-game" is={Link} to={`/games/${gameId}/create`} appearance="primary">
					Start a new game
				</Button>
			</Pane>
		</Pane>
	);
}
