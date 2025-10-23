import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../api/auth';
import type { Task } from '../api/types';

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
};
