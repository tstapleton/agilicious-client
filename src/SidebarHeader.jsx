import React from 'react';
import deer from './icons/deer.svg';
import './SidebarHeader.css';

export default function SidebarHeader() {
	return (
		<div className="SidebarHeader">
			<img src={deer} alt="logo" />
			<h1>Agilitious</h1>
		</div>
	)
};
