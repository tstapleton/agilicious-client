import React from 'react';
import Logo from './Logo';
import Players from './Players';
import GameActions from './GameActions';
import * as Types from '../types';
import { Pane, majorScale } from 'evergreen-ui';

interface Props {
	players: Types.Player[];
	activePlayerId: string;
	currentPlayerId: string;
	onMovePass: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onMoveSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Sidebar(props: Props) {
	return (
		<Pane
			flexDirection="column"
			background="tint2"
			height="100vh"
			width={majorScale(34)}
			display="flex"
			padding={majorScale(1)}>
			<Pane height={majorScale(6)} alignItems="center" display="flex" justifyContent="center">
				<Logo variant="small" />
			</Pane>
			<Pane flexGrow={1}>
				<Players players={props.players} activePlayerId={props.activePlayerId} />
			</Pane>
			<Pane height={majorScale(6)} alignItems="center" display="flex" justifyContent="center">
				{props.currentPlayerId === props.activePlayerId && (
					<GameActions onMovePass={props.onMovePass} onMoveSave={props.onMoveSave} />
				)}
			</Pane>
		</Pane>
	);
}
