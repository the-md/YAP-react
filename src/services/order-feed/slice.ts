import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedOrderData, WebsocketStatus } from "../../utils/types.ts";

interface orderFeedState {
  status: WebsocketStatus;
  orderData: Array<FeedOrderData>;
  error: string | null;
}

export const initialState: orderFeedState = {
  status: WebsocketStatus.OFFLINE,
  orderData: [],
  error: null,
};

export const orderFeedSlice = createSlice({
  name: 'orderFeed',
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
} = orderFeedSlice.actions;
export const { getStatus, getError, getTable } = orderFeedSlice.selectors;
export default orderFeedSlice.reducer;

type TActionCreators = typeof orderFeedSlice.actions;

export type TWsInternalActions = ReturnType<TActionCreators[keyof TActionCreators]>;