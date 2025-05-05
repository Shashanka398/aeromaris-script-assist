import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Paper, 
  Title, 
  Text, 
  Container, 
  Stack, 
  Anchor, 
  Divider, 
  Group,
  useMantineTheme 
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUser, IconLock, IconRocket } from '@tabler/icons-react';
import Layout from '../../components/Layout/Layout';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useMantineTheme();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  
  // Get the intended destination from location state or default to home
  const from = (location.state as LocationState)?.from?.pathname || '/ships';

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.length < 2 ? 'Username must be at least 2 characters' : null),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      // For demo purposes, any username/password that meets validation works
      const success = await login(values.username, values.password);
      if (success) {
        navigate(from);
      } else {
        form.setErrors({ username: 'Invalid credentials', password: 'Invalid credentials' });
      }
    } catch (err) {
      form.setErrors({ username: 'An error occurred', password: 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container size={450} my={40}>
        <Stack align="center" mb={30}>
          <IconRocket size={48} color={theme.colors.brand[6]} />
          <Title align="center" sx={{ fontWeight: 900 }}>
            Welcome to SpaceX Ships
          </Title>
          <Text color="dimmed" size="sm" align="center" maw={400}>
            Enter your credentials to access the SpaceX ships database.
            For demo purposes, any valid username and password will work.
          </Text>
        </Stack>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack spacing="lg">
              <TextInput
                label="Username"
                placeholder="Your username"
                icon={<IconUser size={16} />}
                required
                {...form.getInputProps('username')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                icon={<IconLock size={16} />}
                required
                {...form.getInputProps('password')}
              />
              
              <Group position="apart" mt="xs">
                <Anchor component="button" size="sm" color="dimmed">
                  Forgot password?
                </Anchor>
              </Group>
              
              <Button 
                type="submit" 
                fullWidth 
                loading={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
              
              <Divider label="Or continue with" labelPosition="center" />
              
              <Group grow>
                <Button variant="outline">Google</Button>
                <Button variant="outline">GitHub</Button>
              </Group>
            </Stack>
          </form>
        </Paper>
        
        <Text color="dimmed" size="sm" align="center" mt={20}>
          Don't have an account?{' '}
          <Anchor<'a'> href="#" size="sm" onClick={(e) => e.preventDefault()}>
            Create account
          </Anchor>
        </Text>
      </Container>
    </Layout>
  );
};

export default Login; 