import React from 'react';

interface Props {
	description: string;
	issueKey: string;
	title: string;
}

export default function Card(props: Props) {
	return (
		<div className="card">
			<h1>{props.title}</h1>
			<strong>{props.issueKey}</strong>
			<p>{props.description}</p>
		</div>
	);
}
