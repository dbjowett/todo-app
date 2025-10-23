import { Button, Container, Group, Loader, Tabs, TextInput, Title } from '@mantine/core';
import { IconCheck, IconList, IconPlus, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import type { Task } from '../api/types';
import { TaskList } from '../components/TaskList';
import { useCreateTask } from '../hooks/useCreateTask';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useTasks } from '../hooks/useTasks';
import { useUpdateTask } from '../hooks/useUpdateTask';

export type FilterType = 'all' | 'completed' | 'incomplete';

export function TasksPage() {
  const { data: tasks, isLoading } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const handleAdd = () => {
    if (!newTask.trim()) return;
    createTask.mutate(newTask);
    setNewTask('');
  };

  if (isLoading) {
    return (
      <Container py="xl">
        <Loader />
      </Container>
    );
  }

  const initialTasks: Record<FilterType, Task[]> = {
    all: [],
    completed: [],
    incomplete: [],
  };

  const { all, completed, incomplete } = (tasks || []).reduce((acc, task) => {
    acc.all.push(task);
    if (task.completed) {
      acc.completed.push(task);
    } else {
      acc.incomplete.push(task);
    }
    return acc;
  }, initialTasks);

  return (
    <Container size="sm" py="xl">
      <Title order={2} mb="md">
        Tasks
      </Title>

      <Tabs
        variant="pills"
        radius="xl"
        defaultValue="all"
        value={filter}
        onChange={(filter) => setFilter(filter as FilterType)}
      >
        <Tabs.List mb="md">
          <Tabs.Tab value="all" leftSection={<IconList size={14} />}>
            All
          </Tabs.Tab>
          <Tabs.Tab value="completed" leftSection={<IconCheck size={14} />}>
            Completed
          </Tabs.Tab>
          <Tabs.Tab value="incomplete" leftSection={<IconX size={14} />}>
            Incomplete
          </Tabs.Tab>
        </Tabs.List>

        <Group mb="md">
          <TextInput
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.currentTarget.value)}
            style={{ flex: 1 }}
          />
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleAdd}
            disabled={!newTask.trim()}
            loading={createTask.isPending}
          >
            Add
          </Button>
        </Group>

        <Tabs.Panel value="all">
          <TaskList type="all" tasks={all} updateTask={updateTask} deleteTask={deleteTask} />
        </Tabs.Panel>
        <Tabs.Panel value="completed">
          <TaskList
            type="completed"
            tasks={completed}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </Tabs.Panel>
        <Tabs.Panel value="incomplete">
          <TaskList
            type="incomplete"
            tasks={incomplete}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
