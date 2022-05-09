//libs
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/close-icon";
//components
import ModalOverlay from "../modal-overlay/modal-overlay";
//styles
import style from "./modal.module.css";

interface IModal {
  children: React.ReactNode;
  title?: string;
  isModalOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<IModal> = ({ children, isModalOpen, title, onClose }) => {
  const handleEscPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscPress);
    return () => document.removeEventListener("keydown", handleEscPress);
  });

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} isModalOpen={isModalOpen} />
      <div
        className={`${
          !isModalOpen ? style.container_hidden : style.container
        } pl-10 pt-10 pr-10 pb-15`}
      >
        <div className={`${style.header}`}>
          <div className="title text text_type_main-large">
            {title ? title : ""}
          </div>
          <div className={style.close_icon}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        {children}
      </div>
    </>,
    document.getElementById("modal")!
  );
};

export default React.memo(Modal);
