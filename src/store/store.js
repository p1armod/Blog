import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from "./authSlice";
import postReducer from "./postSlice";

// Configuration for persisting the auth state
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['isAuthenticated', 'userData'] // Only persist these fields
};

// Combine reducers
const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    posts: postReducer
});

// Create the store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };

