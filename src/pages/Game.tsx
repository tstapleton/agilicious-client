import React, { useState } from 'react';
import Modal from 'react-modal';
import { Redirect, useParams, RouteComponentProps } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import useLocalStorage from 'react-use-localstorage';
import { v4 } from 'uuid';
import * as Types from '../types';

import './Game.css';

interface RouteParams {
	gameId: string;
}
interface RouteState {
	newGame: boolean;
}
interface Props extends RouteComponentProps<RouteParams, any, RouteState> {}

Modal.setAppElement('#root');
const defaultPlayerId = v4();

export default function Game(props: Props) {
	const { newGame = false } = props.location && props.location.state ? props.location.state : {};
	const { gameId } = useParams();
	console.log(`gameId: ${gameId}`);

	const protocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws';
	const [socketUrl] = useState(`${protocol}://${process.env.REACT_APP_BASE_URL}`);
	const [issues, setIssues] = useState<Types.Issue[]>([]);
	const [players, setPlayers] = useState([]);
	const [activePlayerId, setActivePlayerId] = useState('');

	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalIssue, setModalIssue] = useState<Types.Issue | undefined>();

	const [playerId, setPlayerId] = useLocalStorage('playerId', defaultPlayerId);
	const [playerName] = useLocalStorage('playerName', '');

	const joinGame = () => {
		if (playerId) {
			sendJsonMessage({ id: v4(), type: 'JOIN_GAME', gameId, playerId, name: playerName });
		}
	}
	const createGame = () => {
		if (playerId) {
			sendJsonMessage({ id: v4(), type: 'CREATE_GAME', gameId, name: playerName, avatarSetId: '46efff1b-5ca2-57fc-8e98-f1bad529f45f' });
		}
	}
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
				const updatedIssues = issues.map(issue =>
					issue.id === payload.issue.id ? payload.issue : issue
				)
				setIssues(updatedIssues);
				break;
			}
			case 'ISSUE_OPENED': {
				const issue = issues.find(i => i.id === payload.issueId);
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
				setPlayers(payload.players)
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
	}

	const onCardMove = (cardId: string, sourceLaneId: string, targetLaneId: string, position: number, cardDetails: any) => {
		sendJsonMessage({
			id: v4(),
			type: 'UPDATE_POINTS',
			playerId,
			points: parseInt(targetLaneId, 10),
			issueId: cardId,
			gameId,
		})
	}

	const onCardClick = (cardId: string, metadata: any, laneId: string) => {
		sendJsonMessage({
			id: v4(),
			type: 'OPEN_ISSUE',
			playerId,
			issueId: cardId,
			gameId,
		})
	}
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
		})
	}

	const onMoveSave = () => {
		sendJsonMessage({
			id: v4(),
			type: 'CONFIRM_MOVE',
			playerId,
			gameId,
		});
	}
	const onMovePass = () => {
		sendJsonMessage({
			id: v4(),
			type: 'NO_CHANGE',
			playerId,
			gameId,
		})
	}
	const {
		sendJsonMessage,
	} = useWebSocket(socketUrl, {
		onOpen: newGame ? createGame : joinGame,
		onMessage: handleMessage,
		shouldReconnect: () => true,
	});

	if (!playerId || !playerName) {
		return <Redirect to={`/games/${gameId}/join`} />;
	}

	return (
		<div className="Game">
			<div className="game-sidebar">
				<Sidebar
					activePlayerId={activePlayerId}
					currentPlayerId={playerId}
					onMovePass={onMovePass}
					onMoveSave={onMoveSave}
					players={players} />
			</div>
			<div className="game-table">
				<Table
					isMoveAllowed={playerId === activePlayerId}
					onCardClick={onCardClick}
					onCardMove={onCardMove}
					issues={issues} />
			</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={onModalClose}>
					<h1>Hello from modal {modalIssue && modalIssue.title}</h1>
			</Modal>
		</div>
	);
}
