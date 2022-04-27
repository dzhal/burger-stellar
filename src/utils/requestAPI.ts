import {
  TEndpoint,
  TFormForgot,
  TFormLogin,
  TFormRefreshToken,
  TFormRegister,
  TFormReset,
} from "../@type/types";
import checkResponse from "./check-resposnse";

export const requestAPI = async (
  endpoint: TEndpoint,
  body?:
    | TFormLogin
    | TFormRegister
    | TFormReset
    | TFormForgot
    | TFormRefreshToken,
  accessToken?: string
) => {
  const response = await fetch(endpoint.url, {
    method: endpoint.method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  const checkedResponse = await checkResponse(response);
  const json = await checkedResponse.json();
  return json;
};
