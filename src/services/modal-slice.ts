import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient, TOrder } from "../@type/types";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isDetailsOpen: false,
    detailedInfo: {} as IIngredient,
    isSuccessOpen: false,
    isOrderDetailsOpen: false,
    orderDetails: {} as TOrder,
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
    closeOrderDetailsModal: (state) => {
      state.isOrderDetailsOpen = false;
    },
    openOrderDetails: (state, action: PayloadAction<TOrder>) => {
      state.orderDetails = action.payload;
      state.isOrderDetailsOpen = true;
    },
  },
});

export const {
  closeDetailsModal,
  closeOrderModal,
  openIngredientDetails,
  openOrderSuccess,
  closeOrderDetailsModal,
  openOrderDetails,
} = modalSlice.actions;
export default modalSlice.reducer;
