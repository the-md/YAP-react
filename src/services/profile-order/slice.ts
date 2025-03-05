import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedDataResponse, WebsocketStatus } from "../../utils/types.ts";

interface profileOrderState {
  status: WebsocketStatus;
  ordersData: FeedDataResponse | null;
  error: string | null;
}

export const initialState: profileOrderState = {
  status: WebsocketStatus.OFFLINE,
  ordersData: null,
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
} = profileOrderSlice.actions;
export const { getStatus, getError, getOrdersData } = profileOrderSlice.selectors;
export default profileOrderSlice.reducer;

type TActionCreators = typeof profileOrderSlice.actions;

export type TWsInternalActions = ReturnType<TActionCreators[keyof TActionCreators]>;