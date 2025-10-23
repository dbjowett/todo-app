import { showNotification } from '@mantine/notifications';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { login } from '../api/auth';
import type { LoginRequest, LoginResponse } from '../api/types';
import { useSession } from '../providers/AuthProvider';

export function useLoginMutation(): UseMutationResult<
  LoginResponse, //
  unknown, // Axios error
  LoginRequest
> {
  const { signIn } = useSession();
  return useMutation({
    mutationFn: async (data: LoginRequest) => await login(data),
    onSuccess: (data) => {
      signIn({
        access_token: data.accessToken,
        refresh_token: data.refreshToken || '',
      });
      showNotification({
        message: `Welcome back, ${data.user.email}`,
        color: 'green',
      });
    },
    onError: (error) => {
      console.error(error);
      showNotification({
        message: 'Login failed. Check your credentials.',
        color: 'red',
      });
    },
  });
}
