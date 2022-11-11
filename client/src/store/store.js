import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { dataApi } from './api';

export const store = configureStore({
    reducer: {
        [dataApi.reducerPath]: dataApi.reducer,
        auth: authReducer
    },
    middleware: (getMiddleWare) =>
        getMiddleWare().concat(dataApi.middleware)
});