import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Badge,
  Group,
  Stack,
  Paper,
  Grid,
  Anchor,
  Center,
  Loader,
  Button,
  SimpleGrid,
  RingProgress,
  Progress,
  Box,
  rem,
  useMantineTheme
} from '@mantine/core';
import { IconArrowLeft, IconRocket, IconCurrencyDollar, IconCalendar } from '@tabler/icons-react';
import { getRocketById } from '../../api/spacex';
import CardsCarousel from '../../components/ui-components/CardsCarousel';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout/Layout';

interface Rocket {
  id: string;
  name: string;
  description: string;
  flickr_images: string[];
  active: boolean;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  height: { meters: number; feet: number };
  diameter: { meters: number; feet: number };
  mass: { kg: number; lb: number };
  stages: number;
  boosters: number;
  country: string;
  company: string;
  wikipedia: string;
}

export default function RocketDetail() {
  const { id } = useParams();
  const [rocket, setRocket] = useState<Rocket | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useMantineTheme();

  useEffect(() => {
    const fetchRocket = async () => {
      try {
        const response = await getRocketById(id!);
        setRocket(response.data);
      } catch (error) {
        console.error('Error fetching rocket:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRocket();
  }, [id]);

  if (loading) {
    return (
      <Center h="100vh">
        <Loader size="xl" />
      </Center>
    );
  }

  if (!rocket) {
    return (
      <Container size="md" py="xl">
        <Text align="center" size="xl">Rocket not found</Text>
      </Container>
    );
  }

  const MotionPaper = motion(Paper);

  return (
    <Layout>
    <Container size="xl" py="xl">
      <Button
        component={Link}
        to="/rockets"
        variant="subtle"
        leftIcon={<IconArrowLeft size={16} />}
        mb="xl"
      >
        Back to Rockets
      </Button>

      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        shadow="md"
        radius="md"
        withBorder
      >
        <CardsCarousel 
          hideTitle={true} 
          items={rocket.flickr_images.map((img, index) => ({
            title: rocket.name,
            id: index,
            image: img
          }))}
        />
        
        <Group position="apart" p="xs" style={{ position: 'absolute', top: 16, right: 16 }}>
          <Badge 
            color={rocket.active ? 'success' : 'gray'}
            variant="filled"
            size="lg"
          >
            {rocket.active ? 'Active' : 'Inactive'}
          </Badge>
        </Group>

        <Stack p="xl" spacing="xl">
          <div>
            <Title order={1} mb="md">{rocket.name}</Title>
            <Text color="dimmed" size="lg">{rocket.description}</Text>
          </div>

          <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Paper p="md" withBorder>
              <Title order={3} size="h4" mb="md">Specifications</Title>
              <Stack spacing="xs">
                <div>
                  <Text size="sm" color="dimmed">Height</Text>
                  <Text weight={500}>{rocket.height.meters}m / {rocket.height.feet}ft</Text>
                </div>
                <div>
                  <Text size="sm" color="dimmed">Diameter</Text>
                  <Text weight={500}>{rocket.diameter.meters}m / {rocket.diameter.feet}ft</Text>
                </div>
                <div>
                  <Text size="sm" color="dimmed">Mass</Text>
                  <Text weight={500}>{rocket.mass.kg.toLocaleString()}kg / {rocket.mass.lb.toLocaleString()}lb</Text>
                </div>
                <div>
                  <Text size="sm" color="dimmed">Stages</Text>
                  <Text weight={500}>{rocket.stages}</Text>
                </div>
                <div>
                  <Text size="sm" color="dimmed">Boosters</Text>
                  <Text weight={500}>{rocket.boosters}</Text>
                </div>
              </Stack>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={3} size="h4" mb="md">Performance</Title>
              <Stack spacing="xl">
                <Box>
                  <Group position="apart" mb="xs">
                    <Text size="sm" color="dimmed">Success Rate</Text>
                    <Text weight={500}>{rocket.success_rate_pct}%</Text>
                  </Group>
                  <RingProgress
                    size={80}
                    thickness={8}
                    sections={[{ value: rocket.success_rate_pct, color: 'success' }]}
                    label={
                      <Center>
                        <IconRocket style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
                      </Center>
                    }
                  />
                </Box>

                <Box>
                  <Group position="apart" mb="xs">
                    <Text size="sm" color="dimmed">Cost per Launch</Text>
                    <Text weight={500}>${rocket.cost_per_launch.toLocaleString()}</Text>
                  </Group>
                  <Progress
                    value={Math.min(100, (rocket.cost_per_launch / 100000000) * 100)}
                    color="primary"
                    size="xl"
                    radius="xl"
                    label={`${Math.round((rocket.cost_per_launch / 100000000) * 100)}%`}
                  />
                </Box>

                <Box>
                  <Group position="apart" mb="xs">
                    <Text size="sm" color="dimmed">First Flight</Text>
                    <Text weight={500}>{new Date(rocket.first_flight).toLocaleDateString()}</Text>
                  </Group>
                  <Progress
                    value={100}
                    color="brand"
                    size="xl"
                    radius="xl"
                    label="Active"
                  />
                </Box>
              </Stack>
            </Paper>

            <Paper p="md" withBorder>
              <Title order={3} size="h4" mb="md">Additional Information</Title>
              <Stack spacing="xs">
                <div>
                  <Text size="sm" color="dimmed">Country</Text>
                  <Text weight={500}>{rocket.country}</Text>
                </div>
                <div>
                  <Text size="sm" color="dimmed">Company</Text>
                  <Text weight={500}>{rocket.company}</Text>
                </div>
                <div>
                  <Text size="sm" color="dimmed">Wikipedia</Text>
                  <Anchor 
                    href={rocket.wikipedia} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    color="brand"
                  >
                    Read more on Wikipedia
                  </Anchor>
                </div>
              </Stack>
            </Paper>
          </SimpleGrid>
        </Stack>
      </MotionPaper>
    </Container>
    </Layout>
  );
} 