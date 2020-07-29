import React from 'react';
import SidebarHeader from './SidebarHeader';
import Players from './Players';
import GameActions from './GameActions';
import './Sidebar.css';
import * as Types from '../types';

interface Props {
	players: Types.Player[];
	activePlayerId: string;
	currentPlayerId: string;
	onMovePass: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onMoveSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Sidebar(props: Props) {
	return (
		<div className="Sidebar">
			<header className="sidebar-header">
				<SidebarHeader />
			</header>
			<div className="sidebar-main">
				<Players players={props.players} activePlayerId={props.activePlayerId} />
			</div>
			<footer className="sidebar-footer">
				{props.currentPlayerId === props.activePlayerId && <GameActions onMovePass={props.onMovePass} onMoveSave={props.onMoveSave} />}
			</footer>
		</div>
	)
}
