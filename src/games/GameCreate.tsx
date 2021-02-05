import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import GameCreateForm from './GameCreateForm';
import { createGame } from '../games/actions';
import { selectCurrentPlayer } from '../players/selectors';
import * as Types from '../types';

export default function GameCreate() {
	const { gameId } = useParams<{ gameId: Types.GameId }>();
	const dispatch = useDispatch();
	const history = useHistory();

	const { playerId, name } = useSelector(selectCurrentPlayer);

	const handleSubmit = (playerName: Types.PlayerName, files: FileList) => {
		console.log('handleSubmit', playerId);
		dispatch(createGame(gameId, playerId, playerName));
		history.push(`/games/${gameId}/play`);
	};

	return <GameCreateForm gameId={gameId} onSubmit={handleSubmit} playerName={name} />;
}

// const uploadIssues = async (gameId: string, data: string | ArrayBuffer) => {
// 	await fetch(`/api/games/${gameId}/issues`, {
// 		method: 'PUT',
// 		headers: {
// 			'content-type': 'text/plain',
// 		},
// 		body: data,
// 	});
// };
// const handleFileUpload = (files: FileList) => {
// 	const file = files && files[0];
// 	if (!file) {
// 		return;
// 	}

// 	const fileReader = new FileReader();
// 	fileReader.onload = (e) => {
// 		if (e.target && e.target.result) {
// 			uploadIssues(gameId, e.target.result);
// 		}
// 	};
// 	fileReader.readAsText(file);
// };
