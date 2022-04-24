import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  TFormLogin,
  TFormRegister,
  TFormReset,
  TFormUpdateUser,
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
    return await requestAPI(ENDPOINTS.register, form);
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
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (accessToken: string) => {
    return await requestAPI(ENDPOINTS.getUser, undefined, accessToken);
  }
);
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (form: TFormUpdateUser) => {
    return await requestAPI(
      ENDPOINTS.updateUser,
      { name: form.name || "", email: form.email || "" },
      form.accessToken
    );
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
  },
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
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
      setToken("token", action.payload.refreshToken);
      setToken("accessToken", action.payload.accessToken, { expires: 1200 });
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
      setToken("token", action.payload.refreshToken);
      setToken("accessToken", action.payload.accessToken, { expires: 1200 });
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
      deleteToken("accessToken");
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
    });
    builder.addCase(getUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.accessToken = "";
      state.userLoading = false;
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
      state.accessToken = "";
      state.userLoading = false;
    });
    builder.addCase(refreshingToken.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      setToken("token", action.payload.refreshToken);
      setToken("accessToken", action.payload.accessToken, { expires: 1200 });
    });
    builder.addCase(refreshingToken.pending, (state) => {});
    builder.addCase(refreshingToken.rejected, (state) => {});
  },
});

export const { setLoggedIn, setRefreshToken } = authSlice.actions;
export default authSlice.reducer;
