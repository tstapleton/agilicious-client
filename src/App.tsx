import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import JoinGame from './JoinGame';
import NewGame from './NewGame';
import './App.css';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/games/new">
					<NewGame />
				</Route>
				<Route path="/games/:gameId/join">
					<JoinGame />
				</Route>
				<Route path="/games/:gameId" component={Game} >
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
