import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { AuthState, User } from './interfaces'
import { loginUser, verifyToken } from './auth.actions'
import { parseToken } from '../../helpers/jwt'
import * as toastr from 'tailwind-toast'

const initialState: AuthState = {
  submitInProgress: false,
  verifyInProgress: false,
  error: null,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload
    },
    removeUser: (state) => {
        state.user = null
    },    
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.submitInProgress = true
      state.error = null
    })

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.submitInProgress = false

      if (!action.payload.accessToken) {
        return
      }

      localStorage.setItem('token', action.payload.accessToken)
      const user = parseToken(action.payload.accessToken)

      if (user) {
        state.user = user
      }
    })

    builder.addCase(loginUser.rejected, (state, action) => {
      state.submitInProgress = false

      toastr
        .toast()
        .warning('Error: ', typeof action.payload === 'string' ? action.payload : 'Invalid request')
        .from('bottom', 'end')
        .show()

      state.error = action.payload
    })

    builder.addCase(verifyToken.pending, (state) => {
      state.verifyInProgress = true
    })

    builder.addCase(verifyToken.fulfilled, (state) => {
      state.verifyInProgress = false
      
      const token = localStorage.getItem('token')
      if (token) {
        const user = parseToken(token)

        if (user) {
          state.user = user
        }
      }      
    })

    builder.addCase(verifyToken.rejected, (state, action) => {
      state.verifyInProgress = false

      if (action.payload !== 'Unauthorized') {
        toastr
        .toast()
        .warning('Error: ', action.payload)
        .from('bottom', 'end')
        .show()
      }
    })
  },
})

export const { storeUser, removeUser } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer