import {
  orderFeedSlice,
  initialState,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from "./slice.ts";
import { FeedDataResponse, OrderStatus, WebsocketStatus } from "../../utils/types.ts";

const mockData: FeedDataResponse = {
  success: true,
  orders: [
    {
      _id: "67d861836fce7d001db5abdf",
      ingredients: ["643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093d"],
      status: OrderStatus.done,
      name: "Флюоресцентный люминесцентный бургер",
      number: 71383,
      createdAt: "2025-03-17T17:53:07.102Z",
      updatedAt: "2025-03-17T17:53:07.813Z",
    }
  ],
  total: 100,
  totalToday: 10,
};

describe("order feed reducer", () => {
  it("correct initial state", () => {
    const state = orderFeedSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  })

  it('wsConnecting', () => {
    const state = orderFeedSlice.reducer(initialState, wsConnecting());
    expect(state).toEqual({...initialState, status: WebsocketStatus.CONNECTING});
  })

  it('wsOpen', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const state = orderFeedSlice.reducer(stateWithError, wsOpen());
    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
      error: null,
    });
  });

  it('wsClose', () => {
    const state = orderFeedSlice.reducer({ ...initialState, status: WebsocketStatus.ONLINE }, wsClose());
    expect(state).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it('wsError', () => {
    const state = orderFeedSlice.reducer(initialState, wsError('Connection error'));
    expect(state).toEqual({
      ...initialState,
      error: 'Connection error',
    });
  });

  it('wsMessage', () => {
    const state = orderFeedSlice.reducer(initialState, wsMessage(mockData));
    expect(state).toEqual({
      ...initialState,
      ordersData: mockData,
    });
  });
})
