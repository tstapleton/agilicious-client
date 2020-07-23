import { Button, Content, Flex, Heading, Image, Text, View } from '@adobe/react-spectrum';
import React from 'react';
import deer from '../icons/deer-black.svg';

export const HeaderSmall = () => (
	<Flex direction="row" gap="size-100" justifyContent="center">
		<View backgroundColor="seafoam-400" flex="none">
			<Image src={deer} alt="agilicious logo" height="size-600" width="size-900" />
		</View>
		<View backgroundColor="indigo-600" flex="auto">
			<Heading level={1} marginBottom="0" marginTop="0" alignSelf="center">agilicious</Heading>
		</View>
	</Flex>
);

export default HeaderSmall;
