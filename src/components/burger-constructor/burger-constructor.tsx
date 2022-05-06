//libs
import React, { useCallback } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
//components
import { CurrencyIcon } from "../../images/currency-custom";
import ConstructorItem from "../contructor-item/constructor-item";
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn, accessToken } = useAppSelector((state) => state.auth);
  const { ingredientsCommon, ingredientBun } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const canOrder = ingredientsCommon.length > 0 && ingredientBun;
  const orderHandler = useCallback(() => {
    if (!isLoggedIn) navigate("/login");
    if (isLoggedIn && ingredientsCommon.length > 0) {
      const orderList: string[] = ingredientsCommon.map((item) => item._id);
      if (ingredientBun._id) {
        orderList.push(ingredientBun._id);
        orderList.push(ingredientBun._id);
      }

      dispatch(
        getOrderId({
          ingredients: orderList,
          accessToken: accessToken,
        })
      );
      dispatch(openOrderSuccess());
    }
  }, [
    ingredientsCommon,
    ingredientBun,
    isLoggedIn,
    accessToken,
    dispatch,
    navigate,
  ]);

  const removeHandler = (uuid: string) => {
    dispatch(removeIngredient(uuid));
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
                      <li className="pt-4" key={item.uuid}>
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
          <Button
            disabled={canOrder ? false : true}
            type="primary"
            size="medium"
            onClick={orderHandler}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
}

export default React.memo(BurgerConstructor);
