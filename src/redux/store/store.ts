import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../slice/authSlice';
import { destinationReducer } from '../slice/destinationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    destination: destinationReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
