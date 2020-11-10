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
import listSlice from './components/List/redux/listSlice';
import cardsSlice from './components/Card/redux/cardsSlice';
import commentsSlice from './components/Comments/redux/commentsSlice';
import toggleAddCardButtonSlice from './components/Board/redux/toggleAddCardButtonSlice';
import profileSlice from './components/Profile/redux/profileSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    lists: listSlice,
    cards: cardsSlice,
    comments: commentsSlice,
    toggleAddCardButton: toggleAddCardButtonSlice,
    profile: profileSlice

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