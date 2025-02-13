import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "./modal-overlay/modal-overlay.tsx";
import styles from "./modal.module.css";

export const Modal: React.FC<ModalProps> = ({title, children, onClose}) => {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    (
    <>
      <div className={`${styles.modal}`} onClick={onClose}>
        <div className={`pt-10 pl-10 pr-10 pb-15 text_type_main-default ${styles.modalContent}`} onClick={(e) => e.stopPropagation()}>
          <header className={`display-flex justify_content-space-between align_items-center ${styles.modalHeader}`}>
            <div className="text_type_main-large">{title}</div>
            <CloseIcon className="cursor-pointer" onClick={onClose} type="primary" />
          </header>
          <div className="text_align-center">{children}</div>
        </div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>
    ), document.getElementById("react-modals")!
  )
}

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void
}
