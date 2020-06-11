import React from 'react';
import './App.css';
import Board from 'react-trello';
import mock from './data.json';

const getTags = (issue) => {
	if (!issue.epicId) {
		return [];
	}
	const epic = mock.issues.find(i => i.id === issue.epicId);
	if (!epic) {
		return [];
	}
	return [{
		bgcolor: '#EB5A46',
		color: 'white',
		title: epic.title
	}]
}

const cards = mock.issues
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
	title: `${p}`,
	cards: cards.filter(card => card.metadata.originalPoints === p),
}));

const data = {
	lanes,
}

function App() {
	return (
		<Board data={data} />
	);
}

export default App;
