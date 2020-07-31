import React from 'react';
import Group from './Group';
import { Pane } from 'evergreen-ui';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import * as Types from '../types';

const groups = [1, 2, 3, 5, 8, 13, 21, 34];

const cards: Types.Card[] = [
	{
		description:
			'As sales, I would like data to flow from appcues to salesforce automatically so I can quickly reach out to people who have expressed interest.',
		epic: 'Run appcues campaign',
		estimate: 2,
		issueKey: 'EN-430',
		title: 'Document appcues to salesforce integration',
		type: 'story',
	},
];

export default function Board() {
	return (
		<DndProvider backend={HTML5Backend}>
			<Pane display="flex">
				{groups.map((group) => (
					<Group points={group} cards={cards.filter((card) => card.estimate === group)} />
				))}
			</Pane>
		</DndProvider>
	);
}
