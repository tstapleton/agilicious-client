import React from 'react';
import { Pane, Heading, majorScale, Paragraph } from 'evergreen-ui';
import * as Types from '../types';
import { ItemTypes } from '../constants';
import { useDrag } from 'react-dnd';

export default function Card(props: Types.Card) {
	const [{ isDragging }, drag] = useDrag({
		item: { type: ItemTypes.CARD },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	return (
		<Pane
			opacity={isDragging ? 0.5 : 1}
			cursor="pointer"
			borderRadius={majorScale(1)}
			border="default"
			padding={majorScale(1)}>
			<Heading size={500}>{props.title}</Heading>
			<Paragraph>
				{props.issueKey} • {props.type} • {props.epic}
			</Paragraph>
			<Paragraph>{props.description}</Paragraph>
		</Pane>
	);
}
