import axios from 'axios';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, Task } from './types';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
  }
);

// ** Auth ** //
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>('/auth/login', data);
  return res.data;
};

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>('/auth/register', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

// ** Tasks ** //
export const fetchTasks = async (): Promise<Task[]> => {
  const res = await api.get<Task[]>('/tasks');
  return res.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const res = await api.put<Task>(`/tasks/${task.id}`, task);
  return res.data;
};

export const createTask = async (title: string): Promise<Task> => {
  const res = await api.post<Task>('/tasks', { title });
  return res.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
