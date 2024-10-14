import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusFilter: '',
  paymentTypeFilter: '',
  startDate: '',
  endDate: '',
  courseNameFilter: '',
  totalAmount: 0,
  paymentData: [0, 0, 0],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setPaymentTypeFilter: (state, action) => {
      state.paymentTypeFilter = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setCourseNameFilter: (state, action) => {
      state.courseNameFilter = action.payload;
    },
    setTotalAmount: (state, action) => { // Добавляем экшен setTotalAmount
      state.totalAmount = action.payload;
    },
    setPaymentData: (state, action) => { // Добавляем экшен setPaymentData
      state.paymentData = action.payload;
    },
  },
});

export const {
  setStatusFilter,
  setPaymentTypeFilter,
  setStartDate,
  setEndDate,
  setCourseNameFilter,
  setTotalAmount, // Экспортируем новый экшен
  setPaymentData, // Экспортируем новый экшен
} = filterSlice.actions;

export default filterSlice.reducer;