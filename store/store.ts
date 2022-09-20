import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import { playlistsApi } from './playlists/playlists.api'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [playlistsApi.reducerPath]: playlistsApi.reducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store