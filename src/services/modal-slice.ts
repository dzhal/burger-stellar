import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../@type/types";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isDetailsOpen: false,
    detailedInfo: {} as IIngredient,
    isSuccessOpen: false,
  },
  reducers: {
    closeDetailsModal: (state) => {
      state.isDetailsOpen = false;
    },
    closeOrderModal: (state) => {
      state.isSuccessOpen = false;
    },
    openIngredientDetails: (state, action: PayloadAction<IIngredient>) => {
      state.detailedInfo = action.payload;
      state.isDetailsOpen = true;
    },
    openOrderSuccess: (state) => {
      state.isSuccessOpen = true;
    },
  },
});

export const {
  closeDetailsModal,
  closeOrderModal,
  openIngredientDetails,
  openOrderSuccess,
} = modalSlice.actions;
export default modalSlice.reducer;
