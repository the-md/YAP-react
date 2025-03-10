import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedDataResponse, WebsocketStatus } from "../../utils/types.ts";

interface orderFeedState {
  status: WebsocketStatus;
  ordersData: FeedDataResponse | null;
  error: string | null;
}

export const initialState: orderFeedState = {
  status: WebsocketStatus.OFFLINE,
  ordersData: null,
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
      state.ordersData = action.payload
    }
  },
  selectors: {
    getStatus: state => state.status,
    getError: state => state.error,
    getOrdersData: state => state.ordersData
  }
});

export const {
  wsConnecting,
  wsClose,
  wsError,
  wsMessage,
  wsOpen
} = orderFeedSlice.actions;
export const { getStatus, getError, getOrdersData } = orderFeedSlice.selectors;
export default orderFeedSlice.reducer;

type TActionCreators = typeof orderFeedSlice.actions;

export type TWsInternalActions = ReturnType<TActionCreators[keyof TActionCreators]>;