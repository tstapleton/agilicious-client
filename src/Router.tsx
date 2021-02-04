import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import GameCreate from './pages/GameCreate';
import GamePlay from './pages/GamePlay';
// import JoinGame from './pages/JoinGame';
// import NewGame from './pages/NewGame';

export default function Router() {
	return (
		<BrowserRouter>
			<Switch>
				{/* <Route path="/games/new" component={NewGame} />
				<Route path="/games/:gameId/join" component={JoinGame} />
				<Route path="/games/:gameId" component={Game} /> */}
				<Route path="/games/:gameId/create" component={GameCreate} />
				<Route path="/games/:gameId/play" component={GamePlay} />
				<Route path="/games/:gameId" component={Game} />
				<Route exact path="/" component={Home} />
				<Route>
					<Redirect to="/" />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
