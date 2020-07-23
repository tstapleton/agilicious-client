import { Button, Content, Flex, Heading, Image, Text } from '@adobe/react-spectrum';
import React from 'react';
import deer from '../icons/deer-black.svg';

export default function Home() {
	return (
		<Content>
			<Flex direction="column" alignItems="center">
				<Image src={deer} alt="logo" height="size-2000" marginTop="size-2000" />
				<Heading level={1} marginBottom="0">agilicious</Heading>
				<Text marginBottom="size-400">a judicious and delicious estimation game</Text>
				<Button href="/games/new" variant="cta" elementType="a">Start a new game</Button>
			</Flex>
		</Content>
	);
}
