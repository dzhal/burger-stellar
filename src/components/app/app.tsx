//libs
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//components
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import Loader from "../loader/loader";
import FetchError from "../fetch-error/fetch-error";
//helpers
import { useAppSelector, useAppDispatch } from "../../services/app-hooks";
import { getIngredients } from "../../services/burger-ingredients-slice";
//styles
import style from "./app.module.css";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading, hasError } = useAppSelector(
    (store) => store.burgerIngredients
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Modal />
      <main className={`${style.container}`}>
        {isLoading ? (
          <Loader />
        ) : hasError ? (
          <FetchError />
        ) : (
          <DndProvider backend={HTML5Backend}>
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          </DndProvider>
        )}
      </main>
    </>
  );
}

export default React.memo(App);
