import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import Modal from 'react-modal';
import GamePlaySidebar from './GamePlaySidebar';
import { selectActivePlayerId, selectCurrentPlayer } from '../players/selectors';
import { joinGame, updatePoints } from '../games/actions';
import * as Types from '../types';
import { Pane } from 'evergreen-ui';
import Board from '../board/Board';
import { selectColumns, selectHasJoined } from './selectors';

// Modal.setAppElement('#root');

export default function GamePlay() {
	console.log('GamePlay');

	const { gameId } = useParams<{ gameId: Types.GameId }>();

	const player = useSelector(selectCurrentPlayer);
	const hasJoined = useSelector(selectHasJoined);

	const columns = useSelector(selectColumns);

	const dispatch = useDispatch();
	// TODO: error about websocket not connected yet, so quick "fix" here
	setTimeout(() => {
		if (!hasJoined) {
			console.log('Not connected, joining game...');
			dispatch(joinGame(gameId, player.playerId, player.name));
		}
	}, 1000);

	const activePlayerId = useSelector(selectActivePlayerId)!;
	const handleMove = (issueId: Types.IssueId, points: number) => {
		console.log(`moving ${issueId} to ${points}`);
		dispatch(updatePoints(gameId, activePlayerId, issueId, points));
	};

	return (
		<Pane display="flex">
			<GamePlaySidebar />
			<Pane
				display="flex"
				flexGrow={1}
				alignItems="center"
				justifyContent="center"
				border="default">
				<Board columns={columns} onMove={handleMove} />
			</Pane>
		</Pane>
		// 	<Modal isOpen={props.modalIsOpen} onRequestClose={props.onModalClose}>
		// 		<h1>Hello from modal {props.modalIssue && props.modalIssue.title}</h1>
		// 	</Modal>
		// </div>
	);
}
