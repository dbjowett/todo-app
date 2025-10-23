import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../api/auth';
import type { Task } from '../api/types';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, string>({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
