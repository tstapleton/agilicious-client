import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Pane } from 'evergreen-ui';
import Column from './Column';
import * as Types from '../types';

interface Props {
	columns: Array<Types.Column>;
	onMove: (issueId: Types.IssueId, points: number) => void;
}

export default function Board(props: Props) {
	const handleDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result;

		// dropped outside a list
		if (!destination) {
			return;
		}

		// dropped in same column
		if (destination.droppableId === source.droppableId) {
			return;
		}

		props.onMove(draggableId, Number(destination.droppableId));
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Pane display="flex">
				{props.columns.map((column: Types.Column) => (
					<Column key={column.points} column={column} />
				))}
			</Pane>
		</DragDropContext>
	);
}
