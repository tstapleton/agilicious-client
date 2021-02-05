import React from 'react';
import { Pane, majorScale, Heading } from 'evergreen-ui';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import * as Types from '../types';
import { useSelector } from 'react-redux';
import { selectIssues } from '../issues/selectors';

interface Props {
	column: Types.Column;
}

export default function Column(props: Props) {
	const title =
		props.column.points === 1 ? `${props.column.points} point` : `${props.column.points} points`;
	const issues = useSelector((state: Types.RootState) =>
		selectIssues(state, props.column.issueIds)
	);

	return (
		<Pane
			elevation={1}
			borderRadius={majorScale(1)}
			border="default"
			width={majorScale(30)}
			margin={majorScale(1)}
			display="flex"
			flexDirection="column"
			height="calc(100vh - 20px)">
			<Heading size={700} padding={majorScale(1)}>
				{title}
			</Heading>
			<Droppable droppableId={props.column.points.toString()}>
				{(provided, snapshot) => (
					<Pane
						{...provided.droppableProps}
						ref={provided.innerRef}
						transition="background-color 0.5s ease"
						background={snapshot.isDraggingOver ? 'skyblue' : 'white'}
						flexGrow={1}
						padding={majorScale(1)}>
						{issues.map((issue: Types.Issue, index: number) => (
							<Card key={issue.id} issue={issue} index={index} />
						))}
						{provided.placeholder}
					</Pane>
				)}
			</Droppable>
		</Pane>
	);
}
