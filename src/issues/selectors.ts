import * as Types from '../types';

export const selectIssues = (state: Types.RootState, issueIds: Array<Types.IssueId>) => {
	if (issueIds.length === 0) {
		return [];
	}

	return issueIds.map((issueId: Types.IssueId) => state.issues.byId[issueId]);
};

export const selectIssueById = (state: Types.RootState, issueId: Types.IssueId) =>
	state.issues.byId[issueId];
