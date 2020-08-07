import React, { useState } from 'react';
import './App.css';
import { Pane, majorScale, Heading } from 'evergreen-ui';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Card {
	id: string;
	title: string;
}

interface Column {
	id: string;
	title: string;
	cardIds: string[];
}

type ColumnOrder = string[];

interface InitialData {
	cards: Record<string, Card>;
	columns: Record<string, Column>;
	columnOrder: ColumnOrder;
}

const initialData: InitialData = {
	cards: {
		'EN-101': { id: 'EN-101', title: 'Build enrollment flow' },
		'EN-102': { id: 'EN-102', title: 'Setup backend' },
		'EN-103': { id: 'EN-103', title: 'Write component tests' },
		'EN-104': { id: 'EN-104', title: 'Add properties to Appcues' },
	},
	columns: {
		'1': { id: '1', title: '1 point', cardIds: [] },
		'2': { id: '2', title: '2 points', cardIds: ['EN-104'] },
		'3': { id: '3', title: '3 points', cardIds: [] },
		'5': { id: '5', title: '5 points', cardIds: ['EN-102', 'EN-103'] },
		'8': { id: '8', title: '8 points', cardIds: ['EN-101'] },
	},
	columnOrder: ['1', '2', '3', '5', '8'],
};

interface ColumnProps {
	key: string;
	column: Column;
	cards: Card[];
}

function Column(props: ColumnProps) {
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
				{props.column.title}
			</Heading>
			<Droppable droppableId={props.column.id}>
				{(provided, snapshot) => (
					<Pane
						{...provided.droppableProps}
						innerRef={provided.innerRef}
						transition="background-color 0.5s ease"
						background={snapshot.isDraggingOver ? 'skyblue' : 'white'}
						flexGrow="1"
						padding={majorScale(1)}>
						{props.cards.map((card, index) => (
							<Card key={card.id} card={card} index={index} />
						))}
						{provided.placeholder}
					</Pane>
				)}
			</Droppable>
		</Pane>
	);
}

interface CardProps {
	card: Card;
	index: number;
}

function Card(props: CardProps) {
	return (
		<Draggable draggableId={props.card.id} index={props.index}>
			{(provided, snapshot) => (
				<Pane
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					innerRef={provided.innerRef}
					borderRadius={majorScale(1)}
					border="default"
					marginBottom={majorScale(2)}
					padding={majorScale(1)}
					background={snapshot.isDragging ? 'lightgreen' : 'white'}
					transition="background-color 2s ease">
					<Heading size={400}>
						{props.card.id} • {props.card.title}
					</Heading>
				</Pane>
			)}
		</Draggable>
	);
}

export default function App() {
	const [columns, setColumns] = useState(initialData.columns);

	const handleDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result;

		// dropped outside a list
		if (!destination) {
			return;
		}

		// dropped in the same column
		if (destination.droppableId === source.droppableId) {
			return;
		}

		const sourceColumn = columns[source.droppableId];
		const destinationColumn = columns[destination.droppableId];

		setColumns({
			...columns,
			[sourceColumn.id]: {
				...sourceColumn,
				cardIds: sourceColumn.cardIds.filter((cardId) => cardId !== draggableId),
			},
			[destinationColumn.id]: {
				...destinationColumn,
				cardIds: [draggableId, ...destinationColumn.cardIds],
			},
		});

		// TODO: update server here
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Pane display="flex">
				{initialData.columnOrder.map((columnId) => {
					const column = columns[columnId];
					const cards = column.cardIds.map((cardId) => initialData.cards[cardId]);
					return <Column key={column.id} column={column} cards={cards} />;
				})}
			</Pane>
		</DragDropContext>
	);
}
