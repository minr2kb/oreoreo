import { OreoPiece } from '@/types/oreo';

export const encodeOreo = (oreo: OreoPiece[]): string => {
  // O를 1로, RE를 0으로 변환
  const binaryString = oreo.join('').replace(/O/g, '1').replace(/RE/g, '0');

  // 앞의 0 개수 세기
  const leadingZeros = binaryString.match(/^0*/)?.[0].length || 0;

  // 이진수를 십진수로 변환
  const decimal = parseInt(binaryString, 2);

  return `${leadingZeros}/${decimal}`;
};

export const decodeOreo = (oreo: string): OreoPiece[] => {
  const [leadingZeros, decimal] = oreo.split('/');

  // 십진수를 이진수로 변환
  let binary = Number(decimal).toString(2);

  // 앞에 0 추가
  binary = '0'.repeat(Number(leadingZeros)) + binary;

  // 0을 RE로, 1을 O로 변환
  return binary.split('').map((bit) => (bit === '0' ? 'RE' : 'O'));
};
