import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pane, majorScale, Heading } from 'evergreen-ui';
import { Draggable } from 'react-beautiful-dnd';
import * as Types from '../types';
import { openIssue } from '../games/actions';
import { selectGameId } from '../games/selectors';
import { selectCurrentPlayer } from '../players/selectors';

interface Props {
	issue: Types.Issue;
	index: number;
}

export default function Card(props: Props) {
	const dispatch = useDispatch();
	const gameId = useSelector(selectGameId)!;
	const { playerId } = useSelector(selectCurrentPlayer);

	const handleClick = () => {
		console.log('clicked');
		dispatch(openIssue(gameId, playerId, props.issue.id));
	};

	return (
		<Draggable draggableId={props.issue.id} index={props.index}>
			{(provided, snapshot) => (
				<Pane
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					onClick={handleClick}
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
