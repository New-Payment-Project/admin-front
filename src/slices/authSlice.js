import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: !!localStorage.getItem('user'),  // Проверяем состояние при инициализации
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));  // Сохраняем пользователя в localStorage
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem('user');  // Удаляем пользователя из localStorage
      },
    },
  });
  
  export const { login, logout } = authSlice.actions;
  export default authSlice.reducer;  