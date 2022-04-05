//libs
import React, { useCallback } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import { useDrop } from "react-dnd";
//components
import { CurrencyIcon } from "../../images/currency-custom";
import ConstructorItem from "../contructor-element/constructor-item";
//helpers
import { IIngredient } from "../../@type/types";
import { useAppDispatch, useAppSelector } from "../../services/app-hooks";
import { ingredientTypes } from "../../utils/ingredientTypes";
import {
  addIngredient,
  removeIngredient,
} from "../../services/burger-constructor-slice";
import { getOrderId } from "../../services/burger-constructor-slice";
import { openOrderSuccess } from "../../services/modal-slice";
//styles
import style from "./burger-constructor.module.css";

function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const { ingredientsCommon, ingredientBun } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const orderHandler = useCallback(() => {
    if (ingredientsCommon.length > 0) {
      const orderList: string[] = ingredientsCommon.map((item) => item._id);
      orderList.push(ingredientBun._id);
      dispatch(getOrderId(orderList));
      dispatch(openOrderSuccess());
    }
  }, [ingredientsCommon, ingredientBun._id, dispatch]);

  const removeHandler = (index: number) => {
    dispatch(removeIngredient(index));
  };
  const [, refDrop] = useDrop({
    accept: "ingredient",
    drop(data: IIngredient) {
      dispatch(addIngredient(data));
    },
  });
  return (
    <>
      <div className={`${style.container}`}>
        <div ref={refDrop} className={`${style.ingredient_list} mt-25 mb-10`}>
          <div className={`${style.ingredient_first_item}`}>
            {ingredientBun.type ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${ingredientBun.name} (верх)`}
                price={ingredientBun.price}
                thumbnail={ingredientBun.image}
              />
            ) : (
              <div className={`${style.top_bun} text text_type_main-default`}>
                Выберите булку
              </div>
            )}
          </div>
          {!ingredientsCommon.length ? (
            <div
              className={`${style.add_ingredient_text} text text_type_main-default`}
            >
              Добавьте начинку и соус на свой вкус
            </div>
          ) : (
            <div className={`${style.ingredient_sublist}`}>
              <ul>
                {ingredientsCommon.map(
                  (item, index) =>
                    item.type !== ingredientTypes.BUN && (
                      <li
                        className="pt-4"
                        key={Math.floor(Math.random() * 1000000)}
                      >
                        <ConstructorItem
                          item={item}
                          id={item._id}
                          index={index}
                          removeHandler={removeHandler}
                        />
                      </li>
                    )
                )}
              </ul>
            </div>
          )}
          <div className={`${style.ingredient_last_item}`}>
            {ingredientBun.type ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${ingredientBun.name} (низ)`}
                price={ingredientBun.price}
                thumbnail={ingredientBun.image}
              />
            ) : (
              <div
                className={`${style.bottom_bun} text text_type_main-default`}
              >
                Выберите булку
              </div>
            )}
          </div>
        </div>
        <div className={`${style.order} mr-4`}>
          <div className={`${style.total_price}`}>
            <div
              className={`${style.sum} text text_type_digits-medium mr-2 pr-4`}
            >
              {ingredientsCommon.reduce((sum, { price }) => sum + price, 0) +
                (ingredientBun.price ? ingredientBun.price * 2 : 0)}
            </div>
            <CurrencyIcon type="custom" size="big" />
          </div>
          <Button type="primary" size="medium" onClick={orderHandler}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
}

export default React.memo(BurgerConstructor);
