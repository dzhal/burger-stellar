//helpers
import React from "react";
import { useAppSelector } from "../../services/app-hooks";
//styles
import style from "./ingredient-details.module.css";

function IngredientDetails() {
  const { detailedInfo } = useAppSelector((store) => store.modal);

  return (
    <div className={`${style.container}`}>
      {detailedInfo && (
        <>
          <div className={style.image}>
            <img src={detailedInfo.image_large} alt={detailedInfo.name} />
          </div>
          <span
            className={`${style.name} text text_type_main-medium mt-4 mb-8`}
          >
            {detailedInfo.name}
          </span>
          <div className={`${style.nutrition}`}>
            <div className={`${style.nutritionItem} text_color_inactive`}>
              <span
                className={`${style.detailsName} text text_type_main-default`}
              >
                Калории,ккал
              </span>
              <span
                className={`${style.detailsValue} text_type_digits-default`}
              >
                {detailedInfo.calories}
              </span>
            </div>
            <div className={`${style.nutritionItem} text_color_inactive`}>
              <span
                className={`${style.detailsName} text text_type_main-default`}
              >
                Белки, г
              </span>
              <span
                className={`${style.detailsValue} text_type_digits-default`}
              >
                {detailedInfo.proteins}
              </span>
            </div>
            <div className={`${style.nutritionItem} text_color_inactive`}>
              <span
                className={`${style.detailsName} text text_type_main-default`}
              >
                Жиры, г
              </span>
              <span
                className={`${style.detailsValue} text_type_digits-default`}
              >
                {detailedInfo.fat}
              </span>
            </div>
            <div className={`${style.nutritionItem} text_color_inactive`}>
              <span
                className={`${style.detailsName} text text_type_main-default`}
              >
                Углеводы, г
              </span>
              <span
                className={`${style.detailsValue} text_type_digits-default`}
              >
                {detailedInfo.carbohydrates}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(IngredientDetails);
