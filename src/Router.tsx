import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import JoinGame from './JoinGame';
import NewGame from './NewGame';

export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/games/new' component={NewGame} />
				<Route path='/games/:gameId/join' component={JoinGame} />
				<Route path='/games/:gameId' component={Game} />
				<Route path='/' component={Home} />
			</Switch>
		</BrowserRouter>
	);
}
