import styles from "./modal-overlay.module.css";
import { ModalOverlayProps } from "../../../utils/types.ts";



const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose }) => {
  return (
      <div className={`${styles.modalOverlay}`} onClick={onClose}></div>
  )
}

export default ModalOverlay