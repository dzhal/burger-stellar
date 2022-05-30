import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from "../../@type/types";

export const WS_ORDER_ACTIONS = {
  wsInit: "wsOrder/init",
  wsInitPerson: "wsOrder/initPerson",
  wsClose: "wsOrder/close",
  onOpen: "wsOrder/onOpen",
  onClose: "wsOrder/onClose",
  onError: "wsOrder/onError",
  onMessage: "wsOrder/onMessage",
};

export const initialState = {
  orders: [] as TOrder[],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: false,
};

const wsOrdersReducer = createReducer(initialState, {
  [WS_ORDER_ACTIONS.onOpen]: (state) => ({
    ...state,
    wsConnected: true,
    error: false,
  }),
  [WS_ORDER_ACTIONS.onClose]: (state) => ({
    ...state,
    wsConnected: false,
    error: false,
  }),
  [WS_ORDER_ACTIONS.onError]: (state) => ({
    ...state,
    wsConnected: false,
    error: true,
  }),
  [WS_ORDER_ACTIONS.onMessage]: (
    state,
    action: PayloadAction<{
      orders: TOrder[];
      total: number;
      totalToday: number;
    }>
  ) => {
    state = { ...action.payload, wsConnected: true, error: false };
    return state;
  },
});

export default wsOrdersReducer;
