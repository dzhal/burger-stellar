import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IIngredient } from "../@type/types";
import { URL_GET_DATA } from "../utils/fetch-urls";
import { ingredientTypes } from "../utils/ingredientTypes";
import checkResponse from "../utils/check-resposnse";

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => {
    try {
      const response = await fetch(URL_GET_DATA);
      const checkedResponse = await checkResponse(response);
      const json = await checkedResponse.json();
      const ingredients: IIngredient[] = json.data;
      return ingredients;
    } catch (error) {
      console.log(error);
    }
  }
);

const burgerIngredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    currentTab: ingredientTypes.BUN,
    burgerIngredients: [] as IIngredient[],
    isLoading: false,
    hasError: false,
  },
  reducers: {
    setTab: (state, action) => {
      if (action.payload === ingredientTypes.BUN) {
        state.currentTab = ingredientTypes.BUN;
      } else if (action.payload === ingredientTypes.SAUCE) {
        state.currentTab = ingredientTypes.SAUCE;
      } else if (action.payload === ingredientTypes.MAIN) {
        state.currentTab = ingredientTypes.MAIN;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getIngredients.fulfilled,
      (state, action: PayloadAction<IIngredient[] | undefined>) => {
        if (action.payload) {
          state.burgerIngredients = action.payload;
        }
        state.isLoading = false;
        state.hasError = false;
      }
    );
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(getIngredients.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const { setTab } = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;