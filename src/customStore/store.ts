import { configureStore } from '@reduxjs/toolkit';
import userReducer  from './userSlice';

const store = configureStore({
  reducer: {
    notes: userReducer,
  },
});


// Types for Redux (optional but good for TS)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;

