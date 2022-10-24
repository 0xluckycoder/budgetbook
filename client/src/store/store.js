import { configureStore } from '@reduxjs/toolkit';
// import expenseReducer from './expense/expense.slice';
import { userAuthApi } from './user/user.slice';
import { expenseApi } from './expense/expense.slice';
import { incomeApi } from './income/income.slice';
import { financeAccountApi } from './financeAccount/financeAccount.slice';

export const store = configureStore({
    reducer: {
        [userAuthApi.reducerPath]: userAuthApi.reducer,
        [expenseApi.reducerPath]: expenseApi.reducer,
        [incomeApi.reducerPath]: incomeApi.reducer,
        [financeAccountApi.reducerPath]: financeAccountApi.reducer
    },
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(expenseApi.middleware).concat(incomeApi.middleware).concat(financeAccountApi.middleware).concat(userAuthApi.middleware), 
});

// export const store = configureStore({
//     reducer: {
//         expense: expenseReducer
//     }
// });