import * as Types from '../types';

const initialState: Types.IssuesState = {
	byId: {},
};

export function issuesReducer(
	state = initialState,
	action: Types.ServerEventActionTypes
): Types.IssuesState {
	switch (action.type) {
		case Types.SERVER_EVENT_GAME_STATE:
			return {
				...state,
				byId: action.payload.issues.reduce(
					(result: Types.IssuesById, current: Types.Issue) => ({
						...result,
						[current.id]: current,
					}),
					{}
				),
			};
		case Types.SERVER_EVENT_ISSUE_MOVED:
			const { issue } = action.payload;
			return {
				...state,
				byId: {
					...state.byId,
					[issue.id]: issue,
				},
			};
		default:
			return state;
	}
}
