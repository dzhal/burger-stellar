import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  TFormGetUser,
  TFormLogin,
  TFormRegister,
  TFormReset,
  TFormUpdateUser,
  TOrder,
} from "../@type/types";
import { requestAPI } from "../utils/requestAPI";
import { ENDPOINTS } from "../utils/fetch-urls";
import { deleteToken, setToken } from "../utils/cookie-utils";

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string) => {
    return await requestAPI(ENDPOINTS.forgot_password, { email: email });
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (form: TFormReset) => {
    return await requestAPI(ENDPOINTS.reset_password, form);
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (form: TFormRegister) => {
    const response = await requestAPI(ENDPOINTS.register, form);
    setToken("token", response.refreshToken, { path: "/" });
    return response;
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (form: TFormLogin) => {
    return await requestAPI(ENDPOINTS.login, form);
  }
);
export const logout = createAsyncThunk("auth/logout", async (token: string) => {
  return await requestAPI(ENDPOINTS.logout, { token: token });
});
export const refreshingToken = createAsyncThunk(
  "auth/refreshToken",
  async (refreshToken: string) => {
    return await requestAPI(ENDPOINTS.token, { token: refreshToken });
  }
);
export const getUserOrders = createAsyncThunk(
  "auth/getUserOrders",
  async (form: TFormGetUser) => {
    try {
      return {
        ...(await requestAPI(
          ENDPOINTS.orders_user,
          undefined,
          form.accessToken
        )),
        ...{ refreshToken: form.refreshToken, accessToken: form.accessToken },
      };
    } catch (e) {
      if (e === 403) {
        const refresh = await requestAPI(ENDPOINTS.token, {
          token: form.refreshToken,
        });
        setToken("token", refresh.refreshToken, { path: "/" });
        const response = await requestAPI(
          ENDPOINTS.orders_user,
          undefined,
          refresh.accessToken
        );
        return { ...response, ...refresh };
      }
    }
  }
);
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (form: TFormGetUser) => {
    try {
      const response = {
        ...(await requestAPI(ENDPOINTS.getUser, undefined, form.accessToken)),
        ...{ refreshToken: form.refreshToken, accessToken: form.accessToken },
      };
      setToken("token", form.refreshToken, { path: "/" });
      return response;
    } catch (e) {
      if (e === 403) {
        const refresh = await requestAPI(ENDPOINTS.token, {
          token: form.refreshToken,
        });
        const response = await requestAPI(
          ENDPOINTS.getUser,
          undefined,
          refresh.accessToken
        );
        return { ...response, ...refresh };
      }
    }
  }
);
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (form: TFormUpdateUser) => {
    try {
      return {
        ...(await requestAPI(
          ENDPOINTS.updateUser,
          { name: form.name || "", email: form.email || "" },
          form.accessToken
        )),
        ...{ refreshToken: form.refreshToken, accessToken: form.accessToken },
      };
    } catch (e) {
      if (e === 403) {
        const refresh = await requestAPI(ENDPOINTS.token, {
          token: form.refreshToken,
        });
        const response = await requestAPI(
          ENDPOINTS.updateUser,
          { name: form.name || "", email: form.email || "" },
          refresh.accessToken
        );
        return { ...response, ...refresh };
      }
    }
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
    accessToken: "",
    refreshToken: "",
    canResetPassword: false,
    userLoading: false,
    userOrders: [] as TOrder[],
    ordersLoading: false,
    ordersHasError: false,
  },
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.canResetPassword = true;
    });
    builder.addCase(forgotPassword.pending, (state) => {});
    builder.addCase(forgotPassword.rejected, (state) => {});
    builder.addCase(register.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
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
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.isLoggedIn = true;
      setToken("token", action.payload.refreshToken, { path: "/" });
    });
    builder.addCase(login.pending, (state) => {});
    builder.addCase(login.rejected, (state) => {});
    builder.addCase(logout.fulfilled, (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.name = "";
      state.email = "";
      state.isLoggedIn = false;
      deleteToken("token");
    });
    builder.addCase(logout.pending, (state) => {});
    builder.addCase(logout.rejected, (state) => {});
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.canResetPassword = false;
    });
    builder.addCase(resetPassword.pending, (state) => {});
    builder.addCase(resetPassword.rejected, (state) => {});
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.userLoading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(getUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.accessToken = "";
      state.userLoading = false;
      // state.isLoggedIn = false;
      // deleteToken("token");
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.ordersLoading = false;
      state.ordersHasError = false;
      state.userOrders = action.payload.orders;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(getUserOrders.pending, (state) => {
      state.ordersLoading = true;
      state.ordersHasError = false;
    });
    builder.addCase(getUserOrders.rejected, (state) => {
      state.accessToken = "";
      state.ordersLoading = false;
      state.ordersHasError = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.userLoading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      setToken("token", action.payload.refreshToken, { path: "/" });
    });
    builder.addCase(updateUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.accessToken = "";
      state.userLoading = false;
    });
    builder.addCase(refreshingToken.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      setToken("token", action.payload.refreshToken, { path: "/" });
    });
    builder.addCase(refreshingToken.pending, (state) => {});
    builder.addCase(refreshingToken.rejected, (state) => {});
  },
});

export const { setLoggedIn, setRefreshToken, setAccessToken } =
  authSlice.actions;
export default authSlice.reducer;
