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
