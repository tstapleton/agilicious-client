import React from 'react';
import bird from '../icons/bird.svg';
import birdTwo from '../icons/bird-2.svg';
import chicken from '../icons/chicken.svg';
import fox from '../icons/fox.svg';
import hedgehog from '../icons/hedgehog.svg';
import rabbit from '../icons/rabbit.svg';
import squirrel from '../icons/squirrel.svg';
import * as Types from '../types';
import { Pane, Heading, Avatar, majorScale, Text, SymbolCircleIcon, StarIcon } from 'evergreen-ui';

interface Props {
	activePlayerId: string;
	players: Types.Player[];
	playersFinished: Types.PlayerId[];
}

const icons = [bird, birdTwo, chicken, fox, hedgehog, rabbit, squirrel];

export default function Players(props: Props) {
	const isFinished = (playerId: Types.PlayerId) => props.playersFinished.includes(playerId);
	const isActive = (playerId: Types.PlayerId) => props.activePlayerId === playerId;
	const isEveryoneFinished = () => props.players.length === props.playersFinished.length;

	return (
		<Pane>
			<Heading marginBottom={majorScale(1)} marginTop={majorScale(3)}>
				Players
			</Heading>
			{props.players.map((player, index) => (
				<Pane
					background={isActive(player.id) && !isFinished(player.id) ? 'blueTint' : 'inherit'}
					opacity={isActive(player.id) || isEveryoneFinished() ? 1 : 0.6}
					key={player.id}
					padding={majorScale(1)}
					marginBottom={majorScale(1)}
					display="flex">
					{/* looks more correctly vertically aligned with -4px bottom margin */}
					<Avatar
						src={icons[index]}
						alt="avatar"
						size={majorScale(5)}
						display="inline-block"
						marginBottom="-4px"
					/>
					<Text flexGrow={1} verticalAlign="top" lineHeight="40px" paddingLeft={majorScale(1)}>
						{player.name}
					</Text>
					{isFinished(player.id) && (
						<StarIcon size={20} color="muted" marginRight="10px" marginTop="9px"></StarIcon>
					)}
					<SymbolCircleIcon
						color={player.connected ? 'success' : 'danger'}
						size={12}
						marginTop="14px"
					/>
				</Pane>
			))}
		</Pane>
	);
}