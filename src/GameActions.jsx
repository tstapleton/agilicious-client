import React from 'react';
import './GameActions.css';

export default function GameActions(props) {
	return (
		<div className="GameActions">
			<button onClick={props.onMovePass}>Looks good</button>
			<button onClick={props.onMoveSave}>Save move</button>
		</div>
	);
}
