// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '../auth/auth';

interface UserState {
  userInfo: UserResponse | null; // Начальное состояние
  isLoading: boolean;
}

const initialState: UserState = {
  userInfo: null,
  isLoading: false
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;