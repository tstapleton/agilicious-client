import React from 'react';
import { Button, Pane, majorScale } from 'evergreen-ui';
// import './GameActions.css';

interface Props {
	onMovePass: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onMoveSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function GameActions(props: Props) {
	return (
		<Pane>
			<Button marginRight={majorScale(1)} marginLeft={majorScale(1)} onClick={props.onMovePass}>
				Looks good
			</Button>
			<Button
				marginRight={majorScale(1)}
				marginLeft={majorScale(1)}
				appearance="primary"
				onClick={props.onMoveSave}>
				Save move
			</Button>
		</Pane>
	);
}
