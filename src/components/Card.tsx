import React from 'react';
import { Pane, Heading, majorScale, Paragraph } from 'evergreen-ui';

interface Props {
	description: string;
	epic: string;
	issueKey: string;
	title: string;
	type: 'bug' | 'story' | 'epic' | 'task';
}

export default function Card(props: Props) {
	return (
		<Pane borderRadius={majorScale(1)} border="default" padding={majorScale(1)}>
			<Heading size={500}>{props.title}</Heading>
			<Paragraph>
				{props.issueKey} • {props.type} • {props.epic}
			</Paragraph>
			<Paragraph>{props.description}</Paragraph>
		</Pane>
	);
}
