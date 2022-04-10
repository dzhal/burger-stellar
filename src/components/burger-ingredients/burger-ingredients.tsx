//libs
import React, { useEffect, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInView } from "react-intersection-observer";
//components
import IngredientsList from "../ingredients-list/ingredients-list";
//helpers
import { ingredientTypes } from "../../utils/ingredientTypes";
import { setTab } from "../../services/burger-ingredients-slice";
import { useAppDispatch, useAppSelector } from "../../services/app-hooks";
//styles
import style from "./burger-ingredients.module.css";

function BurgerIngredients() {
  const dispatch = useAppDispatch();
  const { burgerIngredients, currentTab } = useAppSelector(
    (store) => store.burgerIngredients
  );
  const [bunRef, inViewBun] = useInView({ threshold: 0 });
  const [sauceRef, inViewSauce] = useInView({
    threshold: 0,
    rootMargin: "-400px",
  });
  const [mainRef, inViewMain] = useInView({
    threshold: 0,
    rootMargin: "-400px",
  });
  const scrollToCategory = (tab: string) => {
    document.getElementById(tab)?.scrollIntoView({ behavior: "smooth" });
  };
  const clickTabHandler = (tab: string) => {
    dispatch(setTab(tab));
    if (tab === ingredientTypes.BUN) {
      scrollToCategory(tab);
    } else if (tab === ingredientTypes.SAUCE) {
      scrollToCategory(tab);
    } else if (tab === ingredientTypes.MAIN) {
      scrollToCategory(tab);
    }
  };
  const bunIngredients = useMemo(
    () => burgerIngredients.filter((item) => item.type === ingredientTypes.BUN),
    [burgerIngredients]
  );
  const sauceIngredients = useMemo(
    () =>
      burgerIngredients.filter((item) => item.type === ingredientTypes.SAUCE),
    [burgerIngredients]
  );
  const mainIngredients = useMemo(
    () =>
      burgerIngredients.filter((item) => item.type === ingredientTypes.MAIN),
    [burgerIngredients]
  );

  useEffect(() => {
    if (inViewBun) {
      dispatch(setTab(ingredientTypes.BUN));
    } else if (inViewSauce) {
      dispatch(setTab(ingredientTypes.SAUCE));
    } else if (inViewMain) {
      dispatch(setTab(ingredientTypes.MAIN));
    }
  }, [inViewBun, inViewMain, inViewSauce, dispatch]);

  return (
    <>
      <section className={`${style.container}`}>
        <h1 className={`${style.title} text text_type_main-large mt-10 mb-5`}>
          Соберите бургер
        </h1>
        <div className={`${style.tabs}`}>
          <Tab
            value={ingredientTypes.BUN}
            active={currentTab === ingredientTypes.BUN}
            onClick={clickTabHandler}
          >
            Булки
          </Tab>
          <Tab
            value={ingredientTypes.SAUCE}
            active={currentTab === ingredientTypes.SAUCE}
            onClick={clickTabHandler}
          >
            Соусы
          </Tab>
          <Tab
            value={ingredientTypes.MAIN}
            active={currentTab === ingredientTypes.MAIN}
            onClick={clickTabHandler}
          >
            Начинки
          </Tab>
        </div>
        <section className={`${style.ingredientsList} mt-10`}>
          <h2
            ref={bunRef}
            id={ingredientTypes.BUN}
            className="text text_type_main-medium"
          >
            Булки
          </h2>
          <IngredientsList ingredients={bunIngredients} />
          <h2
            ref={sauceRef}
            id={ingredientTypes.SAUCE}
            className="text text_type_main-medium"
          >
            Соусы
          </h2>
          <IngredientsList ingredients={sauceIngredients} />
          <h2
            ref={mainRef}
            id={ingredientTypes.MAIN}
            className="text text_type_main-medium"
          >
            Начинки
          </h2>
          <IngredientsList ingredients={mainIngredients} />
        </section>
      </section>
    </>
  );
}

export default React.memo(BurgerIngredients);
