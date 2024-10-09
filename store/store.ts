import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import languageSlice from './languageSlice';
import { FetchProductApi } from './Products/GetProductsApi';
import { RegisterApi } from './Register/RegisterApi';
import { LoginApi } from './Register/LoginApi';
import { FetchImagesApi } from './Products/FetchImagesApi';
import { FetchDetailsApi } from './Products/FetchDetailsApi';
import { FetchReviewApi } from './Products/FetchReviewApi';
import { FetchSupplementApi } from './Products/FetchSupplementApi';
import { FetchTourIncludingApi } from './Products/FetchTourIncludingApi';
import { FetchPolicyApi } from './Products/FetchPolicyApi';
import { VerifyEmailApi } from './Register/VerifyEmailApi';

export const store = configureStore({
    reducer: {
        language: languageSlice,
        [FetchProductApi.reducerPath]: FetchProductApi.reducer,
        [RegisterApi.reducerPath]: RegisterApi.reducer,
        [LoginApi.reducerPath]: LoginApi.reducer,
        [FetchImagesApi.reducerPath]: FetchImagesApi.reducer,
        [FetchDetailsApi.reducerPath]: FetchDetailsApi.reducer,
        [FetchReviewApi.reducerPath]: FetchReviewApi.reducer,
        [FetchSupplementApi.reducerPath]: FetchSupplementApi.reducer,
        [FetchTourIncludingApi.reducerPath]: FetchTourIncludingApi.reducer,
        [FetchPolicyApi.reducerPath]: FetchPolicyApi.reducer,
        [VerifyEmailApi.reducerPath]: VerifyEmailApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(FetchProductApi.middleware)
            .concat(RegisterApi.middleware)
            .concat(LoginApi.middleware)
            .concat(FetchImagesApi.middleware)
            .concat(FetchDetailsApi.middleware)
            .concat(FetchReviewApi.middleware)
            .concat(FetchSupplementApi.middleware)
            .concat(FetchTourIncludingApi.middleware)
            .concat(FetchPolicyApi.middleware)
            .concat(VerifyEmailApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
