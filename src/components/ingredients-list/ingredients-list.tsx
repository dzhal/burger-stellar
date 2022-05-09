//libs
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const IngredientsList: React.FC<IngredientProps> = ({ ingredients }) => {
  const dispatch = useAppDispatch();
  let location = useLocation();
  const navigate = useNavigate();
  const clickHandler = (id: string) => () => {
    let detailedObject = ingredients.find((item) => item._id === id);
    if (detailedObject) {
      navigate(`ingredients/${detailedObject._id}`, {
        state: { backgroundLocation: location },
      });
      console.log(location.state);
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
};

export default React.memo(IngredientsList);
