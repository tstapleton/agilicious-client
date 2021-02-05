import * as Types from '../types';

const key = 'agilicious';

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem(key);
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (error) {
		return undefined;
	}
};

export const saveState = (state: Partial<Types.RootState>) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(key, serializedState);
	} catch (error) {
		// ignore write errors
	}
};
