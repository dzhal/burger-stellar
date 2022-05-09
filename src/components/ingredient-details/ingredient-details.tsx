//helpers
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/app-hooks";
import { openIngredientDetails } from "../../services/modal-slice";
//styles
import styles from "./ingredient-details.module.css";

function IngredientDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { detailedInfo } = useAppSelector((store) => store.modal);
  const { burgerIngredients } = useAppSelector(
    (store) => store.burgerIngredients
  );
  useEffect(() => {
    if (!detailedInfo._id) {
      let detailedObject = burgerIngredients.find((item) => item._id === id);
      if (detailedObject) {
        dispatch(openIngredientDetails(detailedObject));
      }
    }
  }, [dispatch, detailedInfo, id, burgerIngredients]);
  return (
    <div className={`${styles.container}`}>
      {detailedInfo && (
        <>
          <div className={styles.image}>
            <img src={detailedInfo.image_large} alt={detailedInfo.name} />
          </div>
          <span
            className={`${styles.name} text text_type_main-medium mt-4 mb-8`}
          >
            {detailedInfo.name}
          </span>
          <div className={`${styles.nutrition}`}>
            <div className={`${styles.nutritionItem} text_color_inactive`}>
              <span
                className={`${styles.detailsName} text text_type_main-default`}
              >
                Калории,ккал
              </span>
              <span
                className={`${styles.detailsValue} text_type_digits-default`}
              >
                {detailedInfo.calories}
              </span>
            </div>
            <div className={`${styles.nutritionItem} text_color_inactive`}>
              <span
                className={`${styles.detailsName} text text_type_main-default`}
              >
                Белки, г
              </span>
              <span
                className={`${styles.detailsValue} text_type_digits-default`}
              >
                {detailedInfo.proteins}
              </span>
            </div>
            <div className={`${styles.nutritionItem} text_color_inactive`}>
              <span
                className={`${styles.detailsName} text text_type_main-default`}
              >
                Жиры, г
              </span>
              <span
                className={`${styles.detailsValue} text_type_digits-default`}
              >
                {detailedInfo.fat}
              </span>
            </div>
            <div className={`${styles.nutritionItem} text_color_inactive`}>
              <span
                className={`${styles.detailsName} text text_type_main-default`}
              >
                Углеводы, г
              </span>
              <span
                className={`${styles.detailsValue} text_type_digits-default`}
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
