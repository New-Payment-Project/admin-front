import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import filterSlice from './slices/filterSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterSlice
  },
});

export default store;