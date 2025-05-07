import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { 
  Container, 
  Title, 
  Grid,
  Card, 
  Image, 
  Text, 
  Badge, 
  Group, 
  Stack,
  Center,
  useMantineTheme,
  Button,
  Tabs,
  ScrollArea,
  Box
} from '@mantine/core';
import { getRockets } from '../../api/spacex';
import Layout from '../../components/Layout/Layout';
import CardsCarousel from '../../components/ui-components/CardsCarousel';
import Loading from '../../components/ui-components/Loading';
import { Tab } from '@mantine/core/lib/Tabs/Tab/Tab';
import '../../styles/abstracts/_fonts.scss';
import { IconBadge4k, IconRocket, IconShip } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

interface Rocket {
  id: string;
  name: string;
  description: string;
  flickr_images: string[];
  active: boolean;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
}

export default function RocketsList() {
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const { data: rockets, isLoading, isError, error } = useQuery<Rocket[]>({
    queryKey: ['rockets'],
    queryFn: async () => {
      try {
        const response = await getRockets();
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch rockets data');
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
   
  useEffect(() => {
    if (isError) {
      notifications.show({
        title: 'Error while loading rockets',
        message: error instanceof Error ? error.message : 'Unable to load rocket listing. Please try again later.',
        color: 'red',
        radius: 'md',
        autoClose: 5000
      });
    }
  }, [isError, error]);

  const filteredRockets = rockets?.filter((rocket) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return rocket.active;
    if (activeTab === 'inactive') return !rocket.active;
    return true;
  });

  if (isLoading) {
    return (
      <Layout>
        <Box pt={140}>
          <Container size="xl" pb="xl">
            <Grid gutter="lg">
              {[1, 2, 3, 4].map((index) => (
                <Grid.Col key={index} span={6}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Loading />
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
     
      <Box
        pos="fixed"
        top={70}
        left={0}
        right={0}
        style={{
          zIndex: '10',
          padding: '1rem 0',
          width:'100%',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          boxShadow: theme.shadows.sm,
        }}
      >
        <Container size="xl">
          <Stack>
                     <Group>
                      <IconRocket size={28} color={theme.colors.brand[6]} />
            <Title order={2}>  Rockets</Title>
                     </Group>
            
            <Tabs value={activeTab} onTabChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab value="all" style={{ fontSize: '$paragraph1' }}>
                  All Rockets
                </Tabs.Tab>
                <Tabs.Tab value="active" style={{ fontSize: '$paragraph1' }}>
                  Active
                </Tabs.Tab>
                <Tabs.Tab value="inactive" style={{ fontSize: '$paragraph1' }}>
                  Inactive
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Stack>
        </Container>
      </Box>

      
      <Box pt={140}>
        <Container size="xl" pb="xl">
          <Grid grow  gutter="lg">
            {filteredRockets?.map((rocket) => (
              <Grid.Col key={rocket.id} span={6}
              xs={12}  
              sm={12}   
               md={6}   
               lg={6}   
              >
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{ height: '100%', width: '100%' }}
                >
                  <Card.Section>
                    <CardsCarousel
                      hideTitle={true}
                      items={rocket.flickr_images.slice(0, 2).map((img, index) => ({
                        title: rocket.name,
                        id: index,
                        image: img,
                      }))}
                    />
                  </Card.Section>

                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500} style={{ fontSize: '$heading3' }}>
                      {rocket.name}
                    </Text>
                    {rocket.active ? (
                      <Badge color="green" variant="light" style={{ fontSize: '$paragraph3' }}>
                        Active
                      </Badge>
                    ) : (
                      <Badge color="red" variant="light" style={{ fontSize: '$paragraph3' }}>
                        Inactive
                      </Badge>
                    )}
                  </Group>

                  <Text
                    size="sm"
                    color="dimmed"
                    style={{ fontSize: '$paragraph1', height: '100px' }}
                  >
                    {rocket.description.slice(0, 250) + '...'}
                  </Text>

                  <Button
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                    style={{ fontSize: '$paragraph2' }}
                    onClick={() => navigate(`/rocket/${rocket.id}`)}
                  >
                    View Details
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}
