import styles from "./modal-overlay.module.css";
import { ModalOverlayProps } from "../../../types";



const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose }) => {
  return (
      <div className={`${styles.modalOverlay}`} onClick={onClose}></div>
  )
}

export default ModalOverlay