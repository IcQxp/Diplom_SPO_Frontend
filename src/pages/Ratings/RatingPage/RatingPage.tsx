
import { useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel, Typography, Card, CardContent, Link } from "@mui/material";
import styles from "./RatingPage.module.scss";
import { getTopRatingWithCriteriaArray, getAllCritea } from "../../../api/api-utils";
import { ResponsiveBar } from "@nivo/bar";
import { convert } from "../../../models";
import { ResponsiveRadar } from "@nivo/radar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LibraryBooks, ModeEdit } from "@mui/icons-material";

interface Criterion {
  criteriaId: number;
  name: string;
}

interface RatingResponse {
  data: any[];
  keys: string[];
}

export const RatingPage = () => {
const location = useLocation();
console.log(location)
if (location.pathname.toLowerCase()!="/rating" && location.pathname.toLowerCase()!="/rating/")
return  <Outlet/>;


  const [rating, setRating] = useState<RatingResponse | null>(null);
  const [ratingBar, setRatingBar] = useState<RatingResponse | null>(null);
  const [ratingRadar, setRatingRadar] = useState<RatingResponse | null>(null);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [selectedCriteriaIds, setSelectedCriteriaIds] = useState<number[]>([]); // Массив ID выбранных критериев
  const [studentCount, setStudentCount] = useState<number>(5);

  const navigate = useNavigate();
  // Загрузка всех критериев при монтировании компонента
  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const criteriaResponse = await getAllCritea();
        setCriteria(criteriaResponse.data);
        handleUpdate();
      } catch (error) {
        console.error("Ошибка при загрузке критериев:", error);
      }
    };

    fetchCriteria();
  }, []);

  // Обработчик изменения состояния чекбокса
  const handleCheckboxChange = (criterionId: number) => {
    if (selectedCriteriaIds.includes(criterionId)) {
      setSelectedCriteriaIds(selectedCriteriaIds.filter((id) => id !== criterionId));
    } else {
      setSelectedCriteriaIds([...selectedCriteriaIds, criterionId]);
    }
  };

  // Обработчик изменения количества студентов
  const handleStudentCountChange = (event: any) => {
    const count = parseInt(event.target.value, 10);
    setStudentCount(count);
  };

  // Функция для обновления данных по нажатию кнопки
  const handleUpdate = async () => {
    try {
      const ratingResponse = await getTopRatingWithCriteriaArray({
        count: studentCount,
        criteriaIDs: selectedCriteriaIds, // Передаём массив ID выбранных критериев
      });
      setRating(ratingResponse.data);
      setRatingRadar({
        ...ratingResponse.data,
        keys: ratingResponse.data.keys.map((keyObj: any) => Object.values(keyObj)[0]), // Преобразование keys
      });

      setRatingBar(
        convert({
          ...ratingResponse.data,
          keys: ratingResponse.data.keys.map((keyObj: any) => Object.values(keyObj)[0]), // Преобразование keys
        })
      );
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    }
  };


  const calculateTotalScores = () => {
    if (!rating) return [];

    const totalScores = rating.keys.map((keyObj) => {
      const studentName = Object.values(keyObj)[0];
      const totalScore = rating.data.reduce((sum, item) => sum + (item[studentName] || 0), 0);
      return {
        name: studentName,
        score: totalScore,
      };
    });

    return totalScores.sort((a, b) => b.score - a.score); // Сортируем по убыванию баллов
  };

  const totalScores = calculateTotalScores();
  return (
    <Box className={styles.page} sx={{ width: "100%", padding: "20px" }}>
      <Typography variant="h4" gutterBottom sx={{color:"#000"}}>
        Рейтинг студентов
      </Typography>

      {/* Настройки */}
      <Box sx={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
        {/* Выбор количества студентов */}
        <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }}>
          <InputLabel>Количество студентов</InputLabel>
          <Select value={studentCount} label="Количество студентов" onChange={handleStudentCountChange}>
            {[1,2,3,5, 10].map((count) => (
              <MenuItem key={count} value={count}>
                {count}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Кнопка обновления */}
        <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ width: { xs: "100%", sm: "auto" } }}>
          Обновить
        </Button>
      </Box>

      {/* Основной контент: выбор критериев и радар справа */}
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: { xs: "column", sm: "row" }, // Изменяем направление в зависимости от ширины экрана
          marginBottom: "20px",
        }}
      >
        {/* Выбор критериев */}
        <Box
          sx={{
            display:"flex",
            flexDirection:"column",
            flex: 1,
            maxHeight: "400px", // Ограничение высоты
            overflowY: "auto", // Добавление скролла
            border: "1px solid #ccc", // Дополнительная граница для визуального разделения
            padding: "10px",
            borderRadius: "4px",
            width: { xs: "100%", sm: "50%" }, // Ширина зависит от размера экрана
          }}
        >
          <Typography variant="subtitle1">Выберите критерии:</Typography>
          {criteria.map((criterion) => (
            <FormControlLabel
              key={criterion.criteriaId}
              control={
                <Checkbox
                  checked={selectedCriteriaIds.includes(criterion.criteriaId)}
                  onChange={() => handleCheckboxChange(criterion.criteriaId)}
                />
              }
              label={criterion.name}
            />
          ))}
        </Box>

        {/* Радарный график */}
        {ratingRadar && (
          <Box
          
            sx={{
              height: "700px", // Явно указываем высоту с единицей измерения
              width: { xs: "100%", sm: "50%" }, // Ширина зависит от размера экрана
              maxWidth: "100%", // Ограничение максимальной ширины
              maxHeight: "700px",
              position: "relative", // Обеспечиваем правильное позиционирование
              overflow: "hidden", // Скрываем всё, что выходит за пределы контейнера
            }}
          >

            <ResponsiveRadar
              data={ratingRadar.data}
              keys={ratingRadar.keys}
              indexBy="criteria"
              margin={{ top: 20, right: 80, bottom: 0, left: 100 }}
              colors={{ scheme: "accent" }}
              dotSize={8}
              dotColor={{ theme: "background" }}
              dotBorderWidth={2}
              maxValue={"auto"}
              fillOpacity={0.25}
              animate={true} // Анимация для плавного отображения
      motionConfig="gentle"
      theme={{
        axis: {
          ticks: {
            text: {
              fontSize: 12, // Размер шрифта
              fill: "#333", // Цвет текста
              whiteSpace: "wrap", // Перенос текста
              wordWrap: "break-word", // Разрыв слов
            },
          },
        },
      }}
      legends={[
        {
            anchor: 'top-left',
            direction: 'column',
            translateX: -100,
            translateY: 0,
            itemWidth: 80,
            itemHeight: 14,
            itemTextColor: '#666',
            symbolSize: 10,
            symbolShape: 'circle',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000'
                    }
                }
            ]
        }
    ]}
    gridLabelOffset={0}
              />
          </Box>
        )}
      </Box>

      {/* Столбчатая диаграмма */}
      {ratingBar && (
        <Box
          sx={{
            width: "100%", // Контейнер занимает всю доступную ширину
            overflowX: "scroll", // Добавляем горизонтальный скролл
            marginTop: "20px", // Отступ сверху
          }}
        >
        <div
            style={{
              minWidth: `${ratingBar.data.length * 140}px` , // Устанавливаем фиксированную ширину для графика
              height: "400px", // Фиксированная высота
              paddingBottom: "20px"
            }}
          >
          <ResponsiveBar
            data={ratingBar.data}
            keys={ratingBar.keys}
            indexBy="criteria"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ scheme: "accent" }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Студенты",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Баллы",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            />
            </div>
        </Box>
      )}

      
      {totalScores.length > 0 && (
        <Box sx={{ marginTop: "40px" }}>
          <Typography variant="h5" gutterBottom sx={{ color: "#000" }}>
            Итоги рейтинга
          </Typography>
          <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {totalScores.map(({ name, score }, index) => {
              // Ищем ID студента в массиве keys
              const keyObj = rating?.keys.find((keyObj) => Object.values(keyObj)[0] === name);
              const studentId = keyObj ? Object.keys(keyObj)[0] : null;

              if (!studentId) {
                console.error(`ID студента "${name}" не найден`);
                return null;
              }

              // Формируем ссылку на профиль
              const profileLink = `http://localhost:5173/profile/${studentId}`;

              // Определяем стили для карточек
              let cardStyle = {};
              if (index === 0) {
                cardStyle = { backgroundColor: "#FFD700", borderColor: "#FFD700" }; // Золотой цвет для первого места
              } else if (index < 3) {
                cardStyle = { backgroundColor: "#C0C0C0", borderColor: "#C0C0C0" }; // Серебряный цвет для второго и третьего места
              }

              return (
                <Link href={profileLink} target="_blank" rel="noopener noreferrer" underline="none" key={name}>
                  <Card
                    sx={{
                      width: "200px",
                      boxShadow: 3,
                      border: "2px solid transparent",
                      ...cardStyle,
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                        {name}
                      </Typography>
                      <Typography variant="body1" sx={{ marginTop: "10px", textAlign: "center" }}>
                        Итоговый балл: {score}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </Box>
        </Box>
      )}
      {rating&& <Box sx={{marginTop:"30px",display:"flex",flexDirection:"row",gap:"15px"}}>
      <Button startIcon={<ModeEdit/>} variant="contained" size="medium" onClick={()=>{navigate("/rating/report",{state:{ rating:rating}})}}>
        Сформировать отчет
      </Button>
      <Button startIcon={<LibraryBooks/>}  variant="contained" size="medium" onClick={()=>{navigate("/rating/docs")}}>
        Перейти к проверке документов
      </Button>
      </Box>
      }
    </Box>
  );
};