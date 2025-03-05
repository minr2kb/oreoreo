import { Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { OreoPiece, OreoSequence } from '@/types/oreo';
import { useCallback, useEffect, useState } from 'react';
import Oreo from '@/components/Oreo';
import { EmptyState } from '@/components/ui/empty-state';
import Milk from '@/components/Milk';
import { delay } from '@/utils/delay';

import { useNavigate, useParams } from 'react-router-dom';

const SOUND_DURATIONS = {
  o: 130,
  re: 120,
  ore: 200,
  reo: 220,
  oreo: 300,
  milk: 3000,
} as const;

const HomePage = () => {
  const { id: oreoParam } = useParams();
  const navigate = useNavigate();
  const [oreo, setOreo] = useState<OreoPiece[]>([]);
  const [isMilkOpen, setIsMilkOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const playSound = async (soundName: keyof typeof SOUND_DURATIONS): Promise<void> => {
    const audio = new Audio(`/assets/sounds/${soundName}.mp3`);
    await audio.play().catch(console.error);
    await delay(SOUND_DURATIONS[soundName]);
  };

  const addO = () => {
    playSound('o');
    setOreo((prev) => [...prev, 'O']);
    console.log('O');
  };

  const addRE = () => {
    playSound('re');
    setOreo((prev) => [...prev, 'RE']);
    console.log('RE');
  };

  const optimizeOreoSequence = useCallback((pieces: OreoPiece[]): OreoSequence[] => {
    const joined = pieces.join('');
    const result: OreoSequence[] = [];

    let i = 0;
    while (i < joined.length) {
      if (joined.slice(i, i + 4) === 'OREO') {
        result.push('OREO');
        i += 4;
      } else if (joined.slice(i, i + 3) === 'ORE') {
        result.push('ORE');
        i += 3;
      } else if (joined.slice(i, i + 3) === 'REO') {
        result.push('REO');
        i += 3;
      } else if (joined.slice(i, i + 2) === 'RE') {
        result.push('RE');
        i += 2;
      } else if (joined[i] === 'O') {
        result.push('O');
        i += 1;
      }
    }

    return result;
  }, []);

  const readResult = useCallback(async () => {
    const optimizedSequence = optimizeOreoSequence(oreo);

    for (const piece of optimizedSequence) {
      await playSound(piece.toLowerCase() as 'o' | 're' | 'reo' | 'oreo');
    }
  }, [optimizeOreoSequence, oreo]);

  const resetOreo = useCallback(async () => {
    playSound('milk');
    setIsMilkOpen(true);
    const startTime = Date.now();

    await readResult();

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(3000 - elapsedTime, 0);
    await delay(remainingTime);
    setOreo([]);
    setIsMilkOpen(false);
  }, [readResult]);

  const isOreoEmpty = oreo.length === 0;

  const oreoText = isOreoEmpty ? 'OREOREO' : oreo.join('');

  useEffect(() => {
    navigate(`/${oreo.join('')}`, { replace: true });
  }, [oreo, navigate]);

  useEffect(() => {
    if (!oreoParam || isInitialized) {
      return;
    }

    const splitted: OreoPiece[] = [];

    for (let i = 0; i < oreoParam.length; i += 1) {
      if (oreoParam[i] === 'O') {
        splitted.push('O');
      } else if (oreoParam[i] === 'R') {
        splitted.push('RE');
        i += 1;
      }
    }

    setOreo(splitted);
    setIsInitialized(true);
  }, [oreoParam, isInitialized]);

  return (
    <Stack gap={4} w="full" alignItems="center" maxW="400px" mx="auto" p={4} h="100dvh">
      {/* 타이틀 */}
      <Stack w="full" alignItems="center" mt={20} mb={10}>
        <Heading w="full" fontSize="2xl" fontWeight="bold" flexWrap={'wrap'} textAlign={'center'}>
          {oreoText}
        </Heading>
        {isOreoEmpty && (
          <Text fontSize="md" color="gray.900">
            Create your own OREOREO
          </Text>
        )}
      </Stack>

      {/* 오레오 */}
      <HStack w="full" flex={1} justifyContent="center" position="relative" overflow="hidden">
        {isOreoEmpty ? <EmptyState title="" description="Add O or RE to start" /> : <Oreo pieces={oreo} />}
      </HStack>

      {/* 버튼 */}
      <Stack w="full" gap={4}>
        <Button variant={'ghost'} onClick={resetOreo} disabled={isOreoEmpty}>
          Dunk in milk!
        </Button>
        <HStack w="full" gap={4}>
          <Button flex={1} size={'xl'} onClick={addO}>
            O
          </Button>
          <Button variant="surface" flex={1} size={'xl'} onClick={addRE}>
            RE
          </Button>
        </HStack>
      </Stack>
      <Milk isOpen={isMilkOpen} />
    </Stack>
  );
};

export default HomePage;
