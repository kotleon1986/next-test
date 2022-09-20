export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface AuthState {
  submitInProgress: boolean;  
  verifyInProgress: boolean;  
  user: User | null;
  error: any;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}
