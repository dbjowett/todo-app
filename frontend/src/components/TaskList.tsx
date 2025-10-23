import { Button, Card, Checkbox, Group, Stack, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import type { UseMutationResult } from '@tanstack/react-query';
import type { Task } from '../api/types';
import type { FilterType } from '../pages/TasksPage';

const Task = ({
  task,
  updateTask,
  deleteTask,
}: {
  task: Task;
  updateTask: UseMutationResult<Task, Error, Task, unknown>;
  deleteTask: UseMutationResult<void, Error, number, unknown>;
}) => {
  return (
    <Card key={task.id} shadow="sm" p="md" radius="md" withBorder>
      <Group justify="space-between" align="center">
        <Checkbox
          styles={{
            body: { alignItems: 'center' },
          }}
          checked={task.completed}
          label={
            <Text
              td={task.completed ? 'line-through' : 'none'}
              c={task.completed ? 'dimmed' : undefined}
            >
              {task.title}
            </Text>
          }
          onChange={(e) => updateTask.mutate({ ...task, completed: e.currentTarget.checked })}
        />
        <Button
          onClick={() => deleteTask.mutate(task.id)}
          color="red"
          variant="light"
          size="compact-sm"
        >
          <IconTrash size={16} />
        </Button>
      </Group>
    </Card>
  );
};

const emptyText: Record<FilterType, string> = {
  all: 'Add your first task!',
  completed: 'Get to work! ',
  incomplete: 'All tasks are done!',
};

export const TaskList = ({
  type,
  tasks,
  updateTask,
  deleteTask,
}: {
  type: FilterType;
  tasks: Task[];
  updateTask: UseMutationResult<Task, Error, Task, unknown>;
  deleteTask: UseMutationResult<void, Error, number, unknown>;
}) => {
  if (!tasks.length) {
    return (
      <Text fw={600} c="dimmed" ta="center">
        {emptyText[type]}
      </Text>
    );
  }

  return (
    <Stack>
      {tasks.map((task) => (
        <Task key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
      ))}
    </Stack>
  );
};
