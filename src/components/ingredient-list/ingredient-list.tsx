//libs
import React from "react";
import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
//styless
import style from "./ingredient-list.module.css";

interface IngredientProps {
  typeIng: string;
  dataImport: Array<any>;
  openDetails: (id: string) => void;
}

function IngredientList({ typeIng, dataImport, openDetails }: IngredientProps) {
  const clickHandler = (id: string) => (e: React.MouseEvent) => {
    openDetails(id);
  };

  return (
    <div className={`${style.itemList} mt-6 mb-10 pl-4 pr-4`}>
      {dataImport
        .filter((item) => item.type === typeIng)
        .map((data) => (
          <li
            className={`${style.card} mb-8`}
            key={data._id}
            value={data.name}
            onClick={clickHandler(data._id)}
          >
            <Counter count={1} size="default" />
            <img className={`${style.img}`} src={data.image} alt={data.name} />
            <div className={`${style.price} m-1`}>
              <p className="text text_type_digits-default pr-2">{data.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <div className={`${style.name} text text_type_main-default`}>
              {data.name}
            </div>
          </li>
        ))}
    </div>
  );
}

IngredientList.propTypes = {
  typeIng: PropTypes.string.isRequired,
  dataImport: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  openDetails: PropTypes.func.isRequired,
};

export default IngredientList;
