import axios from "axios";
import { IApiError } from "../interfaces/api-error.interface";

const api = axios.create({
    baseURL: 'http://localhost:3001/',
    responseType: 'json',    
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
});

export function errorHandler(error: unknown) {
    const response = (error as IApiError).response

    if (response.status === 401) {
        localStorage.removeItem('token')
        location.href = '/login'
    }

    if (response.status === 400) {
        console.log('d: ', response.data)

        return response.data
    }

    return response.data?.message || 'Server error'
}

export default api
