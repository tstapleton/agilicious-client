import * as Types from '../types';

const initialState: Types.WebSocketState = {
	isOpen: false,
};

export function webSocketReducer(
	state = initialState,
	action: Types.WebSocketActionTypes
): Types.WebSocketState {
	switch (action.type) {
		case Types.WEBSOCKET_OPENED: {
			return {
				...state,
				isOpen: true,
			};
		}
		default:
			return state;
	}
}
