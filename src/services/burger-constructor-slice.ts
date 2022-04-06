import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ingredientTypes } from "../utils/ingredientTypes";
import { IIngredient } from "../@type/types";
import { BASE_URL } from "../utils/fetch-urls";
import checkResponse from "../utils/check-resposnse";

export const getOrderId = createAsyncThunk(
  "constructor/getOrderId",
  async (ingredients: string[]) => {
    const response = await fetch(`${BASE_URL}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    });
    const checkedResponse = await checkResponse(response);
    const json = await checkedResponse.json();
    return json.order.number;
  }
);

type TCountIngredients = {
  id: string;
  count: number;
  type: string;
};
const burgerConstructorSlice = createSlice({
  name: "constructor",
  initialState: {
    ingredientsCommon: [] as IIngredient[],
    ingredientBun: {} as IIngredient,
    orderId: 0,
    isLoading: false,
    hasError: false,
    countIngredients: [] as TCountIngredients[],
  },
  reducers: {
    addIngredient: (state, action: PayloadAction<IIngredient>) => {
      if (action.payload.type === ingredientTypes.BUN) {
        state.ingredientBun = action.payload;
        const bunIngredient = state.countIngredients.find(
          (item) => item.type === ingredientTypes.BUN
        );
        if (bunIngredient) {
          const indexBun = state.countIngredients.indexOf(bunIngredient);
          state.countIngredients.splice(indexBun, 1);
          state.countIngredients.push({
            id: action.payload._id,
            count: 2,
            type: action.payload.type,
          });
        } else {
          state.countIngredients.push({
            id: action.payload._id,
            count: 2,
            type: action.payload.type,
          });
        }
      } else {
        state.ingredientsCommon.push(action.payload);
        const ingredientToIncrementCount = state.countIngredients.find(
          (item) => item.id === action.payload._id
        );
        if (ingredientToIncrementCount) {
          ingredientToIncrementCount.count += 1;
        } else {
          state.countIngredients.push({
            id: action.payload._id,
            count: 1,
            type: action.payload.type,
          });
        }
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      const ingredientToDelete = state.ingredientsCommon[action.payload];
      const ingredientToDecrementCount = state.countIngredients.find(
        (item) => item.id === ingredientToDelete._id
      );
      if (ingredientToDecrementCount) {
        ingredientToDecrementCount.count -= 1;
      }
      state.ingredientsCommon.splice(action.payload, 1);
    },
    addOrder: (state, action: PayloadAction<number>) => {
      state.orderId = action.payload;
    },
    removeOrder: (state) => {
      state.orderId = 0;
    },
    clearConstructor: (state) => {
      state.ingredientsCommon = [];
      state.ingredientBun = {} as IIngredient;
    },
    moveCard: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const movedItem = state.ingredientsCommon.splice(
        action.payload.dragIndex,
        1
      );
      state.ingredientsCommon.splice(
        action.payload.hoverIndex,
        0,
        movedItem[0]
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getOrderId.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.orderId = action.payload;
        state.isLoading = false;
        state.hasError = false;
      }
    );
    builder.addCase(getOrderId.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(getOrderId.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const {
  addIngredient,
  removeIngredient,
  addOrder,
  removeOrder,
  moveCard,
  clearConstructor,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
