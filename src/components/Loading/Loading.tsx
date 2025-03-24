import { FC } from "react";
import styles from "./Loading.module.scss"
interface LoadingProps {
  size: number;
  block?: true
  type?: string
}

export const Loading: FC<LoadingProps> = ({ size, block, type }) => {
  if (type === "rating-3") {
    return (
      <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
        
      <div className={`${styles.loader} ${styles.rating}`}>
        <div className={styles.shimmer}></div>
      </div>
      <div className={`${styles.loader} ${styles.rating}`}>
      <div className={styles.shimmer}></div>
    </div>
    <div className={`${styles.loader} ${styles.rating}`}>
    <div className={styles.shimmer}></div>
  </div>
      </div>
    );
  }



  return (

    <>
      {!block ?
        <img src="/icons/load.svg" width={size} alt="loading" /> :
        <div className={`${styles.loader}`}>
          <div className={styles.shimmer}></div>
        </div>
      }
    </>
  )
}