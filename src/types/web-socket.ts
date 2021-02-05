export const WEBSOCKET_CONNECT = 'WEBSOCKET::CONNECT';
export const WEBSOCKET_OPENED = 'WEBSOCKET::OPENED';

interface WebSocketConnectPayload {
	url: string;
}

interface WebSocketConnectAction {
	type: typeof WEBSOCKET_CONNECT;
	payload: WebSocketConnectPayload;
}

interface WebSocketOpenedPayload {}

interface WebSocketOpenedAction {
	type: typeof WEBSOCKET_OPENED;
	payload: WebSocketOpenedPayload;
}

export type WebSocketActionTypes = WebSocketConnectAction | WebSocketOpenedAction;

export interface WebSocketState {
	isOpen: boolean;
}
