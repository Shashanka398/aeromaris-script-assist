import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  Image,
  Paper,
  Skeleton,
  Grid,
  Stack,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: Number(theme.spacing.xl) * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[3],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: Number(theme.spacing.xl) * 1.5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[7],
  },
}));

const NotFound = ({ isDetailsPage }: { isDetailsPage?: boolean }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <>
      {isDetailsPage ? (
        <Container size="lg">
          <Button
            variant="light"
            leftIcon={<IconArrowLeft size={16} />}
            onClick={() => navigate("/ships")}
            mb="xl"
          >
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
      ) : (
        <Container className={classes.root}>
          <div className={classes.label}>404</div>
          <Title className={classes.title}>Houston, we have a problem</Title>
          <Text size="lg" ta="center" className={classes.description}>
            The page you are looking for may have been moved, deleted, or
            possibly never existed. Let's get you back on track.
          </Text>
          <Group position="center">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="filled" size="md">
                Take me back to home page
              </Button>
            </Link>
          </Group>
          <Image
            src="https://images.unsplash.com/photo-1545156521-77bd85671d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
            alt="404"
            mt={40}
            radius="md"
            mx="auto"
            sx={{ maxWidth: 400 }}
          />
        </Container>
      )}
    </>
  );
};

export default NotFound;
