import * as Types from '../types';

export function connectToServer(url: string): Types.WebSocketActionTypes {
	return {
		type: Types.WEBSOCKET_CONNECT,
		payload: {
			url,
		},
	};
}

export function websocketOpened(): Types.WebSocketActionTypes {
	return {
		type: Types.WEBSOCKET_OPENED,
		payload: {},
	};
}
