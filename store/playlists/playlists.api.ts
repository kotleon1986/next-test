import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PaginatedList } from '../../interfaces/paginated-list.interface'
import { Playlist } from './playlists.types'

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3001', 
    prepareHeaders: (headers, { getState }) => {
        // const token = (getState() as RootState).auth.token
        const token = localStorage.getItem('token')
    
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
    
        return headers
      },
  }),
  endpoints: (builder) => ({
    listPlaylists: builder.query<PaginatedList<Playlist>, null>({
      query: () => `playlists`,
    }),
  }),
})

export const { useListPlaylistsQuery } = playlistsApi