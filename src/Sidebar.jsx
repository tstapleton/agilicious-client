import React from 'react';
import SidebarHeader from './SidebarHeader';
import Players from './Players';
import GameActions from './GameActions';
import './Sidebar.css';

export default function Sidebar() {
	return (
		<div className="Sidebar">
			<header className="sidebar-header">
				<SidebarHeader />
			</header>
			<div className="sidebar-main">
				<Players />
			</div>
			<footer className="sidebar-footer">
				<GameActions />
			</footer>
		</div>
	)
}
