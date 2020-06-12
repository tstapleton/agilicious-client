import React from 'react';
import './Players.css';
import mock from './data.json';

export default function Players() {
	return (
		<div className="Players">
			{mock.players.map((player) => (
				<div className="Player" key={player.id}>
					<span>{player.name}</span>
				</div>
			))}
		</div>
	)
}