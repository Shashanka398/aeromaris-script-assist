import { Footer as MantineFooter, Text, Container, Group, ActionIcon, Box } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <MantineFooter height={60} p="md" style={{ position: 'relative' }}>
      <Container size="xl">
        <Group position="apart">
          <Text size="sm" color="dimmed">
            © {currentYear} AeroMaris. All rights reserved.
          </Text>
          <Group spacing="xs">
            <Link to="/privacy" style={{ textDecoration: 'none' }}>
              <Text size="sm" color="dimmed">Privacy Policy</Text>
            </Link>
            <Box sx={{ width: 2, height: 14, backgroundColor: 'gray' }} mx={5} />
            <Link to="/terms" style={{ textDecoration: 'none' }}>
              <Text size="sm" color="dimmed">Terms of Service</Text>
            </Link>
          </Group>
          <Group spacing={0}>
            <ActionIcon size="lg" variant="subtle" color="gray">
              <IconBrandTwitter size={18} />
            </ActionIcon>
            <ActionIcon size="lg" variant="subtle" color="gray">
              <IconBrandYoutube size={18} />
            </ActionIcon>
            <ActionIcon size="lg" variant="subtle" color="gray">
              <IconBrandInstagram size={18} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </MantineFooter>
  );
};

export default Footer; 