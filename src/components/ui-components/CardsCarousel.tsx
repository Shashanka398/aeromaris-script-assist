import { Card, useMantineTheme, Image, Text, Group } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';
import React from "react";
import { SPACEX_IMAGES } from "../../utils/constants";

export interface Item{
    id:Number
    title:string,
    image:string
}
interface CardsCarouselProps{
   items:Item[],hideTitle?:boolean, imageHiegth?:number
}
const CardsCarousel = ({items,hideTitle=false,imageHiegth=400}:CardsCarouselProps) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const slides = items.map((item, index) => (
    <Carousel.Slide key={index} >
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={item.image}
            height={imageHiegth}
            fit="cover"
            alt={`AeroSpace Image ${index + 1}`}
          />
        </Card.Section>
        {!hideTitle &&<Group position="apart" mt="md" mb="xs">
             <Text weight={500}> {item.title}</Text>
        </Group>}
      </Card>
    </Carousel.Slide>
  ));

  return (
    <Carousel
      withIndicators
      height={500}
      slideSize="100%"
      slideGap={0}
      loop
      align="center"
      slidesToScroll={1}
      styles={{
        control: {
          '&[data-inactive]': {
            opacity: 0,
            cursor: 'default',
          },
        },
        container: {
          width: '100%',
        },
        slide: {
          width: '100%',
        },
      }}
    >
      {slides}
    </Carousel>
  );
};

export default CardsCarousel;