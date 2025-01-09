import React from "react";
import { ModalOverlayProps } from "../../../utils/types.ts";
import styles from "./modal-overlay.module.css";

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose }) => {
  return (
      <div className={`${styles.modalOverlay}`} onClick={onClose}></div>
  )
}