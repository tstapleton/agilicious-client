import { ClientEventActionTypes } from './client-event';
import { ServerEventActionTypes } from './server-event';
import { WebSocketActionTypes } from './web-socket';

// TODO: doesn't seem right to import this to expose the state
import { rootReducer } from '../state/reducers';

export type EventActionTypes = ClientEventActionTypes | ServerEventActionTypes;

export type AllActionTypes = EventActionTypes | WebSocketActionTypes;

export type RootState = ReturnType<typeof rootReducer>;
