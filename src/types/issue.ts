import { UUID } from './common';

export type IssueId = UUID;

export interface Comment {
	author: string;
	body: string;
}

export interface Issue {
	id: IssueId;
	acceptanceCriteria: string;
	comments: Comment[];
	created: number;
	currentPoints: number;
	description: string;
	epicId: string;
	epicKey: string;
	key: string;
	originalPoints: number;
	reporter: string;
	status: string;
	title: string;
	type: string;
}

export type IssuesById = Record<IssueId, Issue>;

export interface IssuesState {
	byId: IssuesById;
}
