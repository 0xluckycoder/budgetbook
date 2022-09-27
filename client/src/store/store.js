import { configureStore } from '@reduxjs/toolkit';
// import expenseReducer from './expense/expense.slice';
import { expenseApi } from './expense/expense.slice';

export const store = configureStore({
    reducer: {
        [expenseApi.reducerPath]: expenseApi.reducer,
    },
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(expenseApi.middleware), 
});

// export const store = configureStore({
//     reducer: {
//         expense: expenseReducer
//     }
// });