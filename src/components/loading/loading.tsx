import React from "react";
import styles from './loading.module.css';

export const Loading: React.FC<LoadingProps> = ({container}) => {
  return (
    <div className={`${container ? 'container' : ''} display-flex`}>
      <div className={`${container ? styles.loaderContainerHeight : styles.loaderContainer} display-flex justify_content-center align_items-center`}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  )
}
interface LoadingProps {
  container?: boolean
}