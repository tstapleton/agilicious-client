import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch, Redirect } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { v4 } from 'uuid';
import CreateGame from './CreateGame';
import JoinGame from './JoinGame';

const defaultPlayerId = v4();

const uploadIssues = async (gameId: string, data: string | ArrayBuffer) => {
	await fetch(`/api/games/${gameId}/issues`, {
		method: 'PUT',
		headers: {
			'content-type': 'text/plain',
		},
		body: data,
	});
};

export default function Game() {
	const history = useHistory();
	const { path, url } = useRouteMatch();
	const { gameId } = useParams();

	const gameUrl = `${window.location.origin}${url}`;

	const [playerName, setPlayerName] = useLocalStorage('playerName', '');
	const [playerId, setPlayerId] = useLocalStorage('playerId', defaultPlayerId);

	const allowPlayGame = playerId && playerName;

	const handlePlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPlayerName(event.target.value);
	};

	const handlePlayGame = () => {
		setPlayerId(playerId);
		history.push(`/games/${gameId}/play`);
	};

	const handleFileUpload = (files: FileList) => {
		const file = files && files[0];
		if (!file) {
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = (e) => {
			if (e.target && e.target.result) {
				uploadIssues(gameId, e.target.result);
			}
		};
		fileReader.readAsText(file);
	};

	return (
		<>
			<h1>Game</h1>

			<Switch>
				<Route path={`${path}/create`}>
					<CreateGame
						gameUrl={gameUrl}
						onFileUpload={handleFileUpload}
						onPlayGame={handlePlayGame}
						onPlayerNameChange={handlePlayerNameChange}
						playerName={playerName}
					/>
				</Route>
				<Route path={`${path}/join`}>
					<JoinGame
						onPlayGame={handlePlayGame}
						onPlayerNameChange={handlePlayerNameChange}
						playerName={playerName}
					/>
				</Route>
				<Route path={`${path}/play`}>
					{allowPlayGame ? <h1>Play game</h1> : <Redirect to={`${url}/join`} />}
				</Route>
				<Route>
					<h1>Page not found</h1>
				</Route>
			</Switch>
		</>
	);
}
