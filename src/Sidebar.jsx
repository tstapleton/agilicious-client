import React from 'react';
import SidebarHeader from './SidebarHeader';
import Players from './Players';
import GameActions from './GameActions';
import './Sidebar.css';

export default function Sidebar(props) {
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
