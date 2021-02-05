import * as Types from '../types';

const points = [1, 2, 3, 5, 8, 13, 21];

const initialState: Types.GameState = {
	columns: points.map((points: number) => ({ points, issueIds: [] })),
	phase: 'START',
	playersFinished: [],
};

type IssueIdsByPoints = Record<number, Array<Types.IssueId>>;

export function gameReducer(state = initialState, action: Types.EventActionTypes): Types.GameState {
	switch (action.type) {
		case Types.CLIENT_EVENT_CREATE_GAME: {
			const { avatarSetId, gameId } = action.payload;
			return {
				...state,
				avatarSetId,
				gameId,
			};
		}
		case Types.CLIENT_EVENT_JOIN_GAME: {
			const { gameId } = action.payload;
			return {
				...state,
				gameId,
			};
		}
		case Types.SERVER_EVENT_GAME_STATE:
			const { phase, issues } = action.payload;
			const issuesByPoints = issues.reduce((result, current) => {
				if (result[current.currentPoints]) {
					return {
						...result,
						[current.currentPoints]: [...result[current.currentPoints], current.id],
					};
				}
				return {
					...result,
					[current.currentPoints]: [current.id],
				};
			}, {} as IssueIdsByPoints);
			return {
				...state,
				columns: state.columns.map((column: Types.Column) => ({
					...column,
					issueIds: issuesByPoints[column.points] || [],
				})),
				phase,
			};
		case Types.SERVER_EVENT_ISSUE_MOVED:
			const { issue } = action.payload;
			return {
				...state,
				columns: state.columns.map((column: Types.Column) => {
					if (column.points !== issue.currentPoints) {
						return {
							...column,
							issueIds: column.issueIds.filter((issueId: Types.IssueId) => issueId !== issue.id),
						};
					}
					return {
						...column,
						issueIds: [...column.issueIds, issue.id],
					};
				}),
			};
		case Types.SERVER_EVENT_PLAYER_MOVED:
			return {
				...state,
				playersFinished: [],
			};
		case Types.SERVER_EVENT_PLAYER_SKIPPED: {
			const { phase, eventByPlayerId } = action.payload;
			return {
				...state,
				phase,
				playersFinished: [...state.playersFinished, eventByPlayerId],
			};
		}
		default:
			return state;
	}
}
