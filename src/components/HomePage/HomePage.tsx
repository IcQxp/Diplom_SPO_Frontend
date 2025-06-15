
import { getAllCritea, getTopRatingWithCriteriaArray } from "../../api/api-utils";
import { Button } from "@mui/material";
import { FC, useEffect, useState } from "react"
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss"
import { BarChart } from "@mui/icons-material"
import { Loading } from "../Loading/Loading";
import { News } from "../News/News";
import { Criterion } from "../../models";


interface DataItem {
  criteria: string; // Название критерия
  [key: string]: number | string; // Динамические ключи (имена студентов) с числовыми значениями
}

export interface ChartResponse {
  keys: Array<{ [key: string]: string }>; // Массив объектов с ключами-идентификаторами пользователей
  data: DataItem[]; // Массив объектов с данными
}

export const HomePage: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [rating, setRating] = useState<ChartResponse>();


  useEffect(() => {
    const FD = async () => {
      try {
        const criteriaResponse: Criterion[] = (await getAllCritea()).data;
        const response = await getTopRatingWithCriteriaArray({ count: 3, criteriaIDs: criteriaResponse.map(item => item.criteriaId) });
        console.log(response);
        setRating(response.data);
      }
      catch (error) {
        console.warn("Ошибка при получении данных:", error);
      }
      finally {
        setLoading(false);
      }
    }
    FD()
  }, [])

  const calculateRatings = () => {
    if (!rating) return [];

    const studentRatings: { name: string; id: number; totalScore: number; }[] = [];

    // Проходим по каждому объекту в rating.keys
    rating.keys.forEach((keyObj) => {
      // Получаем id (ключ объекта) и имя (значение)
      const id = parseInt(Object.keys(keyObj)[0]); // "3" -> 3
      const name = keyObj[id]; // значение по id

      // Считаем общую сумму баллов по всем критериям
      const totalScore = rating.data.reduce((sum, dataItem) => {
        const score = dataItem[name];
        return sum + (typeof score === "number" ? score : 0);
      }, 0);

      // Добавляем данные в массив
      studentRatings.push({
        name,
        id,
        totalScore,
      });
    });

    // Сортируем по убыванию рейтинга
    return studentRatings.sort((a, b) => b.totalScore - a.totalScore);
  };

  const sortedStudents = calculateRatings();


  return (
    <div className={styles.container}>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <h2 className={styles.top__title}>
          Наши лучшие студенты
        </h2>
        {loading ? (
          <Loading size={20} type="rating-3" />
        ) : sortedStudents.length > 0 ? (
          sortedStudents.map(({ name, totalScore, id }, index) => (
            <Link to={`/profile/${id}`} key={name} className={styles.link}>
              <h2 style={{ margin: 0, color: index === 0 ? "#ff9800" : "#333" }}>
                #{index + 1} {name}
              </h2>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                Общее кол-во баллов: <strong>{totalScore}</strong>
              </p>
            </Link>
          ))
        ) : (
          <div>ПУСТО</div>
        )}
      </div>
      <Button startIcon={<BarChart />} variant="contained" size="medium" onClick={() => { navigate("/rating") }} sx={{ margin: "20px 40px" }}>
        Перейти к рейтингу
      </Button>
      <News />
    </div>
  )
}