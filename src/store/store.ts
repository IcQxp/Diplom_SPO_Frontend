import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Импортируйте ваш редюсер

const store = configureStore({
    reducer: {
        user: userReducer, // Добавьте редюсер пользователя
    },
});

// Экспортируйте RootState
export type RootState = ReturnType<typeof store.getState>;

// Экспортируйте AppDispatch
export type AppDispatch = typeof store.dispatch;

// Экспортируйте store по умолчанию
export default store;