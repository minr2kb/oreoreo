import { Box, Stack, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import Wave from 'react-wavify';

const ANIMATION_DURATION = 1000;

const float = keyframes`
  0% { 
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(-2deg);
  }
  50% { 
    transform: translateY(-20px) rotate(0deg);
  }
  75% {
    transform: translateY(-10px) rotate(2deg);
  }
  100% { 
    transform: translateY(0px) rotate(0deg);
  }
`;

const Milk = ({ isOpen }: { isOpen: boolean }) => {
  const floatingAnimation = `${float} 4s ease-in-out infinite`;

  return (
    <Stack
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      height="80vh"
      zIndex={1000}
      gap={0}
      transform={isOpen ? 'translateY(0)' : 'translateY(100%)'}
      transition={`all ${ANIMATION_DURATION}ms ease-in-out`}
    >
      <Wave
        fill="white"
        paused={false}
        style={{ display: 'flex' }}
        options={{
          height: 30,
          amplitude: 20,
          speed: 0.5,
          points: 3,
        }}
      />
      <Box w={'full'} flex={1} background="white" alignItems="center" justifyContent="center">
        <Text fontSize="5xl" fontWeight="bold" textAlign={'center'} color="gray.300" animation={floatingAnimation}>
          Yummy!
        </Text>
      </Box>
    </Stack>
  );
};

export default Milk;
