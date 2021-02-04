import { MiddlewareAPI } from 'redux';
import { v4 } from 'uuid';

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

export const logger = (store: MiddlewareAPI) => (next: any) => (action: any) => {
	switch (action.type) {
		case 'WEBSOCKET::CONNECT':
			websocket = new WebSocket(action.payload.url);
			websocket.onopen = () => console.log('websocket open');
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

// import { Middleware, MiddlewareAPI } from 'redux';

// import { Action, Options } from './types';
// import { error } from './actions';
// import * as actionTypes from './actionTypes';
// import ReduxWebSocket from './ReduxWebSocket';

// /**
//  * Default middleware creator options.
//  * @private
//  */
// const defaultOptions = {
//   dateSerializer: null,
//   prefix: actionTypes.DEFAULT_PREFIX,
//   reconnectInterval: 2000,
//   reconnectOnClose: false,
//   serializer: JSON.stringify,
// };

// /**
//  * Create a middleware.
//  *
//  * @param {Options} rawOptions
//  *
//  * @returns {Middleware}
//  */
// export default (rawOptions?: Options): Middleware => {
//   const options = { ...defaultOptions, ...rawOptions };
//   const { prefix, dateSerializer } = options;
//   const actionPrefixExp = RegExp(`^${prefix}::`);

//   // Create a new redux websocket instance.
//   const reduxWebsocket = new ReduxWebSocket(options);

//   // Define the list of handlers, now that we have an instance of ReduxWebSocket.
//   const handlers = {
//     [actionTypes.WEBSOCKET_CONNECT]: reduxWebsocket.connect,
//     [actionTypes.WEBSOCKET_DISCONNECT]: reduxWebsocket.disconnect,
//     [actionTypes.WEBSOCKET_SEND]: reduxWebsocket.send,
//   };

//   // Middleware function.
//   return (store: MiddlewareAPI) => (next) => (action: Action) => {
//     const { dispatch } = store;
//     const { type: actionType } = action;

//     // Check if action type matches prefix
//     if (actionType && actionType.match(actionPrefixExp)) {
//       const baseActionType = action.type.replace(actionPrefixExp, '');
//       const handler = Reflect.get(handlers, baseActionType);

//       if (action.meta && action.meta.timestamp && dateSerializer) {
//         // eslint-disable-next-line no-param-reassign
//         action.meta.timestamp = dateSerializer(action.meta.timestamp);
//       }

//       if (handler) {
//         try {
//           handler(store, action);
//         } catch (err) {
//           dispatch(error(action, err, prefix));
//         }
//       }
//     }

//     return next(action);
//   };
// };
