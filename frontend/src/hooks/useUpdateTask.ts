import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../api/auth';
import type { Task } from '../api/types';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, Task>({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
