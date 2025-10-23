import { showNotification } from '@mantine/notifications';
import { type UseMutationResult, useMutation } from '@tanstack/react-query';
import { register } from '../api/auth';
import type { RegisterRequest, RegisterResponse } from '../api/types';

export function useRegisterMutation(): UseMutationResult<
  RegisterResponse,
  unknown,
  RegisterRequest
> {
  return useMutation({
    mutationFn: async (data: RegisterRequest) => await register(data),
    onSuccess: (data) => {
      showNotification({
        message: `Account created for ${data.email}. You can now log in.`,
        color: 'green',
      });
    },
    onError: (error) => {
      console.error(error);
      showNotification({
        message: 'Registration failed. Try again.',
        color: 'red',
      });
    },
  });
}
