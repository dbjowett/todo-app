import { Flex } from '@mantine/core';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import { TasksPage } from './pages/TasksPage';
import { useSession } from './providers/AuthProvider';

function App() {
  const { isLoggedIn } = useSession();
  return (
    <Flex direction="column" px="md">
      <Navbar />
      <Flex justify="center" mt="xl">
        {isLoggedIn ? <TasksPage /> : <AuthPage />}
      </Flex>
    </Flex>
  );
}

export default App;
