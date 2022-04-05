//libs
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/close-icon";
//components
import ModalOverlay from "../modal-overlay/modal-overlay";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
//helpers
import { closeModal } from "../../services/modal-slice";
import { useAppDispatch, useAppSelector } from "../../services/app-hooks";
import {
  removeOrder,
  clearConstructor,
} from "../../services/burger-constructor-slice";
//styles
import style from "./modal.module.css";

function Modal() {
  const dispatch = useAppDispatch();
  const { isDetailsOpen, isSuccessOpen } = useAppSelector(
    (store) => store.modal
  );
  const isModalOpen = isDetailsOpen || isSuccessOpen;

  const closeOrderHandler = () => {
    dispatch(closeModal());
    dispatch(removeOrder());
    dispatch(clearConstructor());
  };
  const closeDetailsHandler = () => {
    dispatch(closeModal());
  };

  const handleEscPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (isDetailsOpen) {
        closeDetailsHandler();
      } else if (isSuccessOpen) {
        closeOrderHandler();
      }
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleEscPress);
    return () => document.removeEventListener("keydown", handleEscPress);
  });

  return createPortal(
    <>
      <ModalOverlay
        onClose={
          isDetailsOpen
            ? closeDetailsHandler
            : isSuccessOpen
            ? closeOrderHandler
            : () => console.log("Что-то пошло не так")
        }
        isModalOpen={isModalOpen}
      />
      <div
        className={`${
          !isModalOpen ? style.container_hidden : style.container
        } pl-10 pt-10 pr-10 pb-15`}
      >
        <div className={`${style.header}`}>
          <div className="title text text_type_main-large">
            {isDetailsOpen ? "Детали ингредиента" : ""}
          </div>
          <div className={style.close_icon}>
            <CloseIcon
              type="primary"
              onClick={
                isDetailsOpen
                  ? closeDetailsHandler
                  : isSuccessOpen
                  ? closeOrderHandler
                  : () => console.log("Что-то пошло не так")
              }
            />
          </div>
        </div>
        {isDetailsOpen ? (
          <IngredientDetails />
        ) : isSuccessOpen ? (
          <OrderDetails />
        ) : null}
      </div>
    </>,
    document.getElementById("modal")!
  );
}

export default React.memo(Modal);
