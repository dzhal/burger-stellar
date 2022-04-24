//libs
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
//helpers
import { openIngredientDetails } from "../../services/modal-slice";
import { IIngredient } from "../../@type/types";
import { useAppDispatch } from "../../services/app-hooks";
import Ingredient from "../ingredient/ingredient";
//styless
import style from "./ingredients-list.module.css";

interface IngredientProps {
  ingredients: IIngredient[];
}

function IngredientsList({ ingredients }: IngredientProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const clickHandler = (id: string) => () => {
    let detailedObject = ingredients.find((item) => item._id === id);
    if (detailedObject) {
      navigate(`ingredients/${detailedObject._id}`);
      dispatch(openIngredientDetails(detailedObject));
    }
  };

  return (
    <div className={`${style.itemList} mt-6 mb-10 pl-4 pr-4`}>
      {ingredients.map((data) => (
        <li key={data._id} value={data.name} onClick={clickHandler(data._id)}>
          <Ingredient data={data} />
        </li>
      ))}
    </div>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(
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
      uuid: PropTypes.string,
    })
  ).isRequired,
};

export default React.memo(IngredientsList);
