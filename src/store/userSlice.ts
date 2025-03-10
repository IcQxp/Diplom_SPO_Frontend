// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '../auth/auth';

interface UserState {
    userInfo: UserResponse | null; // Начальное состояние
}

const initialState: UserState = {
    userInfo: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserResponse>) => {
            state.userInfo = action.payload; // Установка пользователя
        },
        clearUser: (state) => {
            state.userInfo = null; // Очистка пользователя
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;