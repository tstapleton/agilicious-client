import React from 'react';
import './GameActions.css';

interface Props {
	onMovePass: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onMoveSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function GameActions(props: Props) {
	return (
		<div className="GameActions">
			<button onClick={props.onMovePass}>Looks good</button>
			<button onClick={props.onMoveSave}>Save move</button>
		</div>
	);
}
