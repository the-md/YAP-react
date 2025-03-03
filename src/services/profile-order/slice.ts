import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebsocketStatus } from "../../utils/types.ts";

interface profileOrderState {
  status: WebsocketStatus;
  table: Array<string>;
  error: string | null;
}

export const initialState: profileOrderState = {
  status: WebsocketStatus.OFFLINE,
  table: [],
  error: null,
};

export const profileOrderSlice = createSlice({
  name: 'profileOrder',
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = WebsocketStatus.CONNECTING;
    },
    wsOpen: (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.error = null;
    },
    wsClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    wsMessage: (state, action) => {
      console.log("action", action);
      console.log("state", state);
      // state.table = liveTableUpdate(state.table, action.payload);
    }
  },
  selectors: {
    getStatus: state => state.status,
    getError: state => state.error,
    getTable: state => state.table
  }
});

export const {
  wsConnecting,
  wsClose,
  wsError,
  wsMessage,
  wsOpen
} = profileOrderSlice.actions;
export const { getStatus, getError, getTable } = profileOrderSlice.selectors;
export default profileOrderSlice.reducer;

type TActionCreators = typeof profileOrderSlice.actions;

export type TWsInternalActions = ReturnType<TActionCreators[keyof TActionCreators]>;