import React from 'react';
import styles from './Footer.module.scss';
import { useLocation } from 'react-router-dom';

export const Footer: React.FC = () => {

  const location = useLocation();
  if (location.pathname.toLowerCase() === '/auth') {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Логотип и краткое описание */}
        <div className={styles.about}>
          <h3 className={styles.logo}>MyUniversity</h3>
          <p>
            Университет передовых технологий — ваш путь к успеху! Мы готовим лучших специалистов будущего.
          </p>
        </div>

        {/* Контакты */}
        <div className={styles.contacts}>
          <h4>Контакты</h4>
          <ul>
            <li>Адрес: г. Белгород, ул. Университетская, д. 15</li>
            <li>Телефон: +7 (495) 123-45-67</li>
            <li>Email: info@myuniversity.ru</li>
          </ul>
        </div>

        {/* Полезные ссылки */}
        <div className={styles.links}>
          <h4>Полезные ссылки</h4>
          <ul>
            <li><a href="/about">О нас</a></li>
            <li><a href="/news">Новости</a></li>
            <li><a href="/events">Мероприятия</a></li>
            <li><a href="/support">Поддержка</a></li>
          </ul>
        </div>

        {/* Социальные сети */}
        <div className={styles.socials}>
          <h4>Социальные сети</h4>
          <div className={styles.socialIcons}>
            <a href="https://vk.com/" target="_blank" >
              <img src="/icons/socials/vk.png" alt="VK" />
            </a>
            <a href="https://t.me/" target="_blank" >
              <img src="/icons/socials/telegram.png" alt="Telegram" />
            </a>
            <a href="https://youtube.com/myuniversity" target="_blank" >
              <img src="/icons/socials/youtube.png" alt="youtube" />
            </a>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className={styles.copyright}>
        <p>&copy; 2025 MyUniversity. Все права защищены.</p>
        <p>
          Разработано с ❤️ командой{' '}
          <a href="https://vk.com" target="_blank">
            IcQxp
          </a>
        </p>
      </div>
    </footer>
  );
};   