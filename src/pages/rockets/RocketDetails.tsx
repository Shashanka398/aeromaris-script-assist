import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  useMantineTheme,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconRocket,
  IconCurrencyDollar,
  IconCalendar,
  IconExternalLink,
} from "@tabler/icons-react";
import { getRocketById } from "../../api/spacex";
import CardsCarousel from "../../components/ui-components/CardsCarousel";
import { motion } from "framer-motion";
import Layout from "../../components/Layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import DetailsLoading from "../../components/ui-components/DetailsLoading";

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
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const {
    data: rocket,
    isLoading,
    isError,
  } = useQuery<Rocket>(["rocketDetails", id], async ({ queryKey }) => {
    const [, shipId] = queryKey;
    if (typeof shipId === "string") {
      const response = await getRocketById(shipId);
      return response.data;
    }
  });

  useEffect(() => {
    if (isError) {
      notifications.show({
        title: "Error while loading rocket details!!",
        message: "Not able to load rocket details please try later!!!",
        radius: "md",
        autoClose: 5000,
      });
    }
  }, [isError]);

  if (isLoading) {
    return (
         <DetailsLoading navigateTo={'/rockets'} backToText={'rockets'} />
    );
  }

  if (!rocket) {
    return (
      <Container size="md" py="xl">
        <Text align="center" size="xl">
          Rocket not found
        </Text>
      </Container>
    );
  }

  const MotionPaper = motion(Paper);

  return (
    <Layout>
      <Container size="xl" py="xl">
        <Button
          variant="light"
          leftIcon={<IconArrowLeft size={16} />}
          onClick={() => navigate("/rockets")}
          mb="xl"
        >
          Back to rockets
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
            imageHiegth={500}
            items={rocket.flickr_images.map((img, index) => ({
              title: rocket.name,
              id: index,
              image: img,
            }))}
          />

          <Group
            position="apart"
            p="xs"
            style={{ position: "absolute", top: 16, right: 16 }}
          >
            <Badge
              color={rocket.active ? "success" : "gray"}
              variant="filled"
              size="lg"
            >
              {rocket.active ? "Active" : "Inactive"}
            </Badge>
          </Group>

          <Stack p="xl" spacing="xl">
            <div>
              <Title order={1} mb="md">
                {rocket.name}
              </Title>
              <Text color="dimmed" size="lg">
                {rocket.description}
              </Text>
            </div>

            <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
              <Paper p="md" withBorder>
                <Title order={3} size="h4" mb="md">
                  Specifications :
                </Title>
                <Stack spacing="lg">
                  <Group grow align="end">
                    <Text color="dimmed">Height</Text>
                    <Text size="sm" weight={500}>
                      {rocket.height.meters}m / {rocket.height.feet}ft
                    </Text>
                  </Group>
                  <Group grow align="end">
                    <Text color="dimmed">Diameter</Text>
                    <Text size="sm" weight={500}>
                      {rocket.diameter.meters}m / {rocket.diameter.feet}ft
                    </Text>
                  </Group>
                  <Group grow align="end">
                    <Text color="dimmed">Mass</Text>
                    <Text size="sm" weight={500}>
                      {rocket.mass.kg.toLocaleString()}kg /{" "}
                      {rocket.mass.lb.toLocaleString()}lb
                    </Text>
                  </Group>
                  <Group grow align="end">
                    <Text color="dimmed">Stages</Text>
                    <Text weight={500}>{rocket.stages}</Text>
                  </Group>
                  <Group grow align="end">
                    <Text color="dimmed">Boosters</Text>
                    <Text weight={500}>{rocket.boosters}</Text>
                  </Group>
                </Stack>
              </Paper>

              <Paper p="md" withBorder>
                <Title order={3} size="h4" mb="md">
                  Performance
                </Title>
                <Stack spacing="xl">
                  <Box>
                    <Group position="apart" mb="xs">
                      <Text color="dimmed">Success Rate</Text>

                      <RingProgress
                        size={80}
                        thickness={8}
                        sections={[
                          { value: rocket.success_rate_pct, color: "success" },
                        ]}
                        label={
                          <Center>
                            <Text size="sm" weight={500}>
                              {rocket.success_rate_pct}%
                            </Text>
                          </Center>
                        }
                      />
                    </Group>
                  </Box>

                  <Box>
                    <Group position="apart" mb="xs">
                      <Text color="dimmed">Cost per Launch</Text>
                      <Text size="sm" weight={500}>
                        ${rocket.cost_per_launch.toLocaleString()}
                      </Text>
                    </Group>
                    <Progress
                      value={Math.min(
                        100,
                        (rocket.cost_per_launch / 100000000) * 100
                      )}
                      color="primary"
                      size="xl"
                      radius="xl"
                      label={`${Math.round(
                        (rocket.cost_per_launch / 100000000) * 100
                      )}%`}
                    />
                  </Box>

                  <Box>
                    <Group position="apart" mb="xs">
                      <Text color="dimmed">First Flight</Text>
                      <Text size="sm" weight={500}>
                        {new Date(rocket.first_flight).toLocaleDateString()}
                      </Text>
                    </Group>
                  </Box>
                </Stack>
              </Paper>

              <Paper p="md" withBorder>
                <Title order={3} size="h4" mb="md">
                  Additional Information
                </Title>
                <Stack spacing="lg">
                  <Group grow>
                    <Text color="dimmed">Country</Text>
                    <Text size="sm" weight={400}>
                      {rocket.country}
                    </Text>
                  </Group>
                  <Group grow align="end">
                    <Text color="dimmed">Company</Text>
                    <Text size="sm" weight={400}>
                      {rocket.company}
                    </Text>
                  </Group>
                  <Group grow align="end">
                    <Text size="sm" color="dimmed">
                      Wikipedia
                    </Text>
                
                     
                        <Anchor
                         href={rocket.wikipedia}
                      target="_blank"
                      variant="outline"
                        >  <Group >
                            <IconExternalLink size={14} />
                            <Text size="sm" color="dimmed"> Know more</Text>
                            </Group>
                        </Anchor>
                      
                  
                     
              
                  </Group>
                </Stack>
              </Paper>
            </SimpleGrid>
          </Stack>
        </MotionPaper>
      </Container>
    </Layout>
  );
}
