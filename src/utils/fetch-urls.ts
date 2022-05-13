export const BASE_URL = "https://norma.nomoreparties.space/api/";
export const ENDPOINTS = {
  order: {
    method: "POST",
    url: `${BASE_URL}orders`,
  },
  ordersUser: {
    method: "GET",
    url: `${BASE_URL}orders`,
  },
  ordersFeed: {
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
  forgotPassword: {
    method: "POST",
    url: `${BASE_URL}password-reset`,
  },
  resetPassword: {
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
