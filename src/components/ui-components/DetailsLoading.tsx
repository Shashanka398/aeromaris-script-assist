import { Button, Container, Grid, Paper, Skeleton, Stack } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom"

interface DetailsLoadingProps{
    navigateTo:string,
    backToText:string
}

const DetailsLoading =({navigateTo,backToText}:DetailsLoadingProps)=>{
    const navigate= useNavigate();
    return (
        <Container size="lg">
      <Button variant="light" leftIcon={<IconArrowLeft size={16} />} onClick={() => navigate(navigateTo)} mb="xl">
        Back to {backToText}
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
    )
}

export default DetailsLoading;