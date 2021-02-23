import { loadState, saveState } from './local-storage';
import * as Types from '../types';

describe('state/local-storage', () => {
	const key = 'agilicious';

	const localStorageMock = () => {
		let storage: Record<string, string> = {};
		return {
			getItem: jest.fn((key: string) => storage[key] ?? null),
			setItem: jest.fn((key: string, value: string = '') => {
				// must coerce to a string
				storage[key] = `${value}`;
			}),
			clear: jest.fn(() => {
				storage = {};
			}),
		};
	};
	Object.defineProperty(global, 'localStorage', {
		value: localStorageMock(),
		writable: true,
	});

	beforeEach(() => {
		global.localStorage.clear();
	});
	describe('loadState', () => {
		it('should return the parsed value from local storage', () => {
			const value = { hello: 'world!' };
			global.localStorage.setItem(key, JSON.stringify(value));
			expect(loadState()).toEqual(value);
		});
		it('should return undefined if the key is not set', () => {
			expect(loadState()).toEqual(undefined);
		});
		it('should return undefined if there is an error parsing the value', () => {
			const value = 'hello, world!';
			global.localStorage.setItem(key, value);
			expect(loadState()).toEqual(undefined);
		});
	});
	describe('saveState', () => {
		it('should store the stringified value', () => {
			const value: Partial<Types.RootState> = { issues: { byId: {} } };
			saveState(value);
			const stored = JSON.parse(global.localStorage.getItem(key) || '{}');
			expect(stored).toEqual(value);
		});
		it('should ignore any errors', () => {
			Object.defineProperty(global.localStorage, 'setItem', {
				value: jest.fn(() => {
					throw new Error();
				}),
			});
			const value: Partial<Types.RootState> = { issues: { byId: {} } };
			expect(() => saveState(value)).not.toThrow();
		});
	});
});
