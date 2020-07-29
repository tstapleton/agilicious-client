import React from 'react';
import Board from 'react-trello';
import * as Types from '../types';

import './Table.css';

interface Props {
	issues: Types.Issue[];
	isMoveAllowed: boolean;
	onCardClick: (
		cardId: string,
		sourceLaneId: string,
		targetLaneId: string,
		position: number,
		cardDetails: any
	) => void;
	onCardMove: (
		cardId: string,
		sourceLaneId: string,
		targetLaneId: string,
		position: number,
		cardDetails: any
	) => void;
}

const getTags = (issue: Types.Issue, issues: Types.Issue[]) => {
	if (!issue.epicId) {
		return [];
	}
	const epic = issues.find((i) => i.id === issue.epicId);
	if (!epic) {
		return [];
	}
	return [
		{
			bgcolor: '#bf263c', // color-red-dark
			color: 'white',
			title: epic.title,
		},
	];
};

const getData = (issues: Types.Issue[]) => {
	const cards = issues
		.filter((issue: Types.Issue) => issue.type !== 'Epic')
		.map((issue: Types.Issue) => {
			const { id, title, description, ...rest } = issue;
			const tags = getTags(issue, issues);
			return {
				id,
				description,
				metadata: rest,
				tags,
				title,
			};
		});

	const points = [1, 2, 3, 5, 8, 13, 21, 34];
	const lanes = points.map((p) => ({
		id: `${p}`,
		title: p === 1 ? `${p} Point` : `${p} Points`,
		cards: cards.filter((card) => card.metadata.currentPoints === p),
	}));

	return {
		lanes,
	};
};

function Table(props: Props) {
	const data = getData(props.issues);
	return (
		<Board
			data={data}
			cardDraggable={props.isMoveAllowed}
			hideCardDeleteIcon={true}
			handleDragEnd={props.onCardMove}
			onCardClick={props.onCardClick}
		/>
	);
}

export default Table;
