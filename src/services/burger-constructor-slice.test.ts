import { AnyAction } from "redux";
import { IIngredient, TCountIngredients } from "../@type/types";
import reducer, {
  addIngredient,
  removeIngredient,
  addOrder,
  moveCard,
} from "./burger-constructor-slice";

test("should return the initial state", () => {
  expect(reducer(undefined, {} as AnyAction)).toEqual({
    ingredientsCommon: [] as IIngredient[],
    ingredientBun: {} as IIngredient,
    orderId: 0,
    isLoading: false,
    hasError: false,
    countIngredients: [] as TCountIngredients[],
  });
});
test("should add bun ingredient to burger constructor", () => {
  const previousState = {
    ingredientsCommon: [] as IIngredient[],
    ingredientBun: {} as IIngredient,
    orderId: 0,
    isLoading: false,
    hasError: false,
    countIngredients: [] as TCountIngredients[],
  };
  expect(
    reducer(
      previousState,
      addIngredient({
        _id: "test_id",
        name: "test_name",
        type: "bun",
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
    ingredientsCommon: [],
    ingredientBun: {
      _id: "test_id",
      name: "test_name",
      type: "bun",
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
    orderId: 0,
    isLoading: false,
    hasError: false,
    countIngredients: [
      {
        id: "test_id",
        count: 2,
        type: "bun",
      },
    ],
  });
});
test("should add sauce ingredient to burger constructor", () => {
  const previousState = {
    ingredientsCommon: [] as IIngredient[],
    ingredientBun: {} as IIngredient,
    orderId: 0,
    isLoading: false,
    hasError: false,
    countIngredients: [] as TCountIngredients[],
  };
  expect(
    reducer(
      previousState,
      addIngredient({
        _id: "test_id",
        name: "test_name",
        type: "sauce",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
        uuid: "123",
      })
    )
  ).toEqual({
    ingredientsCommon: [
      {
        _id: "test_id",
        name: "test_name",
        type: "sauce",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
        uuid: "123",
      },
    ],
    ingredientBun: {},
    orderId: 0,
    isLoading: false,
    hasError: false,
    countIngredients: [
      {
        id: "test_id",
        count: 1,
        type: "sauce",
      },
    ],
  });
});
test("should add count sauce ingredient if this id already exist to burger constructor", () => {
  const previousState = {
    ingredientsCommon: [
      {
        _id: "test_id",
        name: "test_name",
        type: "sauce",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
        uuid: "123",
      },
    ],
    ingredientBun: {} as IIngredient,
    orderId: 0,
    isLoading: false,
    hasError: false,
    countIngredients: [
      {
        id: "test_id",
        count: 1,
        type: "sauce",
      },
    ],
  };
  expect(
    reducer(
      previousState,
      addIngredient({
        _id: "test_id",
        name: "test_name1",
        type: "sauce",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
        uuid: "345",
      })
    )
  ).toEqual({
    ingredientsCommon: [
      {
        _id: "test_id",
        name: "test_name",
        type: "sauce",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
        uuid: "123",
      },
      {
        _id: "test_id",
        name: "test_name1",
        type: "sauce",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
        uuid: "345",
      },
    ],
    ingredientBun: {},
    orderId: 0,
    isLoading: false,
    hasError: false,
    countIngredients: [
      {
        id: "test_id",
        count: 2,
        type: "sauce",
      },
    ],
  });
});
test("should remove ingredient and decrease count of ingredient in burger constructor", () => {
  const previousState = {
    ingredientsCommon: [
      {
        _id: "test_id",
        name: "test_name",
        type: "sauce",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
        uuid: "123",
      },
      {
        _id: "test_id",
        name: "test_name1",
        type: "sauce",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
        uuid: "345",
      },
    ],
    ingredientBun: {} as IIngredient,
    orderId: 0,
    isLoading: false,
    hasError: false,
    countIngredients: [
      {
        id: "test_id",
        count: 2,
        type: "sauce",
      },
    ],
  };
  expect(reducer(previousState, removeIngredient("345"))).toEqual({
    ingredientsCommon: [
      {
        _id: "test_id",
        name: "test_name",
        type: "sauce",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
        uuid: "123",
      },
    ],
    ingredientBun: {},
    orderId: 0,
    isLoading: false,
    hasError: false,
    countIngredients: [
      {
        id: "test_id",
        count: 1,
        type: "sauce",
      },
    ],
  });
});
test("should add order number to state", () => {
  const previousState = {
    ingredientsCommon: [] as IIngredient[],
    ingredientBun: {} as IIngredient,
    orderId: 0,
    isLoading: false,
    hasError: false,
    countIngredients: [] as TCountIngredients[],
  };
  expect(reducer(previousState, addOrder(123))).toEqual({
    ingredientsCommon: [] as IIngredient[],
    ingredientBun: {} as IIngredient,
    orderId: 123,
    isLoading: false,
    hasError: false,
    countIngredients: [] as TCountIngredients[],
  });
});

test("should move ingredient in burger constructor", () => {
  const previousState = {
    ingredientsCommon: [
      {
        _id: "test_id",
        name: "test_name",
        type: "sauce",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
        uuid: "123",
      },
      {
        _id: "test_id",
        name: "test_name1",
        type: "sauce",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
        uuid: "345",
      },
    ],
    ingredientBun: {} as IIngredient,
    orderId: 0,
    isLoading: false,
    hasError: false,
    countIngredients: [
      {
        id: "test_id",
        count: 2,
        type: "sauce",
      },
    ],
  };
  expect(
    reducer(previousState, moveCard({ dragIndex: 1, hoverIndex: 0 }))
  ).toEqual({
    ingredientsCommon: [
      {
        _id: "test_id",
        name: "test_name1",
        type: "sauce",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
        uuid: "345",
      },
      {
        _id: "test_id",
        name: "test_name",
        type: "sauce",
        calories: 1,
        proteins: 2,
        fat: 3,
        carbohydrates: 4,
        price: 5,
        image: "test_image",
        image_mobile: "test_image_mobile",
        image_large: "test_image_large",
        __v: 1,
        uuid: "123",
      },
    ],
    ingredientBun: {} as IIngredient,
    orderId: 0,
    isLoading: false,
    hasError: false,
    countIngredients: [
      {
        id: "test_id",
        count: 2,
        type: "sauce",
      },
    ],
  });
});
