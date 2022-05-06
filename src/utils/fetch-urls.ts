export const BASE_URL = "https://norma.nomoreparties.space/api/";
export const ENDPOINTS = {
  orders_user: {
    method: "GET",
    url: `${BASE_URL}orders`,
  },
  orders_feed: {
    method: "GET",
    url: `${BASE_URL}orders/feed`,
  },
  login: {
    method: "POST",
    url: `${BASE_URL}auth/login`,
  },
  register: {
    method: "POST",
    url: `${BASE_URL}auth/register`,
  },
  logout: {
    method: "POST",
    url: `${BASE_URL}auth/logout`,
  },
  forgot_password: {
    method: "POST",
    url: `${BASE_URL}password-reset`,
  },
  reset_password: {
    method: "POST",
    url: `${BASE_URL}password-reset/reset`,
  },
  token: {
    method: "POST",
    url: `${BASE_URL}auth/token`,
  },
  getUser: {
    method: "GET",
    url: `${BASE_URL}auth/user`,
  },
  updateUser: {
    method: "PATCH",
    url: `${BASE_URL}auth/user`,
  },
};
