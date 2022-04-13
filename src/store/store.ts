import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from '../reducers/eventsReducer'
import loadingReducer from '../reducers/loadingReducer'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import userReducer from '../reducers/userReducer'

const reducer = {
  eventsReducer,
  loadingReducer,
  userReducer
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
