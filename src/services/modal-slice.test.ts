import { IIngredient, TOrder } from "../@type/types";
import reducer, {
  closeDetailsModal,
  closeOrderModal,
  openIngredientDetails,
  openOrderSuccess,
  closeOrderDetailsModal,
  openOrderDetails,
} from "./modal-slice";
test("should handle an ingredients details modal to open with data", () => {
  const previousState = {
    isDetailsOpen: false,
    detailedInfo: {} as IIngredient,
    isSuccessOpen: false,
    isOrderDetailsOpen: false,
    orderDetails: {} as TOrder,
  };
  expect(
    reducer(
      previousState,
      openIngredientDetails({
        _id: "test_id",
        name: "test_name",
        type: "test_type",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
      })
    )
  ).toEqual({
    isDetailsOpen: true,
    detailedInfo: {
      _id: "test_id",
      name: "test_name",
      type: "test_type",
      calories: 1,
      proteins: 2,
      fat: 3,
      carbohydrates: 4,
      price: 5,
      image: "test_image",
      image_mobile: "test_image_mobile",
      image_large: "test_image_large",
      __v: 1,
    },
    isSuccessOpen: false,
    isOrderDetailsOpen: false,
    orderDetails: {} as TOrder,
  });
});
test("should handle an ingredients details modal to close", () => {
  const previousState = {
    isDetailsOpen: true,
    detailedInfo: {} as IIngredient,
    isSuccessOpen: false,
    isOrderDetailsOpen: false,
    orderDetails: {} as TOrder,
  };
  expect(reducer(previousState, closeDetailsModal())).toEqual({
    isDetailsOpen: false,
    detailedInfo: {} as IIngredient,
    isSuccessOpen: false,
    isOrderDetailsOpen: false,
    orderDetails: {} as TOrder,
  });
});
test("should handle an order success modal to open", () => {
  const previousState = {
    isDetailsOpen: false,
    detailedInfo: {} as IIngredient,
    isSuccessOpen: false,
    isOrderDetailsOpen: false,
    orderDetails: {} as TOrder,
  };
  expect(reducer(previousState, openOrderSuccess())).toEqual({
    isDetailsOpen: false,
    detailedInfo: {} as IIngredient,
    isSuccessOpen: true,
    isOrderDetailsOpen: false,
    orderDetails: {} as TOrder,
  });
});
test("should handle an order success modal to close", () => {
  const previousState = {
    isDetailsOpen: false,
    detailedInfo: {} as IIngredient,
    isSuccessOpen: true,
    isOrderDetailsOpen: false,
    orderDetails: {} as TOrder,
  };
  expect(reducer(previousState, closeOrderModal())).toEqual({
    isDetailsOpen: false,
    detailedInfo: {} as IIngredient,
    isSuccessOpen: false,
    isOrderDetailsOpen: false,
    orderDetails: {} as TOrder,
  });
});
test("should handle an order details modal to open with data", () => {
  const previousState = {
    isDetailsOpen: false,
    detailedInfo: {} as IIngredient,
    isSuccessOpen: false,
    isOrderDetailsOpen: false,
    orderDetails: {} as TOrder,
  };
  expect(
    reducer(
      previousState,
      openOrderDetails({
        _id: "test_id",
        ingredients: ["ingredint1", "ingredint2"],
        status: "created",
        name: "test_name",
        createdAt: "test_date_created",
        updatedAt: "test_date_updated",
        number: 1,
      })
    )
  ).toEqual({
    isDetailsOpen: false,
    detailedInfo: {} as IIngredient,
    isSuccessOpen: false,
    isOrderDetailsOpen: true,
    orderDetails: {
      _id: "test_id",
      ingredients: ["ingredint1", "ingredint2"],
      status: "created",
      name: "test_name",
      createdAt: "test_date_created",
      updatedAt: "test_date_updated",
      number: 1,
    },
  });
});
test("should handle an order details modal to close", () => {
  const previousState = {
    isDetailsOpen: false,
    detailedInfo: {} as IIngredient,
    isSuccessOpen: false,
    isOrderDetailsOpen: true,
    orderDetails: {} as TOrder,
  };
  expect(reducer(previousState, closeOrderDetailsModal())).toEqual({
    isDetailsOpen: false,
    detailedInfo: {} as IIngredient,
    isSuccessOpen: false,
    isOrderDetailsOpen: false,
    orderDetails: {} as TOrder,
  });
});
