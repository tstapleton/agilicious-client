import React from 'react';
import { Button, Pane, majorScale, StarIcon, InheritanceIcon } from 'evergreen-ui';

interface Props {
	onMovePass: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onMoveSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function GameActions(props: Props) {
	return (
		<Pane>
			<Button
				height={32}
				marginRight={majorScale(1)}
				iconAfter={StarIcon}
				onClick={props.onMovePass}>
				Looks good
			</Button>
			<Button
				iconAfter={InheritanceIcon}
				marginLeft={majorScale(1)}
				appearance="primary"
				height={32}
				onClick={props.onMoveSave}>
				Save move
			</Button>
		</Pane>
	);
}
