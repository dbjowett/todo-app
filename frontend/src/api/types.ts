export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: number;
    email: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: string;
}
