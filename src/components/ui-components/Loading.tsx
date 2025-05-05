import { Skeleton, Stack } from "@mantine/core";

const Loading =()=>{
    return (
        <Stack spacing="md">
            <Skeleton height={50} width="70%" radius="md" />
            <Skeleton height={20} radius="md" />
            <Skeleton height={20} radius="md" />
            <Skeleton height={20} width="90%" radius="md" />
            <Skeleton height={36} width={120} mt="md" radius="md" />
        </Stack>
    )
}

export default Loading;