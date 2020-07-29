import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import JoinGame from './pages/JoinGame';
import NewGame from './pages/NewGame';

export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/games/new" component={NewGame} />
				<Route path="/games/:gameId/join" component={JoinGame} />
				<Route path="/games/:gameId" component={Game} />
				<Route path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	);
}
