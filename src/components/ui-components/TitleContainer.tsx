import { Button, Group, Title, useMantineTheme, Text, Grid, Skeleton, Image, Stack } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import  CardsCarousel, { Item } from "../ui-components/CardsCarousel"


interface TitleContainerProps{
    context:string,
    contextIcon:ReactNode,
    contextLink:string,
    title:string,
    titleDescription:string,
    isLoading:boolean,
    contextImages:Item[],
    reverseOrder?: boolean
}
const TitleContainer=({
    context,title,titleDescription,contextIcon,contextLink,isLoading, reverseOrder = false,contextImages
}:TitleContainerProps)=>{
    const theme = useMantineTheme()
    
    const contentContainer = (
        <Grid.Col md={7} > 
        <Stack>
            <Title
                order={1}
                size="3rem"
                mb="md"
                ml="xs"
                sx={{
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                    fontWeight: 900,
                }}
            >
                {title} <span style={{ color: theme.colors.brand[6] }}>{context}</span>
            </Title>
            <Text  mb="md" size="md">
                {titleDescription}
            </Text>

        </Stack>
        <Stack>
             <Group >
                <Link to="/ships" style={{ textDecoration: 'none' }}>
                    <Button size="md" leftIcon={contextIcon}>
                        {context}
                    </Button>
                </Link>
                <Button
                    component="a"
                    href={contextLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    leftIcon={<IconExternalLink size={20} />}
                    size="md"
                >
                    Visit AeroMaris {context}
                </Button>
            </Group>

        </Stack>
            
           
        </Grid.Col>
    );

    const imageContainer = (
        <Grid.Col md={5}>
            {isLoading ? (
                <Skeleton height={300} radius="md" />
            ) : (
                <CardsCarousel items={contextImages} imageHiegth={360}/>
            )}
        </Grid.Col>
    );

    return(
        <Grid  align="center" justify='justify-center' gutter="xl">
            {reverseOrder ? [contentContainer, imageContainer] : [imageContainer, contentContainer]}
        </Grid>
    )
}

export default TitleContainer;