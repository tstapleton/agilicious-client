import { MiddlewareAPI } from 'redux';
import { v4 } from 'uuid';
import { websocketOpened } from './actions';
import * as Types from '../types';

const clientEventPrefix = 'CLIENT_EVENT::';
const serverEventPrefix = 'SERVER_EVENT::';

let websocket: WebSocket;

const toServerAction = (data: any) => {
	const { type, ...payload } = data;
	return {
		payload,
		type: `${serverEventPrefix}${type}`,
	};
};

// TODO: rename, remove logging
// TODO: handle reconnecting

export const logger = (store: MiddlewareAPI) => (next: any) => (action: any) => {
	switch (action.type) {
		case Types.WEBSOCKET_CONNECT:
			websocket = new WebSocket(action.payload.url);
			websocket.onopen = () => {
				store.dispatch(websocketOpened());
				console.log('websocket open');
			};
			websocket.onclose = (event) => console.log('websocket close');
			websocket.onmessage = (event: MessageEvent) => {
				console.log('websocket on message', event);
				const data = JSON.parse(event.data);
				const serverAction = toServerAction(data);
				store.dispatch(serverAction);
			};
			break;
		default:
			break;
	}

	if (action.type.startsWith(clientEventPrefix)) {
		const data = { id: v4(), type: action.type.replace(clientEventPrefix, ''), ...action.payload };
		console.log(`Sending to server`, data);
		websocket.send(JSON.stringify(data));
	}

	console.group(action.type);
	console.info('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	console.groupEnd();
	return result;
};

export default logger;
