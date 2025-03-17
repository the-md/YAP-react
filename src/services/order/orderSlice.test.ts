import { orderSlice, initialState } from "./slice.ts";
import { onCreateOrder, onGetOrder } from "./actions.ts";
import { Order, OrderStatus } from "../../utils/types.ts";

const mockOrder: Order = {
  ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093e"],
  _id: "123",
  status: OrderStatus.done,
  name: "John Doe",
  number: 12345,
  createdAt: "2022-01-01T12:00:00.000Z",
  updatedAt: "2022-01-02T12:00:00.000Z",
}

describe("order reducer", () => {
  it("correct initial state", () => {
    const state = orderSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("onCreateOrder.pending", () => {
    const action = { type: onCreateOrder.pending.type };

    const state = orderSlice.reducer(initialState, action);

    expect(state).toEqual({...initialState, loading: true, openModal: true});
  });

  it("onCreateOrder.rejected", () => {
    const action = { type: onCreateOrder.rejected.type, error: { message: "Test" } };

    const state = orderSlice.reducer(initialState, action);

    expect(state).toEqual({...initialState, error: "Test"});
  });

  it("onCreateOrder.fulfilled", () => {
    const action = { type: onCreateOrder.fulfilled.type, payload: mockOrder };

    const state = orderSlice.reducer(initialState, action);

    expect(state).toEqual({...initialState, order: mockOrder});
  });


  it("onGetOrder.pending", () => {
    const action = { type: onGetOrder.pending.type };

    const state = orderSlice.reducer(initialState, action);

    expect(state).toEqual({...initialState, loading: true, openModal: true});
  });

  it("onGetOrder.rejected", () => {
    const action = { type: onGetOrder.rejected.type, error: { message: "Test" } };

    const state = orderSlice.reducer(initialState, action);

    expect(state).toEqual({...initialState, error: "Test"});
  });

  it("onGetOrder.fulfilled", () => {
    const action = { type: onGetOrder.fulfilled.type, payload: mockOrder };

    const state = orderSlice.reducer(initialState, action);

    expect(state).toEqual({...initialState, order: mockOrder});
  });
});
