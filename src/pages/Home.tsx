import React from 'react';
import { Button, Heading, Layout, Page } from '@shopify/polaris';
import { Logo } from '../components';

export const Home = () => (
	<Page narrowWidth={true}>
		<Layout>
			<Layout.Section>
				<Logo variant="large" />
				<Button size="large" primary={true} url="/games/new">Start a new game</Button>
			</Layout.Section>
		</Layout>
	</Page>
);

export default Home;
