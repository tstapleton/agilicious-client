import { Button, Content, Flex, Heading, Image, Text, View } from '@adobe/react-spectrum';
import React from 'react';
import { HeaderSmall } from '../components';

export default function NewGame() {
	return (
		<Content>
			<Flex direction="column" gap="size-100">
				<View backgroundColor="celery-600" height="size-800" />
				<Flex direction="row" height="size-3000" gap="size-100">
					<View backgroundColor="indigo-600" width="size-2000" />
					<View backgroundColor="seafoam-600" flex />
				</Flex>
				<View backgroundColor="magenta-600" height="size-800" />
			</Flex>
			<Flex direction="column">
				<HeaderSmall />
			</Flex>
		</Content>
	);
}
