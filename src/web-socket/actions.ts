import * as Types from '../types';

export function connectToServer(url: string): Types.WebSocketActionTypes {
	return {
		type: Types.WEBSOCKET_CONNECT,
		payload: {
			url,
		},
	};
}
