import React from 'react';
import Logo from '../components/Logo';
import Players from '../players/Players';
import GameActions from './GameActions';
import * as Types from '../types';
import { Pane, majorScale, Strong } from 'evergreen-ui';

interface Props {
	players: Types.Player[];
	activePlayerId: string;
	currentPlayerId: string;
	gamePhase: Types.Phase;
	playersFinished: Types.PlayerId[];
	onMovePass: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onMoveSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Sidebar(props: Props) {
	return (
		<Pane
			flexDirection="column"
			background="tint2"
			height="100vh"
			minWidth={majorScale(34)}
			display="flex"
			padding={majorScale(1)}>
			<Pane height={majorScale(6)} alignItems="center" display="flex" justifyContent="center">
				<Logo variant="small" />
			</Pane>
			<Pane flexGrow={1}>
				<Players
					playersFinished={props.playersFinished}
					players={props.players}
					activePlayerId={props.activePlayerId}
				/>
			</Pane>
			{props.gamePhase !== 'FINISHED' ? (
				<Pane height={majorScale(10)} alignItems="center" display="flex" justifyContent="center">
					{props.currentPlayerId === props.activePlayerId && (
						<GameActions onMovePass={props.onMovePass} onMoveSave={props.onMoveSave} />
					)}
				</Pane>
			) : (
				<Strong size={500} textAlign="center" marginBottom={majorScale(2)}>
					Game over
				</Strong>
			)}
		</Pane>
	);
}
