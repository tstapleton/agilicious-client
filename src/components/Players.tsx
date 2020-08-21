import React from 'react';
// import './Players.css';
import bird from '../icons/bird.svg';
import birdTwo from '../icons/bird-2.svg';
import chicken from '../icons/chicken.svg';
import fox from '../icons/fox.svg';
import hedgehog from '../icons/hedgehog.svg';
import rabbit from '../icons/rabbit.svg';
import squirrel from '../icons/squirrel.svg';
import * as Types from '../types';
import { Pane, Heading, Avatar, majorScale, Text } from 'evergreen-ui';

interface Props {
	activePlayerId: string;
	players: Types.Player[];
}

const icons = [bird, birdTwo, chicken, fox, hedgehog, rabbit, squirrel];

export default function Players(props: Props) {
	return (
		<Pane>
			<Heading>Players</Heading>
			{props.players.map((player, index) => (
				<Pane
					opacity={player.id === props.activePlayerId ? 1 : 0.3}
					// className={`Player ${player.id === props.activePlayerId ? 'is-active' : ''}`}
					key={player.id}>
					<Avatar src={icons[index]} alt="avatar" size={majorScale(5)} />
					<Text>{player.name}</Text>
				</Pane>
			))}
		</Pane>
	);
}
