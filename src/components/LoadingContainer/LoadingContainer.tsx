import styles from "./LoadingContainer.module.scss"
export const LoadingContainer = () => {


    return (
    <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    
    );
}