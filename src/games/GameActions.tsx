import React from 'react';
import { Button, Pane, majorScale, StarIcon, InheritanceIcon } from 'evergreen-ui';

interface Props {
	onMovePass: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onMoveSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function GameActions(props: Props) {
	return (
		<Pane width="100%" marginBottom={majorScale(4)}>
			<Button
				justifyContent="center"
				height={48}
				width="100%"
				marginBottom={majorScale(1)}
				iconAfter={StarIcon}
				onClick={props.onMovePass}>
				Looks good
			</Button>
			<Button
				width="100%"
				justifyContent="center"
				iconAfter={InheritanceIcon}
				appearance="primary"
				height={48}
				onClick={props.onMoveSave}>
				Save move
			</Button>
		</Pane>
	);
}
