import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
  type CSSProperties,
} from '@mantine/core';
import { IconMoon, IconPencil, IconSun } from '@tabler/icons-react';
import { useSession } from '../providers/AuthProvider';

export function Navbar() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const { isLoggedIn, signOut } = useSession();

  const toggleTheme = () => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');

  const iconStyle: CSSProperties = { width: 22, height: 22 };

  return (
    <Flex justify="space-between" align="center" px="lg" py="sm">
      <Flex gap="md" align="center">
        <IconPencil style={{ width: 28, height: 28 }} />
        <Text fw={700} fz="lg">
          TasksApp
        </Text>
      </Flex>

      <Group>
        <ActionIcon
          onClick={toggleTheme}
          variant="default"
          size="lg"
          aria-label="Toggle color scheme"
        >
          {computedColorScheme === 'light' ? (
            <IconSun style={iconStyle} stroke={1.5} />
          ) : (
            <IconMoon style={iconStyle} stroke={1.5} />
          )}
        </ActionIcon>

        {isLoggedIn && (
          <Button variant="light" color="red" onClick={signOut}>
            Logout
          </Button>
        )}
      </Group>
    </Flex>
  );
}

export default Navbar;
