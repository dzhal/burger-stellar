import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../@type/types";

type TDetailedInfo = IIngredient;

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isDetailsOpen: false,
    detailedInfo: {} as TDetailedInfo,
    isSuccessOpen: false,
  },
  reducers: {
    closeModal: (state) => {
      state.isDetailsOpen = false;
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

export const { closeModal, openIngredientDetails, openOrderSuccess } =
  modalSlice.actions;
export default modalSlice.reducer;
