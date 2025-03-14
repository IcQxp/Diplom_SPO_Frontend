import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.scss";
import { UserResponse } from "../../auth/auth";
import { MyDocuments } from "../../components/MyDocuments/MyDocuments";
import { ResponsiveRadar } from "@nivo/radar";
import { getAllCritea, getUserRating } from "../../api/api-utils";

export const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [currentUser, setCurrentUser] = useState<UserResponse>();
  const [userRating, setUserRating] = useState();
  const [criteriaKeys, setCriteriaKeys] = useState();


  useEffect(() => {
    const GetRating = async () => {
      if (user) {
        const rating = await getUserRating(user?.id)
        console.log(rating.ratings);
        console.log("рейтинг");
          console.log(rating.ratings);
        console.log(criteriaKeys);
        console.log("критерии"+criteriaKeys);


        const categories = await getAllCritea();
        setCriteriaKeys([rating.userName])
        console.log("категории"+categories);
        setUserRating(rating.ratings);
      }
    }

    GetRating();
  }, [])

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/auth");
    }
  }, [user, navigate]);

  const data = [
    {
      taste: 'fruity',
      chardonay: 50,
      carmenere: 64,
      syrah: 31,
    },
    {
      taste: 'bitter',
      chardonay: 39,
      carmenere: 87,
      syrah: 38,
    },
    {
      taste: 'heavy',
      chardonay: 90,
      carmenere: 116,
      syrah: 58,
    },
    {
      taste: 'strong',
      chardonay: 23,
      carmenere: 101,
      syrah: 79,
    },
    {
      taste: 'sunny',
      chardonay: 95,
      carmenere: 60,
      syrah: 45,
    },
  ];

  // Ключи для отображения данных
  const keys = ['chardonay', 'carmenere', 'syrah'];


  return (
    <main className={styles.page}>
      {currentUser ?
        <div>ооо
          <MyDocuments id={currentUser.id} />

          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveRadar
              data={userRating||[]} // Данные для диаграммы
              keys={["Ляшов"]} // Ключи для отображения данных
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


        </div> : <>нет</>}
    </main>
  );
};