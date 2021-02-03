import React, { useState } from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch, Redirect } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import useWebSocket from 'react-use-websocket';
import { v4 } from 'uuid';
import CreateGame from './CreateGame';
import JoinGame from './JoinGame';
import * as Types from '../types';
import PlayGame from './PlayGame';

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

	const onJoinGame = () => {
		sendJsonMessage({ id: v4(), type: 'JOIN_GAME', gameId, playerId, name: playerName });
	};

	const handleCreateGame = () => {
		sendJsonMessage({
			id: v4(),
			type: 'CREATE_GAME',
			gameId,
			name: playerName,
			avatarSetId: '46efff1b-5ca2-57fc-8e98-f1bad529f45f',
		});
		handlePlayGame();
	};
	const handleJoinGame = () => {
		onJoinGame();
		handlePlayGame();
	};
	const handleWebSocketOpen = () => {
		console.log('websocket opened');
	};

	const [issues, setIssues] = useState<Types.Issue[]>([]);
	const [players, setPlayers] = useState([]);
	const [activePlayerId, setActivePlayerId] = useState('');

	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalIssue, setModalIssue] = useState<Types.Issue | undefined>();

	const handleMessage = (event: MessageEvent) => {
		const { type, ...payload } = JSON.parse(event.data);
		switch (type) {
			case 'GAME_STATE':
				setActivePlayerId(payload.activePlayerId);
				setPlayerId(payload.playerId);
				setPlayers(payload.players);
				setIssues(payload.issues);
				break;
			case 'UPDATED_POINTS': {
				const updatedIssues = issues.map((issue) =>
					issue.id === payload.issue.id ? payload.issue : issue
				);
				setIssues(updatedIssues);
				break;
			}
			case 'ISSUE_OPENED': {
				const issue = issues.find((i) => i.id === payload.issueId);
				setIsOpen(true);
				setModalIssue(issue);
				break;
			}
			case 'ISSUE_CLOSED': {
				setIsOpen(false);
				setModalIssue(undefined);
				break;
			}
			case 'PLAYER_ADDED': {
				setPlayers(payload.players);
				break;
			}
			case 'MOVE_CONFIRMED': {
				setActivePlayerId(payload.activePlayerId);
				break;
			}
			case 'PLAYER_SKIPPED': {
				setActivePlayerId(payload.activePlayerId);
				break;
			}
			default:
				return;
		}
	};

	const protocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws';
	const socketUrl = `${protocol}://localhost:8000`;

	const { sendJsonMessage } = useWebSocket(socketUrl, {
		onOpen: handleWebSocketOpen,
		onMessage: handleMessage,
		shouldReconnect: () => true,
	});

	const onCardMove = (
		cardId: string,
		sourceLaneId: string,
		targetLaneId: string,
		position: number,
		cardDetails: any
	) => {
		sendJsonMessage({
			id: v4(),
			type: 'UPDATE_POINTS',
			playerId,
			points: parseInt(targetLaneId, 10),
			issueId: cardId,
			gameId,
		});
	};

	const onCardClick = (cardId: string, metadata: any, laneId: string) => {
		sendJsonMessage({
			id: v4(),
			type: 'OPEN_ISSUE',
			playerId,
			issueId: cardId,
			gameId,
		});
	};
	const onModalClose = () => {
		if (!modalIssue) {
			return;
		}
		sendJsonMessage({
			id: v4(),
			type: 'CLOSE_ISSUE',
			playerId,
			issueId: modalIssue.id,
			gameId,
		});
	};

	const onMoveSave = () => {
		sendJsonMessage({
			id: v4(),
			type: 'CONFIRM_MOVE',
			playerId,
			gameId,
		});
	};
	const onMovePass = () => {
		sendJsonMessage({
			id: v4(),
			type: 'NO_CHANGE',
			playerId,
			gameId,
		});
	};

	return (
		<>
			<h1>Game</h1>

			<Switch>
				<Route path={`${path}/create`}>
					<CreateGame
						gameUrl={gameUrl}
						onFileUpload={handleFileUpload}
						onCreateGame={handleCreateGame}
						onPlayerNameChange={handlePlayerNameChange}
						playerName={playerName}
					/>
				</Route>
				<Route path={`${path}/join`}>
					<JoinGame
						onJoinGame={handleJoinGame}
						onPlayerNameChange={handlePlayerNameChange}
						playerName={playerName}
					/>
				</Route>
				<Route path={`${path}/play`}>
					{allowPlayGame ? (
						<PlayGame
							activePlayerId={activePlayerId}
							issues={issues}
							playerId={playerId}
							players={players}
							onJoinGame={onJoinGame}
							onCardClick={onCardClick}
							onCardMove={onCardMove}
							onMovePass={onMovePass}
							onMoveSave={onMoveSave}
							modalIssue={modalIssue}
							modalIsOpen={modalIsOpen}
							onModalClose={onModalClose}
						/>
					) : (
						<Redirect to={`${url}/join`} />
					)}
				</Route>
				<Route>
					<h1>Page not found</h1>
				</Route>
			</Switch>
		</>
	);
}
