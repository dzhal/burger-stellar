//libs
import PropTypes from "prop-types";
//styles
import style from "./modal-overlay.module.css";

interface ModalOverlayProps {
  isModalOpen: boolean;
  onClose: () => void;
}

function ModalOverlay({ isModalOpen, onClose }: ModalOverlayProps) {
  return (
    <div
      className={!isModalOpen ? style.containerHidden : style.container}
      onClick={onClose}
    ></div>
  );
}

ModalOverlay.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
