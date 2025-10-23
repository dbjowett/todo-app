import {
  Button,
  Card,
  Checkbox,
  Container,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useCreateTask } from '../hooks/useCreateTask';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useTasks } from '../hooks/useTasks';
import { useUpdateTask } from '../hooks/useUpdateTask';

export function TasksPage() {
  const { data: tasks, isLoading } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

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

  const filteredTasks = tasks?.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true; // 'all'
  });

  return (
    <Container size="sm" py="xl">
      <Title order={2} mb="md">
        Tasks
      </Title>
      <Group gap="xs" mb="md">
        <Button variant={filter === 'all' ? 'filled' : 'outline'} onClick={() => setFilter('all')}>
          All
        </Button>
        <Button
          variant={filter === 'completed' ? 'filled' : 'outline'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
        <Button
          variant={filter === 'incomplete' ? 'filled' : 'outline'}
          onClick={() => setFilter('incomplete')}
        >
          Incomplete
        </Button>
      </Group>

      <Group mb="md">
        <TextInput
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <Button
          leftSection={<IconPlus size="16" />}
          onClick={handleAdd}
          disabled={!newTask.trim()}
          loading={createTask.isPending}
        >
          Add
        </Button>
      </Group>

      <Stack>
        {filteredTasks?.length ? (
          filteredTasks.map((task) => (
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
                  onChange={(e) =>
                    updateTask.mutate({ ...task, completed: e.currentTarget.checked })
                  }
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
          ))
        ) : (
          <Text c="dimmed" ta="center">
            No tasks yet.
          </Text>
        )}
      </Stack>
    </Container>
  );
}
