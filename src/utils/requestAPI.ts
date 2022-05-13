import {
  TEndpoint,
  TFormForgot,
  TFormLogin,
  TFormRefreshToken,
  TFormRegister,
  TFormReset,
  TGetOrderId,
} from "../@type/types";
import { getToken, setToken } from "./cookie-utils";
import { ENDPOINTS } from "./fetch-urls";
type TRequestOptions = {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization?: string;
  };
  body?:
    | TFormLogin
    | TFormRegister
    | TFormReset
    | TFormForgot
    | TFormRefreshToken
    | TGetOrderId;
};

export const checkResponse = (response: Response) => {
  return response.ok
    ? response.json()
    : response.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  return fetch(ENDPOINTS.token.url, {
    method: ENDPOINTS.token.method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  }).then(checkResponse);
};

export const fetchAPIwithRefresh = async (
  endpoint: TEndpoint,
  options: TRequestOptions
) => {
  try {
    const response = await requestAPIToken(endpoint, options.body);
    return response;
  } catch (err: unknown) {
    const customError = err as { code: string; message: string };
    if (
      customError.message === "jwt expired" ||
      customError.message === "invalid token"
    ) {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setToken("token", refreshData.accessToken, { path: "/" });
      options.headers.Authorization = refreshData.accessToken;
      return requestAPIToken(endpoint, options.body);
    } else {
      return Promise.reject(customError);
    }
  }
};

export const requestAPIToken = async (
  endpoint: TEndpoint,
  body?:
    | TFormLogin
    | TFormRegister
    | TFormReset
    | TFormForgot
    | TFormRefreshToken
    | TGetOrderId
) => {
  const response = await fetch(endpoint.url, {
    method: endpoint.method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getToken("token"),
    },
    body: JSON.stringify(body),
  });
  return await checkResponse(response);
};
export const requestAPI = async (
  endpoint: TEndpoint,
  body?:
    | TFormLogin
    | TFormRegister
    | TFormReset
    | TFormForgot
    | TFormRefreshToken
    | TGetOrderId,
  token?: string
) => {
  const response = await fetch(endpoint.url, {
    method: endpoint.method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
  return await checkResponse(response);
};
