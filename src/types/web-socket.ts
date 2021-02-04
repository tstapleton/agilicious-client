export const WEBSOCKET_CONNECT = 'WEBSOCKET::CONNECT';

interface WebSocketConnectPayload {
	url: string;
}

interface WebSocketConnectAction {
	type: typeof WEBSOCKET_CONNECT;
	payload: WebSocketConnectPayload;
}

export type WebSocketActionTypes = WebSocketConnectAction;
