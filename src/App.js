import React from 'react';
import './App.css';
import Home from './Home';
import Game from './Game';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/games/:gameId">
					<Game />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
