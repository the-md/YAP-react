import React from "react";
import styles from "./modal-overlay.module.css";

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose }) => {
  return (
      <div
        className={`${styles.modalOverlay}`}
        onClick={onClose}
        data-cy="modal-overlay"
      ></div>
  )
}

interface ModalOverlayProps {
  onClose: () => void
}
