import React from 'react';
import deer from '../icons/deer-black.svg';
import { Pane, Heading, Text, majorScale } from 'evergreen-ui';

interface Props {
	variant?: 'large' | 'small';
}

function LogoLarge() {
	return (
		<Pane textAlign="center">
			<img src={deer} alt="logo" height={majorScale(16)} />
			<Heading size={900}>agilicious</Heading>
			<Text size={500}>a judicious and delicious estimation game</Text>
		</Pane>
	);
}

function LogoSmall() {
	return (
		<Pane display="flex" justifyContent="center">
			<img src={deer} alt="logo" height={majorScale(4)} />
			<Heading size={700} marginLeft={majorScale(1)}>
				agilicious
			</Heading>
		</Pane>
	);
}

export default function Logo(props: Props) {
	return props.variant === 'large' ? LogoLarge() : LogoSmall();
}
