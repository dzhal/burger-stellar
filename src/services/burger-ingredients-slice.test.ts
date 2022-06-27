import { AnyAction } from "redux";
import { IIngredient } from "../@type/types";
import { ingredientTypes } from "../utils/ingredientTypes";
import reducer, { setTab } from "./burger-ingredients-slice";

const previousState = {
  currentTab: ingredientTypes.BUN,
  burgerIngredients: [] as IIngredient[],
  isLoading: false,
  hasError: false,
};

test("should return the initial state", () => {
  expect(reducer(undefined, {} as AnyAction)).toEqual({
    currentTab: ingredientTypes.BUN,
    burgerIngredients: [] as IIngredient[],
    isLoading: false,
    hasError: false,
  });
});

test("should switch tab to SAUCE", () => {
  expect(reducer(previousState, setTab(ingredientTypes.SAUCE))).toEqual({
    currentTab: ingredientTypes.SAUCE,
    burgerIngredients: [] as IIngredient[],
    isLoading: false,
    hasError: false,
  });
});
test("should switch tab to MAIN", () => {
  expect(reducer(previousState, setTab(ingredientTypes.MAIN))).toEqual({
    currentTab: ingredientTypes.MAIN,
    burgerIngredients: [] as IIngredient[],
    isLoading: false,
    hasError: false,
  });
});
test("should switch tab to BUN", () => {
  expect(
    reducer(
      {
        ...previousState,
        currentTab: ingredientTypes.SAUCE,
      },
      setTab(ingredientTypes.BUN)
    )
  ).toEqual({
    currentTab: ingredientTypes.BUN,
    burgerIngredients: [] as IIngredient[],
    isLoading: false,
    hasError: false,
  });
});
