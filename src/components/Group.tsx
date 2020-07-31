import React from 'react';
import { Heading, Pane, majorScale } from 'evergreen-ui';
import * as Types from '../types';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants';

interface Props {
	cards: Types.Card[];
	points: number;
}

export default function Group(props: Props) {
	const [, drop] = useDrop({
		accept: ItemTypes.CARD,
		drop: () => console.log(),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop(),
		}),
	});

	return (
		<Pane borderRadius={majorScale(1)} border="default" elevation={1} padding={majorScale(1)}>
			<Heading size={500}>Group {props.points}</Heading>
			{props.cards.map((card) => (
				<Card {...card} />
			))}
		</Pane>
	);
}
