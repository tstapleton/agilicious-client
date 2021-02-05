import * as Types from '../types';

export const selectIsOpen = (state: Types.RootState) => state.webSocket.isOpen;
