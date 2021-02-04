import React from 'react';
import { Button, Pane, majorScale } from 'evergreen-ui';

interface Props {
	onMovePass: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onMoveSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function GameActions(props: Props) {
	return (
		<Pane>
			<Button height={40} marginRight={majorScale(1)} onClick={props.onMovePass}>
				Looks good
			</Button>
			<Button
				marginLeft={majorScale(1)}
				appearance="primary"
				height={40}
				onClick={props.onMoveSave}>
				Save move
			</Button>
		</Pane>
	);
}
