import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Image, 
  Text, 
  Group, 
  Badge, 
  Button, 
  Stack, 
  Title, 
  Skeleton, 
  Grid, 
  Paper, 
  Card,
  Divider,
  useMantineTheme
} from '@mantine/core';
import { IconArrowLeft, IconAnchor, IconCalendar, IconWeight, IconMapPin, IconRocket } from '@tabler/icons-react';
import { getShipById } from '../../../api/spacex';
import Layout from '../../../components/Layout/Layout';

interface Ship {
  id: string;
  name: string;
  type: string;
  home_port: string;
  image: string;
  active: boolean;
  year_built: number;
  roles: string[];
  mass_kg: number;
  mass_lbs: number;
  missions: Array<{
    name: string;
    flight: string;
  }>;
}

export default function ShipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ship, setShip] = useState<Ship | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useMantineTheme();

  useEffect(() => {
    const fetchShip = async () => {
      try {
        if (id) {
          const response = await getShipById(id);
          setShip(response.data);
        }
      } catch (error) {
        console.error('Error fetching ship:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShip();
  }, [id]);

  const renderLoading = () => (
    <Container size="lg">
      <Button variant="light" leftIcon={<IconArrowLeft size={16} />} onClick={() => navigate('/ships')} mb="xl">
        Back to Ships
      </Button>
      
      <Paper p="md" withBorder>
        <Skeleton height={400} radius="md" mb="xl" />
        <Skeleton height={50} width="50%" mb="xl" />
        <Grid>
          <Grid.Col md={6}>
            <Stack spacing="md">
              <Skeleton height={30} />
              <Skeleton height={30} />
              <Skeleton height={30} />
            </Stack>
          </Grid.Col>
          <Grid.Col md={6}>
            <Stack spacing="md">
              <Skeleton height={30} />
              <Skeleton height={30} />
              <Skeleton height={100} />
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );

  const renderNotFound = () => (
    <Container size="lg" py="xl">
      <Paper p="xl" withBorder>
        <Stack align="center" spacing="md">
          <Title order={2}>Ship Not Found</Title>
          <Text>We couldn't find the ship you're looking for.</Text>
          <Button 
            variant="filled" 
            leftIcon={<IconArrowLeft size={16} />} 
            onClick={() => navigate('/ships')}
          >
            Return to Ships List
          </Button>
        </Stack>
      </Paper>
    </Container>
  );

  return (
    <Layout>
      {loading ? (
        renderLoading()
      ) : !ship ? (
        renderNotFound()
      ) : (
        <Container size="lg" py="md">
          <Button 
            variant="light" 
            leftIcon={<IconArrowLeft size={16} />} 
            onClick={() => navigate('/ships')} 
            mb="xl"
            color="brand"
          >
            Back to Ships
          </Button>

          <Paper shadow="xs" p={0} withBorder>
            <Grid gutter={0}>
              <Grid.Col md={7}>
                <Image
                  src={ship.image || ''}
                  height={400}
                  alt={ship.name}
                  fit="cover"
                  sx={{ 
                    borderTopLeftRadius: theme.radius.md,
                    borderBottomLeftRadius: theme.fn.largerThan('md') ? theme.radius.md : 0,
                    borderTopRightRadius: theme.fn.smallerThan('md') ? theme.radius.md : 0
                  }}
                />
              </Grid.Col>
              
              <Grid.Col md={5}>
                <Stack spacing="lg" p="xl" h="100%">
                  <div>
                    <Group position="apart">
                      <Title order={2}>{ship.name}</Title>
                      <Badge color={ship.active ? 'green' : 'red'} size="lg" variant="filled">
                        {ship.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </Group>
                    <Text color="dimmed" size="lg">{ship.type}</Text>
                  </div>
                  
                  <Divider />
                  
                  <Grid>
                    <Grid.Col span={6}>
                      <Group spacing="xs">
                        <IconMapPin size={20} color={theme.colors.blue[6]} />
                        <Text fw={500}>Home Port:</Text>
                      </Group>
                      <Text ml={24}>{ship.home_port}</Text>
                    </Grid.Col>
                    
                    <Grid.Col span={6}>
                      <Group spacing="xs">
                        <IconCalendar size={20} color={theme.colors.green[6]} />
                        <Text fw={500}>Year Built:</Text>
                      </Group>
                      <Text ml={24}>{ship.year_built || 'Unknown'}</Text>
                    </Grid.Col>
                    
                    <Grid.Col span={6}>
                      <Group spacing="xs">
                        <IconWeight size={20} color={theme.colors.orange[6]} />
                        <Text fw={500}>Mass:</Text>
                      </Group>
                      <Text ml={24}>
                        {ship.mass_kg ? `${ship.mass_kg} kg (${ship.mass_lbs} lbs)` : 'Unknown'}
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>
          
          <Grid mt="xl" gutter="xl">
            <Grid.Col md={6}>
              <Card shadow="xs" p="lg" radius="md" withBorder h="100%">
                <Card.Section withBorder inheritPadding py="xs">
                  <Group position="apart">
                    <Title order={4}>Roles</Title>
                    <IconAnchor size={20} />
                  </Group>
                </Card.Section>
                
                <Group mt="md" spacing="xs">
                  {ship.roles && ship.roles.length > 0 ? (
                    ship.roles.map((role, index) => (
                      <Badge key={index} color="blue" size="lg">
                        {role}
                      </Badge>
                    ))
                  ) : (
                    <Text c="dimmed">No roles specified</Text>
                  )}
                </Group>
              </Card>
            </Grid.Col>
            
            <Grid.Col md={6}>
              <Card shadow="xs" p="lg" radius="md" withBorder h="100%">
                <Card.Section withBorder inheritPadding py="xs">
                  <Group position="apart">
                    <Title order={4}>Missions</Title>
                    <IconRocket size={20} />
                  </Group>
                </Card.Section>
                
                <Stack mt="md" spacing="xs">
                  {ship.missions && ship.missions.length > 0 ? (
                    ship.missions.map((mission, index) => (
                      <Group key={index} position="apart">
                        <Text>{mission.name}</Text>
                        <Badge color="grape" size="sm">Flight: {mission.flight}</Badge>
                      </Group>
                    ))
                  ) : (
                    <Text c="dimmed">No missions recorded</Text>
                  )}
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      )}
    </Layout>
  );
} 