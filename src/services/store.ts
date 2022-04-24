import { configureStore } from "@reduxjs/toolkit";
import burgerConstructorReducer from "./burger-constructor-slice";
import burgerIngredientsReducer from "./burger-ingredients-slice";
import modalReducer from "./modal-slice";
import authReducer from "./auth-slice";

export const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    auth: authReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
