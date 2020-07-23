import { Provider, defaultTheme } from '@adobe/react-spectrum';
import React from 'react';
import Router from './Router';
import './App.css';

export default function App() {
	return (
		<Provider theme={defaultTheme} colorScheme="light" height="100vh">
			<Router />
		</Provider>
	);
}
