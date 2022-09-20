import { createAsyncThunk } from "@reduxjs/toolkit";
import { IApiError } from "../../interfaces/api-error.interface";
import api, { errorHandler } from "../../services/api.service";
import { LoginDto, LoginResponse, User } from "./interfaces";

export const loginUser = createAsyncThunk<LoginResponse, LoginDto>(
    'auth/loginUser',
    async (data: LoginDto, { rejectWithValue }) => {
        try {
            const response = await api.post<LoginResponse>('auth/login', data)

            return response.data
        } catch (error: unknown) {
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const verifyToken = createAsyncThunk<boolean>(
    'auth/verifyToken',
    async (_, { rejectWithValue }) => {
        try {
            await api.get('auth/verify')

            return true
        } catch (error: unknown) {
            return rejectWithValue(errorHandler(error));
        }
    }
)