import { ClientEventActionTypes } from './client-event';
import { ServerEventActionTypes } from './server-event';
import { WebSocketActionTypes } from './web-socket';

export type EventActionTypes = ClientEventActionTypes | ServerEventActionTypes;

export type AllActionTypes = EventActionTypes | WebSocketActionTypes;
