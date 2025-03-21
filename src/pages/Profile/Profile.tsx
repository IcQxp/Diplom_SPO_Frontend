import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Profile.module.scss";
import { UserResponse } from "../auth/auth";
import { DocumentsTable } from "../../components/MyDocuments/DocumentsTable";
import { ResponsiveRadar } from "@nivo/radar";
import { getAllCritea, getUserByID, getUserRating } from "../../api/api-utils";
import { Student } from "../../models";

export const Profile = () => {

  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<Student | null>(null);


  console.log("userlogin: " + username)
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [currentUser, setCurrentUser] = useState<UserResponse>();
  const [userRating, setUserRating] = useState();
  const [criteriaKeys, setCriteriaKeys] = useState<string[]>();
  const [Loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const GetRating = async () => {
      
      if (username == undefined || username.trim() == "") {
        setLoading(false);
        return;
      }
      if (!isNaN(Number(username))) {
        try {
          const rating = await getUserRating(Number(username));
          const fetchedUserData = await getUserByID(username);
          // const categories = await getAllCritea();
          setUserData(fetchedUserData.data);
          setCriteriaKeys([rating.data.userName])
          setUserRating(rating.data.ratings);
          setLoading(false);
        }
        catch (ex) {
          console.error("Ошибка при получении рейтинга пользователя:", ex);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    GetRating();
  }, [username])


  // useEffect(() => {
  //   const fetchUserData = async () => {
  //       try {
  //         const fetchedUserData = await getUserByID(username);
  //         setUserData(fetchedUserData);
  //       } catch (error) {
  //         console.error("Ошибка при загрузке данных пользователя:", error);
  //       }
     
  //   };

  //   fetchUserData();
  // }, [username, user]);


  // useEffect(() => {
  //   if (user) {
  //     setCurrentUser(user);
  //   } 
  // }, [user]);

  // 


  return (
    <main className={styles.page}>
      {Loading && <>Loading</>}
      {userRating == null && <>NotFound</>}
      {!Loading && userData?.studentId &&
        <div>
          {user?.id==userData?.studentId&&
          <DocumentsTable id={userData.studentId} />
          }

          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveRadar
              data={userRating || []} // Данные для диаграммы
              keys={criteriaKeys && criteriaKeys || []} // Ключи для отображения данных
              // keys = {[]} //Фамилии например, объекты с характеристиками
              indexBy="criteria" // Поле, используемое как индекс (метки осей)
              valueFormat=">-.2f" // Формат отображения значений
              margin={{ top: 70, right: 80, bottom: 40, left: 80 }} // Отступы
              borderColor={{ from: 'color' }} // Цвет границ
              gridLabelOffset={36} // Смещение меток сетки
              dotSize={10} // Размер точек
              dotColor={{ theme: 'background' }} // Цвет точек
              dotBorderWidth={2} // Ширина границ точек
              colors={{ scheme: 'nivo' }} // Цветовая схема
              blendMode="multiply" // Режим наложения цветов
              motionConfig="wobbly" // Анимация
              legends={[
                {
                  anchor: 'top-left', // Расположение легенды
                  direction: 'column', // Направление элементов легенды
                  translateX: -50, // Смещение по X
                  translateY: -40, // Смещение по Y
                  itemWidth: 80, // Ширина элемента легенды
                  itemHeight: 20, // Высота элемента легенды
                  itemTextColor: '#999', // Цвет текста легенды
                  symbolSize: 12, // Размер символа легенды
                  symbolShape: 'circle', // Форма символа
                  effects: [
                    {
                      on: 'hover', // Эффект при наведении
                      style: {
                        itemTextColor: '#000', // Изменение цвета текста
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </div> }
    </main>
  );
};