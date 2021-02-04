import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import GameCreate from './games/GameCreate';
import GameJoin from './games/GameJoin';
import GamePlay from './games/GamePlay';

export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/games/:gameId/create" component={GameCreate} />
				<Route path="/games/:gameId/join" component={GameJoin} />
				<Route path="/games/:gameId/play" component={GamePlay} />
				<Route exact path="/" component={Home} />
				<Route>
					<Redirect to="/" />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
