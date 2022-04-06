//libs
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//components
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Loader from "../loader/loader";
import FetchError from "../fetch-error/fetch-error";
//helpers
import { useAppSelector, useAppDispatch } from "../../services/app-hooks";
import { getIngredients } from "../../services/burger-ingredients-slice";
import { closeDetailsModal, closeOrderModal } from "../../services/modal-slice";
import { clearConstructor } from "../../services/burger-constructor-slice";
//styles
import style from "./app.module.css";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading, hasError } = useAppSelector(
    (store) => store.burgerIngredients
  );
  const { isDetailsOpen, isSuccessOpen } = useAppSelector(
    (store) => store.modal
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeDetailsModalHandler = () => {
    dispatch(closeDetailsModal());
  };
  const closeOrderModalHandler = () => {
    dispatch(closeOrderModal());
    dispatch(clearConstructor());
  };

  return (
    <>
      <AppHeader />
      <Modal
        title="Детали ингредиента"
        isModalOpen={isDetailsOpen}
        onClose={closeDetailsModalHandler}
        children={<IngredientDetails />}
      />
      <Modal
        onClose={closeOrderModalHandler}
        isModalOpen={isSuccessOpen}
        children={<OrderDetails />}
      />
      <main className={`${style.container}`}>
        {isLoading ? (
          <Loader />
        ) : hasError ? (
          <FetchError />
        ) : (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
    </>
  );
}

export default React.memo(App);
