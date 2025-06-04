
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import styles from "./Profile.module.scss";
import { DocumentsTable } from "../../components/MyDocuments/DocumentsTable";
import { ResponsiveRadar } from "@nivo/radar";
import { getPostUserRating, getUserByID} from "../../api/api-utils";
import { Student } from "../../models";
import { nivoDiagramm } from "../../components/Ratings/RatingWithArray";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import {FileUpload} from "../../components/FileUpload/FileUpload";

export const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<Student | null>(null);
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [userRating, setUserRating] = useState<nivoDiagramm>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // Состояние для управления popup


  useEffect(() => {
    const fetchUserData = async () => {
      if (!username || username.trim() === "") {
        setLoading(false);
        return;
      }

      try {
        // Получаем данные пользователя по его ID или имени пользователя
        const fetchedUserData = await getUserByID(username);
        const rating = (await getPostUserRating([Number(fetchedUserData.data.studentId)])).data;
        setUserData(fetchedUserData.data);
        setUserRating(rating);
        // setCriteriaKeys(Object.keys(rating.data.ratings[0] || {}));
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorText}>User not found</div>
      </div>
    );
  }
  return (
    <main className={styles.mainContainer}>
      {/* Личная информация студента */}
      <section className={styles.section}>
        <h1 className={styles.personalInfoTitle}>{userData.lastname} {userData.firstname} {userData.patronymic}</h1>
        <div className={styles.grid}>
          <div>
            <p className={styles.personalInfoText}>
              <strong>Дата рождения:</strong> {userData.birthDate}
            </p>
            <p className={styles.personalInfoText}>
              <strong>Пол:</strong> {userData.genderCode.toLowerCase() === "м" ? "Мужской" : "Женский"}
            </p>
          </div>
          <div>
            <p className={styles.personalInfoText}>
              <strong>Группа:</strong> {userData.group?.groupNumber || "Не указана"}
            </p>
          </div>
        </div>
      </section>

      {/* Таблица документов (если пользователь просматривает свой профиль) */}
      {user?.id === userData.studentId && user.roleId==0 && (
        <section className={styles.section}>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"20px"}}>

          <h2 className={styles.documentsSectionTitle}>Мои документы</h2>
          <Button size="medium" variant="contained" onClick={() => setIsPopupOpen(true)}>Добавить</Button>
          </div>
          <DocumentsTable id={userData.studentId} />
        </section>
      )}
      {/* Popup для загрузки файла */}
      <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <DialogTitle>Загрузка документа</DialogTitle>
        <DialogContent>
          <FileUpload onClose={() => setIsPopupOpen(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPopupOpen(false)}>Отмена</Button>
        </DialogActions>
      </Dialog>

      {/* Рейтинг студента */}
      {userRating && (
        <section className={styles.section}>
          <h2 className={styles.ratingSectionTitle}>Статистика</h2>
          <h3>Всего баллов: 
            
          {userRating.data
            .flatMap(elem => Object.values(elem))
            .filter(value => typeof value === 'number')
            .reduce((acc, curr) => acc + curr, 0)}
           
            </h3> 
          <div className={styles.ratingChartContainer}>
            
            <ResponsiveRadar
              data={userRating?.data || []}
                           keys={userRating?.keys || []}
              indexBy="criteria"
              maxValue="auto"
              margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
              borderColor={{ from: "color" }}
              gridLabelOffset={36}
              dotSize={10}
              dotColor={{ theme: "background" }}
              dotBorderWidth={2}
              colors={{ scheme: "category10" }}
              blendMode="multiply"
              motionConfig="wobbly"
              legends={[
                {
                  anchor: "top-left",
                  direction: "column",
                  translateX: -50,
                  translateY: -40,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: "#999",
                  symbolSize: 12,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </section>
      )}
    </main>
  );
};