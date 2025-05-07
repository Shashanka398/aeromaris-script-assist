import { useState, useEffect } from 'react';
import {
  Title,
  Text,
  Grid,
  Card,
  Image,
  Button,
  Group,
  Badge,
  useMantineTheme,
  Box,
  SimpleGrid,
  Stack,
  Paper,
  Skeleton,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconRocket, IconShip, IconExternalLink } from '@tabler/icons-react';
import Layout from '../../components/Layout/Layout';
import { RocketImages, ShipImages, SPACEX_IMAGES } from '../../utils/constants';
import Loading from '../../components/ui-components/Loading';
import TitleContainer from '../../components/ui-components/TitleContainer';



const Home = () => {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(true);


  const SPACEX_STATS = [
  { title: 'Ships', value: '27+', icon: <IconShip size={24} />, color: 'blue' },
  { title: 'Rockets', value: '8+', icon: <IconRocket size={24} />, color: 'orange' },
  { title: 'Launches', value: '200+', icon: <IconRocket size={24} />, color: 'green' },
];


  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Box mb={50}>
        <Grid gutter={40} align="center" >
            {loading ? (
             <Loading/>
            ) : (
              <Stack spacing="xl" >
                <TitleContainer
                reverseOrder
                 context='Rockets'
                 contextIcon={<IconRocket size={20} />}
                 contextLink='https://www.spacex.com'
                 title='Explore '
                 titleDescription={`Explore the rockets that carry humanity’s dreams beyond Earth. From reusable boosters to powerful launch systems, learn how each rocket contributes to aerospace innovation.
Get insights into their technology, performance, and the missions they support.`}
                 isLoading={loading}
                contextImages={RocketImages}
                />
                <TitleContainer
                 context='Ships'
                 contextIcon={<IconShip size={20} />}
                 contextLink='https://www.spacex.com'
                 title='Explore '
                 titleDescription={`Discover the fleet that supports SpaceX's ambitious missions. From drone ships that land rockets
                  at sea to recovery vessels that help bring astronauts home safely, explore the vessels
                  that make reusable spaceflight possible.`}
                 isLoading={loading}
                 contextImages={ShipImages}
                />
              </Stack>
            )}
 
        </Grid>
      </Box>

      <Paper p="xl" radius="md" withBorder mb={50}>
        <Title order={2} mb="xl" ta="center">
          SpaceX Fleet Statistics
        </Title>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing="xl">
          {SPACEX_STATS.map((stat, index) => (
            <Card key={index} p="xl" radius="md" withBorder>
              {loading ? (
                <>
                  <Skeleton height={40} width={40} radius="md" mb="md" />
                  <Skeleton height={30} radius="md" mb="sm" />
                  <Skeleton height={20} width="50%" radius="md" />
                </>
              ) : (
                <>
                  <Group position="apart">
                    <Box
                      sx={{
                        backgroundColor: theme.colors[stat.color][1],
                        color: theme.colors[stat.color][6],
                        borderRadius: theme.radius.md,
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Badge size="lg" variant="filled" color={stat.color}>
                      {stat.value}
                    </Badge>
                  </Group>
                  <Text weight={700} size="xl" mt="md">
                    {stat.title}
                  </Text>
                </>
              )}
            </Card>
          ))}
        </SimpleGrid>
      </Paper>

      <Box mb={30}>
        <Title order={2} mb="xl" ta="center">
          Featured Images
        </Title>
        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 'xs', cols: 1 },
          ]}
        >
          {SPACEX_IMAGES.map((image, index) => (
            <Card key={index} p={0} radius="md" withBorder>
              {loading ? (
                <Skeleton height={200} radius={0} />
              ) : (
                <Image
                  src={image}
                  height={200}
                  alt={`SpaceX image ${index + 1}`}
                  fit="cover"
                />
              )}
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  );
};

export default Home; 