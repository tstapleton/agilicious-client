import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Pane, majorScale } from 'evergreen-ui';
import Logo from '../components/Logo';

export default function Home() {
	return (
		<Pane marginTop={majorScale(5)}>
			<Logo variant="large" />
			<Pane textAlign="center" marginTop={majorScale(2)}>
				<Button is={Link} to={`/games/new`} appearance="primary">
					Start a new game
				</Button>
			</Pane>
		</Pane>
	);
}
