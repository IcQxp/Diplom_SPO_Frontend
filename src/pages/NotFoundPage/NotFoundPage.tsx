import { useNavigate } from "react-router-dom"
import styles from "./NotFoundPage.module.scss"
import { Button } from "@mui/material"

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };
    return (
    <div className={styles.page}>
        <img src="/icons/notFound.svg"/>
        <p className={styles.title}>Страница не найдена            </p>
           
           <Button size="medium" variant="contained" onClick={handleClick} sx={{fontFamily:'var(--font-react)'}}>

        Вернуться на главную
           </Button>
    </div>
    )
}