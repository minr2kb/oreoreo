import { Button, Container, HStack, IconButton, Stack } from '@chakra-ui/react';
import { LuSettings } from 'react-icons/lu';

const ThemePage = () => {
  return (
    <Container maxW="container.lg" py={8}>
      <Stack gap={8}>
        <HStack justifyContent="space-between">
          <IconButton aria-label="설정" variant="ghost">
            <LuSettings />
          </IconButton>
        </HStack>
        <Button variant={'solid'}>테마 변경</Button>
      </Stack>
    </Container>
  );
};

export default ThemePage;
