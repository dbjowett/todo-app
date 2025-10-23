import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../api/auth';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
