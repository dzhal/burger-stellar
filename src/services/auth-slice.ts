import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TFormLogin,
  TFormRegister,
  TFormReset,
  TFormUpdateUser,
  TOrder,
  TUser,
} from "../@type/types";
import { fetchAPIwithRefresh, requestAPI } from "../utils/requestAPI";
import { ENDPOINTS } from "../utils/fetch-urls";
import { deleteToken, getToken, setToken } from "../utils/cookie-utils";

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string) => {
    const response = await requestAPI(ENDPOINTS.forgotPassword, {
      email: email,
    });
    return response;
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (form: TFormReset) => {
    return await requestAPI(ENDPOINTS.resetPassword, form);
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (form: TFormRegister) => {
    const response = await requestAPI(ENDPOINTS.register, form);
    setToken("token", response.accessToken, { path: "/" });
    localStorage.setItem("refreshToken", response.refreshToken);
    return response;
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (form: TFormLogin) => {
    const response: {
      accessToken: string;
      refreshToken: string;
      success: boolean;
      user: TUser;
    } = await requestAPI(ENDPOINTS.login, form);
    setToken("token", response.accessToken, { path: "/" });
    localStorage.setItem("refreshToken", response.refreshToken);
    return response;
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async (refreshToken: string) => {
    const response: {
      success: boolean;
      message: string;
    } = await requestAPI(ENDPOINTS.logout, {
      token: localStorage.getItem("refreshToken") || "",
    });
    deleteToken("token");
    localStorage.removeItem("refreshToken");
    return response;
  }
);

export const getUser = createAsyncThunk("auth/getUser", async () => {
  return await fetchAPIwithRefresh(ENDPOINTS.getUser, {
    method: ENDPOINTS.getUser.method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getToken("token"),
    },
  });
});

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (form: TFormUpdateUser) => {
    return await fetchAPIwithRefresh(ENDPOINTS.updateUser, {
      method: ENDPOINTS.updateUser.method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: getToken("token"),
      },
      body: form,
    });
  }
);
export const getUserOrders = createAsyncThunk(
  "auth/getUserOrders",
  async () => {
    return await fetchAPIwithRefresh(ENDPOINTS.ordersUser, {
      method: ENDPOINTS.ordersUser.method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: getToken("token"),
      },
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    hasError: false,
    isLoggedIn: false,
    name: "",
    email: "",
    canResetPassword: false,
    userLoading: false,
    userOrders: [] as TOrder[],
    ordersLoading: false,
    ordersHasError: false,
    loginLoading: false,
    loginHasError: false,
  },
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.canResetPassword = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.canResetPassword = false;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.canResetPassword = false;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.canResetPassword = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.isLoggedIn = true;
      state.loginLoading = false;
      state.loginHasError = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginHasError = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loginLoading = false;
      state.loginHasError = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.name = "";
      state.email = "";
      state.isLoggedIn = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.name = "";
      state.email = "";
      state.isLoggedIn = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.userLoading = false;
    });
    builder.addCase(getUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.userLoading = false;
      // state.isLoggedIn = false;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.ordersLoading = false;
      state.ordersHasError = false;
      state.userOrders = action.payload.orders;
    });
    builder.addCase(getUserOrders.pending, (state) => {
      state.ordersLoading = true;
      state.ordersHasError = false;
    });
    builder.addCase(getUserOrders.rejected, (state) => {
      state.ordersLoading = false;
      state.ordersHasError = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.userLoading = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.userLoading = false;
    });
  },
});

export const { setLoggedIn } = authSlice.actions;
export default authSlice.reducer;
