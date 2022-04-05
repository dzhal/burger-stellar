//libs
import PropTypes from "prop-types";
import React from "react";
//styles
import style from "./modal-overlay.module.css";

interface ModalOverlayProps {
  isModalOpen: boolean;
  onClose: () => void;
}

function ModalOverlay({ isModalOpen, onClose }: ModalOverlayProps) {
  return (
    <div
      className={!isModalOpen ? style.container_hidden : style.container}
      onClick={onClose}
    ></div>
  );
}

ModalOverlay.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(ModalOverlay);
