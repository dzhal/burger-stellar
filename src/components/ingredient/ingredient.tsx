import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { IIngredient } from "../../@type/types";
import { useAppSelector } from "../../services/app-hooks";
import styles from "./ingredient.module.css";

interface IngredientProps {
  data: IIngredient;
}

function Ingredient({ data }: IngredientProps) {
  const { countIngredients } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const count = countIngredients.find((item) => item.id === data._id)?.count;
  const [{ isDrag }, refDrag] = useDrag({
    type: "ingredient",
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <div
      className={isDrag ? `${styles.card_on_drag} mb-8` : `${styles.card} mb-8`}
      ref={refDrag}
    >
      {count ? <Counter count={count} size="default" /> : ""}
      <img className={`${styles.img}`} src={data.image} alt={data.name} />
      <div className={`${styles.price} m-1`}>
        <p className="text text_type_digits-default pr-2">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.name} text text_type_main-default`}>
        {data.name}
      </div>
    </div>
  );
}

Ingredient.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    uuid: PropTypes.string,
  }),
};

export default React.memo(Ingredient);
