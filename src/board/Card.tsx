import React from 'react';
import { Pane, majorScale, Heading } from 'evergreen-ui';
import { Draggable } from 'react-beautiful-dnd';
import * as Types from '../types';

interface Props {
	issue: Types.Issue;
	index: number;
}

export default function Card(props: Props) {
	return (
		<Draggable draggableId={props.issue.id} index={props.index}>
			{(provided, snapshot) => (
				<Pane
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					borderRadius={majorScale(1)}
					border="default"
					marginBottom={majorScale(2)}
					padding={majorScale(1)}
					background={snapshot.isDragging ? 'lightgreen' : 'white'}
					transition="background-color 2s ease">
					<Heading size={400}>
						{props.issue.key} • {props.issue.title}
					</Heading>
				</Pane>
			)}
		</Draggable>
	);
}
