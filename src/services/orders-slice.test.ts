import { AnyAction } from "redux";
import { TOrder } from "../@type/types";
import reducer from "./orders-slice";

test("should return the initial state", () => {
  expect(reducer(undefined, {} as AnyAction)).toEqual({
    isLoading: false,
    hasError: false,
    staticOrders: [] as TOrder[],
    total: 0,
    totalToday: 0,
  });
});
