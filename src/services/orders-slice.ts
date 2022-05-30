import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "../@type/types";
import { ENDPOINTS } from "../utils/fetch-urls";
import { requestAPI } from "../utils/requestAPI";

export const getOrdersFeed = createAsyncThunk(
  "orders/getOrdersFeed",
  async () => {
    return await requestAPI(ENDPOINTS.ordersFeed);
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    isLoading: false,
    hasError: false,
    staticOrders: [] as TOrder[],
    total: 0,
    totalToday: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersFeed.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.staticOrders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
    builder.addCase(getOrdersFeed.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(getOrdersFeed.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

// export const {} = ordersSlice.actions;
export default ordersSlice.reducer;
