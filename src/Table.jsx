import React from 'react';
import Board from 'react-trello';

import './Table.css';

const getTags = (issue) => {
	return [];
	// if (!issue.epicId) {
	// 	return [];
	// }
	// const epic = mock.issues.find(i => i.id === issue.epicId);
	// if (!epic) {
	// 	return [];
	// }
	// return [{
	// 	bgcolor: '#EB5A46',
	// 	color: 'white',
	// 	title: epic.title
	// }]
}

const getData = (issues) => {
	const cards = issues
	.filter((issue) => issue.type !== 'Epic')
	.map((issue) => {
		const { id, title, description, ...rest } = issue;
		const tags = getTags(issue);
		return {
			id,
			description,
			metadata: rest,
			tags,
			title,
		}
	});

	const points = [1, 2, 3, 5, 8, 13, 21, 34];
	const lanes = points.map(p => ({
		id: `${p}`,
		title: p === 1 ? `${p} Point` : `${p} Points`,
		cards: cards.filter(card => card.metadata.currentPoints === p),
	}));

	return {
		lanes,
	}
}

function Table(props) {
	const data = getData(props.issues);
	return (
		<Board
			data={data}
			cardDraggable={props.isMoveAllowed}
			hideCardDeleteIcon={true}
			handleDragEnd={props.onCardMove}
			onCardClick={props.onCardClick} />
	);
}

export default Table;
