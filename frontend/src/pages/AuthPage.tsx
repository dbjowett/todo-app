import { Anchor, Button, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useLoginMutation } from '../hooks/useLoginMutation';
import { useRegisterMutation } from '../hooks/useRegisterMutation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
      confirmPassword: (value, values) =>
        isLogin || value === values.password ? null : 'Passwords do not match',
    },
  });

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleSubmit = (values: typeof form.values) => {
    if (isLogin) {
      loginMutation.mutate({ email: values.email, password: values.password });
    } else {
      registerMutation.mutate({
        email: values.email,
        password: values.password,
      });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper withBorder shadow="md" p="xl" radius="md" w={350}>
        <Title order={3} ta="center" mb="md">
          {isLogin ? 'Login' : 'Create an account'}
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="you@example.com"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Your password"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />

            {!isLogin && (
              <PasswordInput
                withAsterisk
                label="Confirm password"
                placeholder="Re-enter password"
                key={form.key('confirmPassword')}
                {...form.getInputProps('confirmPassword')}
              />
            )}

            <Button
              type="submit"
              loading={isLogin ? loginMutation.isPending : registerMutation.isPending}
              fullWidth
              color="dark"
              mt="md"
            >
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </Stack>
        </form>

        <Text c="dimmed" size="sm" ta="center" mt="md">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <Anchor size="sm" component="button" onClick={() => setIsLogin(false)}>
                Register
              </Anchor>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Anchor size="sm" component="button" onClick={() => setIsLogin(true)}>
                Login
              </Anchor>
            </>
          )}
        </Text>
      </Paper>
    </div>
  );
}
