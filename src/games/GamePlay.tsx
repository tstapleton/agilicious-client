import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import GamePlaySidebar from './GamePlaySidebar';
import { selectActivePlayerId, selectCurrentPlayer } from '../players/selectors';
import { closeIssue, joinGame, updatePoints } from '../games/actions';
import * as Types from '../types';
import { Pane } from 'evergreen-ui';
import Board from '../board/Board';
import { selectColumns, selectHasJoined, selectOpenIssueId } from './selectors';
import IssueModal from '../issues/IssueModal';

Modal.setAppElement('#root');

const modalStyles = {
	content: {
		bottom: 'auto',
		height: 'calc(100vh - 200px)',
		left: '50%',
		marginRight: '-50%',
		maxWidth: '800px',
		right: 'auto',
		top: '50%',
		transform: 'translate(-50%, -50%)',
	},
};

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

	const openIssueId = useSelector(selectOpenIssueId);
	const handleModalClose = () => {
		if (openIssueId) {
			dispatch(closeIssue(gameId, player.playerId, openIssueId));
		}
	};

	return (
		<>
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
			<Modal isOpen={!!openIssueId} onRequestClose={handleModalClose} style={modalStyles}>
				{!!openIssueId && <IssueModal issueId={openIssueId!} />}
			</Modal>
		</>
	);
}
