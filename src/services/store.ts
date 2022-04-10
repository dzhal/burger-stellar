import { configureStore } from "@reduxjs/toolkit";
import burgerConstructorReducer from "./burger-constructor-slice";
import burgerIngredientsReducer from "./burger-ingredients-slice";
import modalReducer from "./modal-slice";

export const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    modal: modalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
