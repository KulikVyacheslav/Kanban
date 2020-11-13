import {configureStore, getDefaultMiddleware, combineReducers} from '@reduxjs/toolkit';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {useDispatch} from 'react-redux';
import {
    listReducer,
    cardsReducer,
    commentsReducer,
    profileReducer
} from './ducks';


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['comments']
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    lists: listReducer,
    cards: cardsReducer,
    comments: commentsReducer,
    profile: profileReducer

}));

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();