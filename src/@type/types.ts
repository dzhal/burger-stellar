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
export type TCookie = {
  [name: string]: string | number | boolean | Date | undefined;
  expires?: Date | number | string;
  path?: string;
};
export type TGetOrderId = {
  ingredients: string[];
  accessToken: string;
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
export type TFormGetUser = {
  accessToken: string;
  refreshToken: string;
};
export type TFormUpdateUser = {
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
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
