import { configureStore } from '@reduxjs/toolkit';
import songsReducer from './songsSlice';

const store = configureStore({
  reducer: {
    songs: songsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
