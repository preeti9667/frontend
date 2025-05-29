import { configureStore } from '@reduxjs/toolkit';
import dietReducer  from './userSlice';

const store = configureStore({
  reducer: {
    diet: dietReducer,
  },
});




export default store;

