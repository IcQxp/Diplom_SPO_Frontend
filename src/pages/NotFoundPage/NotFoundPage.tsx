import { Link } from "react-router-dom"

export const NotFoundPage = () => {
    return(<>
    Такой страницы не существует
    <Link to={"/"}> На главную</Link>
    </>)
}