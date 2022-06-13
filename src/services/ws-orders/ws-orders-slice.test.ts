import { AnyAction } from "redux";
import { TOrder } from "../../@type/types";
import reducer, { WS_ORDER_ACTIONS } from "./ws-orders-slice";

test("should return initial state", () => {
  expect(reducer(undefined, {} as AnyAction)).toEqual({
    orders: [] as TOrder[],
    total: 0,
    totalToday: 0,
    wsConnected: false,
    error: false,
  });
});

test("should change connected state to TRUE on open websocket", () => {
  const previousState = {
    orders: [] as TOrder[],
    total: 0,
    totalToday: 0,
    wsConnected: false,
    error: false,
  };
  expect(reducer(previousState, { type: WS_ORDER_ACTIONS.onOpen })).toEqual({
    orders: [] as TOrder[],
    total: 0,
    totalToday: 0,
    wsConnected: true,
    error: false,
  });
});
test("should change connected state to FALSE on close websocket", () => {
  const previousState = {
    orders: [] as TOrder[],
    total: 0,
    totalToday: 0,
    wsConnected: true,
    error: false,
  };
  expect(reducer(previousState, { type: WS_ORDER_ACTIONS.onClose })).toEqual({
    orders: [] as TOrder[],
    total: 0,
    totalToday: 0,
    wsConnected: false,
    error: false,
  });
});
test("should return error to state on error websocket", () => {
  const previousState = {
    orders: [] as TOrder[],
    total: 0,
    totalToday: 0,
    wsConnected: false,
    error: false,
  };
  expect(reducer(previousState, { type: WS_ORDER_ACTIONS.onError })).toEqual({
    orders: [] as TOrder[],
    total: 0,
    totalToday: 0,
    wsConnected: false,
    error: true,
  });
});

test("should recieve data to state on message websocket", () => {
  const previousState = {
    orders: [] as TOrder[],
    total: 0,
    totalToday: 0,
    wsConnected: false,
    error: false,
  };
  expect(
    reducer(previousState, {
      type: WS_ORDER_ACTIONS.onMessage,
      payload: {
        orders: [
          {
            _id: "test_id",
            ingredients: ["ingredient1", "ingredient2"],
            status: "created",
            name: "test_name",
            createdAt: "test_date1",
            updatedAt: "test_date2",
            number: 777,
          },
        ],
        total: 100,
        totalToday: 10,
      },
    })
  ).toEqual({
    orders: [
      {
        _id: "test_id",
        ingredients: ["ingredient1", "ingredient2"],
        status: "created",
        name: "test_name",
        createdAt: "test_date1",
        updatedAt: "test_date2",
        number: 777,
      },
    ],
    total: 100,
    totalToday: 10,
    wsConnected: true,
    error: false,
  });
});
