import { useEffect, useState } from 'react';

import { OreoPiece } from '@/types/oreo';
import { encodeOreo } from '@/utils/oreoCode';
import { decodeOreo } from '@/utils/oreoCode';
import { useCallback } from 'react';

const OREO_LIST_KEY = 'oreo-list';

const useOreoList = () => {
  const [oreoList, setOreoList] = useState<OreoPiece[][]>([]);

  const addOreoList = useCallback(
    (oreo: OreoPiece[]) => {
      const newOreoList = [...oreoList, oreo];
      setOreoList(newOreoList);
      const encoded = newOreoList.map(encodeOreo);
      localStorage.setItem(OREO_LIST_KEY, JSON.stringify(encoded));
    },
    [oreoList],
  );

  const loadOreoList = useCallback(() => {
    const encoded = localStorage.getItem(OREO_LIST_KEY);
    if (encoded) {
      const decoded = (JSON.parse(encoded) as string[]).map(decodeOreo);
      setOreoList(decoded);
    }
  }, []);

  const resetOreoList = useCallback(() => {
    localStorage.removeItem(OREO_LIST_KEY);
    setOreoList([]);
  }, []);

  useEffect(() => {
    loadOreoList();
  }, []);

  return { oreoList, addOreoList, loadOreoList, resetOreoList };
};

export default useOreoList;
