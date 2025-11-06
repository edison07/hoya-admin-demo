export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user: User;
  };
  message: string;
}
