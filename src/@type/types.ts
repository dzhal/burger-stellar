export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
}
export type TCountIngredients = {
  id: string;
  count: number;
  type: string;
};
export type TOrder = {
  _id: string;
  ingredients: string[];
  status: "created" | "pending" | "done";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};
export type TUser = {
  email: string;
  name: string;
};
export type TCookie = {
  [name: string]: string | number | boolean | Date | undefined;
  expires?: Date | number | string;
  path?: string;
};
export type TGetOrderId = {
  ingredients: string[];
};
export type TFormRegister = {
  name: string;
  email: string;
  password: string;
};
export type TFormForgot = {
  email: string;
};
export type TFormRefreshToken = {
  token: string;
};
export type TFormUpdateUser = {
  name: string;
  email: string;
};
export type TFormReset = {
  password: string;
  token: string;
};
export type TFormLogin = {
  email: string;
  password: string;
};
export type TEndpoint = {
  method: string;
  url: string;
};
