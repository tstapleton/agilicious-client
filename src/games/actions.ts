import * as Types from '../types';

export function createGame(
	gameId: Types.GameId,
	playerId: Types.PlayerId,
	name: Types.PlayerName,
	avatarSetId: Types.AvatarSetId
): Types.ClientEventActionTypes {
	return {
		type: Types.CLIENT_EVENT_CREATE_GAME,
		payload: {
			avatarSetId,
			gameId,
			playerId,
			name,
		},
	};
}

export function joinGame(
	gameId: Types.GameId,
	playerId: Types.PlayerId,
	name: Types.PlayerName
): Types.ClientEventActionTypes {
	return {
		type: Types.CLIENT_EVENT_JOIN_GAME,
		payload: {
			gameId,
			playerId,
			name,
		},
	};
}

export function updatePoints(
	gameId: Types.GameId,
	playerId: Types.PlayerId,
	issueId: Types.IssueId,
	points: number
): Types.ClientEventActionTypes {
	return {
		type: Types.CLIENT_EVENT_MOVE_ISSUE,
		payload: {
			gameId,
			issueId,
			playerId,
			points,
		},
	};
}

export function skipMove(
	gameId: Types.GameId,
	playerId: Types.PlayerId
): Types.ClientEventActionTypes {
	return {
		type: Types.CLIENT_EVENT_SKIP_MOVE,
		payload: {
			gameId,
			playerId,
		},
	};
}

export function saveMove(
	gameId: Types.GameId,
	playerId: Types.PlayerId
): Types.ClientEventActionTypes {
	return {
		type: Types.CLIENT_EVENT_SAVE_MOVE,
		payload: {
			gameId,
			playerId,
		},
	};
}

export function openIssue(
	gameId: Types.GameId,
	playerId: Types.PlayerId,
	issueId: Types.IssueId
): Types.ClientEventActionTypes {
	return {
		type: Types.CLIENT_EVENT_OPEN_ISSUE,
		payload: {
			gameId,
			playerId,
			issueId,
		},
	};
}

export function closeIssue(
	gameId: Types.GameId,
	playerId: Types.PlayerId,
	issueId: Types.IssueId
): Types.ClientEventActionTypes {
	return {
		type: Types.CLIENT_EVENT_CLOSE_ISSUE,
		payload: {
			gameId,
			playerId,
			issueId,
		},
	};
}

export function addComment(
	gameId: Types.GameId,
	playerId: Types.PlayerId,
	issueId: Types.IssueId,
	comment: string
): Types.ClientEventActionTypes {
	return {
		type: Types.CLIENT_EVENT_ADD_COMMENT,
		payload: {
			gameId,
			playerId,
			issueId,
			comment,
		},
	};
}
