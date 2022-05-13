import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ingredientTypes } from "../utils/ingredientTypes";
import { IIngredient, TGetOrderId } from "../@type/types";
import { BASE_URL, ENDPOINTS } from "../utils/fetch-urls";
import { checkResponse, fetchAPIwithRefresh } from "../utils/requestAPI";
import { getToken } from "../utils/cookie-utils";

export const getOrderId = createAsyncThunk(
  "constructor/getOrderId",
  async (params: TGetOrderId) => {
    const response = await fetchAPIwithRefresh(ENDPOINTS.order, {
      method: ENDPOINTS.order.method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: getToken("token"),
      },
      body: params,
    });
    return response.order.number;
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
        state.countIngredients[0] = {
          id: action.payload._id,
          count: 2,
          type: action.payload.type,
        };
      } else {
        state.ingredientsCommon.push({
          ...action.payload,
          ...{ uuid: uuidv4() },
        });
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
    removeIngredient: (state, action: PayloadAction<string>) => {
      const idToDelete = state.ingredientsCommon.find(
        (item) => item.uuid === action.payload
      )?._id;
      const ingredientToDecrementCount = state.countIngredients.find(
        (item) => item.id === idToDelete
      );
      if (ingredientToDecrementCount) {
        ingredientToDecrementCount.count -= 1;
      }
      state.ingredientsCommon = state.ingredientsCommon.filter(
        (item) => item.uuid !== action.payload
      );
    },
    addOrder: (state, action: PayloadAction<number>) => {
      state.orderId = action.payload;
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
        state.ingredientsCommon = [];
        state.ingredientBun = {} as IIngredient;
        state.countIngredients = [];
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

export const { addIngredient, removeIngredient, addOrder, moveCard } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
