//libs
import React from "react";
//styles
import style from "./modal-overlay.module.css";

interface ModalOverlayProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  isModalOpen,
  onClose,
}) => {
  return (
    <div
      className={!isModalOpen ? style.container_hidden : style.container}
      onClick={onClose}
    ></div>
  );
};

export default React.memo(ModalOverlay);
