import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Header as MantineHeader,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Title,
  ActionIcon,
  useMantineColorScheme,
  useMantineTheme,
  Button,
  Box,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoonStars, IconRocket } from '@tabler/icons-react';
import { useAuthStore } from '../../store/auth.store';

const HEADER_HEIGHT = 70;

const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { link: '/', label: 'Home' },
    { link: '/ships', label: 'Ships', protected: true },
  ];

  const items = links
    .filter((link) => !link.protected || (link.protected && isAuthenticated))
    .map((link) => (
      <Link 
        key={link.label} 
        to={link.link} 
        onClick={close} 
        style={{ textDecoration: 'none' }}
      >
        <Text
          fw={500}
          color={isActive(link.link) ? 'brand.6' : undefined}
          sx={() => ({
            '&:hover': {
              color: theme.colors.brand[6],
            },
          })}
        >
          {link.label}
        </Text>
      </Link>
    ));

  return (
    <MantineHeader height={HEADER_HEIGHT} mb={20}>
      <Container size="xl">
        <Group position="apart" h={HEADER_HEIGHT}>
          <Group>
            <IconRocket size={30} color={theme.colors.brand[6]} />
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Title
                order={2}
                color={colorScheme === 'dark' ? 'white' : 'dark'}
              >
                AeroMaris
              </Title>
            </Link>
          </Group>
          
          <Group spacing={5} className="links-desktop" sx={{ '@media (max-width: 768px)': { display: 'none' } }}>
            {items}
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size={30}
              mx={10}
            >
              {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
            </ActionIcon>
            {isAuthenticated ? (
              <Button variant="light" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="filled">Login</Button>
              </Link>
            )}
          </Group>

          <Burger opened={opened} onClick={toggle} className="burger" sx={{ '@media (min-width: 769px)': { display: 'none' } }} />
          
          <Transition transition="pop-top-right" duration={200} mounted={opened}>
            {(styles) => (
              <Paper className="dropdown" withBorder style={styles} sx={{
                position: 'absolute',
                top: HEADER_HEIGHT,
                left: 0,
                right: 0,
                zIndex: 100,
                '@media (min-width: 769px)': { display: 'none' },
              }}>
                <Box p="md" display="flex" >
                  {items}
                  {isAuthenticated ? (
                    <Button variant="light" onClick={logout}>
                      Logout
                    </Button>
                  ) : (
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <Button variant="filled" fullWidth>Login</Button>
                    </Link>
                  )}
                  <Group position="center">
                    <ActionIcon
                      variant="default"
                      onClick={() => toggleColorScheme()}
                      size={30}
                    >
                      {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
                    </ActionIcon>
                  </Group>
                </Box>
              </Paper>
            )}
          </Transition>
        </Group>
      </Container>
    </MantineHeader>
  );
};

export default Header; 