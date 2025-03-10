import {  useParams } from "react-router-dom";

export const DocumentPage = () => {
  const { id } = useParams(); // Получаем параметр id из URL

  return (
    <div>
      <h1>Document Page</h1>
      <p>Document ID: {id}</p>
    </div>
  );
}