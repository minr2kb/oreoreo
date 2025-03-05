import { Box, Stack } from '@chakra-ui/react';

import { OreoPiece } from '@/types/oreo';
import { keyframes } from '@emotion/react';

type OreoProps = {
  pieces: OreoPiece[];
  width?: number;
  height?: number;
  disableAnimation?: boolean;
};

const dropAnimation = keyframes`
  from { transform: translateY(-200px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Oreo = ({ pieces, width = 200, height = 25, disableAnimation = false }: OreoProps) => {
  return (
    <Stack w="full" h={'full'} maxW={`${width}px`} flexDir={'column-reverse'} alignContent={'flex-end'} gap={0}>
      {pieces.map((piece, index) =>
        piece === 'O' ? (
          <Box
            key={index}
            w="full"
            h={`${height}px`}
            bg={'blackAlpha.900'}
            borderRadius="lg"
            boxShadow="inset 0 0 3px 0 rgba(255, 255, 255, 0.2)"
            animation={disableAnimation ? undefined : `${dropAnimation} 0.2s ease-out backwards`}
          />
        ) : (
          <Box
            key={index}
            w="full"
            h={`${height}px`}
            bg="white"
            borderRadius="lg"
            boxShadow="inset 0 0 3px 0 rgba(0, 0, 0, 0.2)"
            animation={disableAnimation ? undefined : `${dropAnimation} 0.2s ease-out backwards`}
          />
        ),
      )}
    </Stack>
  );
};

export default Oreo;
