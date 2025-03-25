import styles from "./News.module.scss";

const newsData = [
  {
    id: 1,
    title: "Новая программа магистратуры",
    description:
      "Университет запускает новую программу магистратуры в области искусственного интеллекта.",
    date: "15 октября 2023",
    imageUrl: "/images/1.jpg",
  },
  {
    id: 2,
    title: "День открытых дверей",
    description:
      "Приглашаем будущих студентов на день открытых дверей, чтобы узнать больше о наших программах.",
    date: "20 октября 2023",
    imageUrl: "/images/2.jpg",
  },
  {
    id: 3,
    title: "Студенческая конференция",
    description:
      "Студенты представят свои научные работы на ежегодной конференции.",
    date: "25 октября 2023",
    imageUrl: "/images/3.jpg",
  },
  {
    id: 4,
    title: "Стипендии для аспирантов",
    description:
      "Объявлен конкурс на получение стипендий для аспирантов на 2024 год.",
    date: "1 ноября 2023",
    imageUrl: "/images/4.jpg",
  },
];

export const News = () => {
  return (
    <div id="news" className={styles.newsContainer}>
      <h2 className={styles.title}>Последние новости университета</h2>
      <div className={styles.newsList}>
        {newsData.map((item) => (
          <div key={item.id} className={styles.newsItem}>
            <img src={item.imageUrl} alt={item.title} className={styles.image} />
            <div className={styles.content}>
              <h3 className={styles.newsTitle}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.meta}>
                <span className={styles.date}>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};