import { AnyAction } from "redux";
import { TOrder } from "../@type/types";
import reducer, { setLoggedIn } from "./auth-slice";

const previousState = {
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
};

test("should return initial state", () => {
  expect(reducer(undefined, {} as AnyAction)).toEqual({
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
  });
});

test("should set toggle isLoggedIn to true", () => {
  expect(reducer(previousState, setLoggedIn(true))).toEqual({
    isLoading: false,
    hasError: false,
    isLoggedIn: true,
    name: "",
    email: "",
    canResetPassword: false,
    userLoading: false,
    userOrders: [] as TOrder[],
    ordersLoading: false,
    ordersHasError: false,
    loginLoading: false,
    loginHasError: false,
  });
});
test("should set toggle isLoggedIn to false", () => {
  expect(
    reducer(
      {
        ...previousState,
        isLoggedIn: true,
      },
      setLoggedIn(false)
    )
  ).toEqual({
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
  });
});
