import { configureStore } from '@reduxjs/toolkit';
// import expenseReducer from './expense/expense.slice';
import { expenseApi } from './expense/expense.slice';
import { incomeApi } from './income/income.slice';

export const store = configureStore({
    reducer: {
        [expenseApi.reducerPath]: expenseApi.reducer,
        [incomeApi.reducerPath]: incomeApi.reducer,
    },
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(expenseApi.middleware).concat(incomeApi.middleware), 
});

// export const store = configureStore({
//     reducer: {
//         expense: expenseReducer
//     }
// });