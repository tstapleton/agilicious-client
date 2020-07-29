import React from 'react';
import './Players.css';
import bird from '../icons/bird.svg';
import birdTwo from '../icons/bird-2.svg';
import chicken from '../icons/chicken.svg';
import fox from '../icons/fox.svg';
import hedgehog from '../icons/hedgehog.svg';
import rabbit from '../icons/rabbit.svg';
import squirrel from '../icons/squirrel.svg';
import * as Types from '../types';

interface Props {
	activePlayerId: string;
	players: Types.Player[];
}

const icons = [
	bird,
	birdTwo,
	chicken,
	fox,
	hedgehog,
	rabbit,
	squirrel
]

export default function Players(props: Props) {
	return (
		<div className="Players">
			<header>Players</header>
			{props.players.map((player, index) => (
				<div className={`Player ${player.id === props.activePlayerId ? 'is-active' : ''}`} key={player.id}>
					<img src={icons[index]} alt="avatar" />
					<span>{player.name}</span>
				</div>
			))}
		</div>
	)
}