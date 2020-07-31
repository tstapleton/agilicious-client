export interface Issue {
	id: string;
	title: string;
	description: string;
	type: 'Epic' | 'Story' | 'Bug';
	epicId?: string;

	currentPoints: number;
}

export interface Player {
	id: string;
	name: string;
}

export interface Card {
	description: string;
	epic: string;
	estimate: number;
	issueKey: string;
	title: string;
	type: 'bug' | 'story' | 'epic' | 'task';
}
