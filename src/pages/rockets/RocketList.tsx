import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Loader,
  RingProgress,
  useMantineTheme,
  Button,
  Tabs,
  ScrollArea
} from '@mantine/core';
import { getRockets } from '../../api/spacex';
import Layout from '../../components/Layout/Layout';
import CardsCarousel from '../../components/ui-components/CardsCarousel';
import { Tab } from '@mantine/core/lib/Tabs/Tab/Tab';
import '../../styles/abstracts/_fonts.scss';

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
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const theme = useMantineTheme();
    const navigate = useNavigate();

  useEffect(() => {
    const fetchRockets = async () => {
      try {
        const response = await getRockets();
        setRockets(response.data);
      } catch (error) {
        console.error('Error fetching rockets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRockets();
  }, []);

  const filteredRockets = rockets.filter(rocket => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return rocket.active;
    if (activeTab === 'inactive') return !rocket.active;
    return true;
  });

  if (loading) {
    return (
      <Center h="100vh">
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Layout>
       
    <Container size="xl" py="xl">
       
      <Title order={1} mb="xl" style={{ fontSize: '$heading1' }}>SpaceX Rockets</Title>
      <Tabs value={activeTab} onTabChange={setActiveTab} mb="xl">
        <Tabs.List mb="xl">
          <Tabs.Tab value="all" style={{ fontSize: '$paragraph1' }}>All Rockets</Tabs.Tab>
          <Tabs.Tab value="active" style={{ fontSize: '$paragraph1' }}>Active</Tabs.Tab>
          <Tabs.Tab value="inactive" style={{ fontSize: '$paragraph1' }}>Inactive</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Grid gutter="lg">
      
        {filteredRockets.map((rocket) => (
          <Grid.Col key={rocket.id} span={6}>
              <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%', width: '100%' }}>
      <Card.Section>
       <CardsCarousel hideTitle={true} items={rocket.flickr_images.slice(0,2).map((img,index)=>{
        return {
          title:rocket.name,
          id:index,
          image:img
        }
       })}/>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} style={{ fontSize: '$heading3' }}>{rocket.name}</Text>
        {rocket.active ?
          (<Badge color="green" variant="light" style={{ fontSize: '$paragraph3' }}>
            Active
        </Badge>):(
          <Badge color="red" variant="light" style={{ fontSize: '$paragraph3' }}>
            Inactive
        </Badge>
        )
        }
        
      </Group>

      <Text size="sm" color="dimmed" style={{ fontSize: '$paragraph1' , height:'100px' }}>
       {rocket.description.slice(0,250)+'...'}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md" style={{ fontSize: '$paragraph2' }} onClick={()=>navigate(`/rocket/${rocket.id}`)}>
        View Details 
      </Button>
    </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
        </Layout>
  );
} 