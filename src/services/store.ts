import { configureStore } from "@reduxjs/toolkit";
import burgerConstructorReducer from "./burger-constructor-slice";
import burgerIngredientsReducer from "./burger-ingredients-slice";
import modalReducer from "./modal-slice";
import authReducer from "./auth-slice";
import ordersReducer from "./orders-slice";
import wsOrderReducer, { WS_ORDER_ACTIONS } from "./ws-orders/ws-orders-slice";
import { socketMiddleware } from "./ws-orders/socketMiddleware";

export const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    auth: authReducer,
    modal: modalReducer,
    orders: ordersReducer,
    wsOrders: wsOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(
        "wss://norma.nomoreparties.space/orders",
        WS_ORDER_ACTIONS
      )
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
