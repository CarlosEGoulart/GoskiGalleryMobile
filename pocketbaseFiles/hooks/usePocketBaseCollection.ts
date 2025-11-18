import { usePocketBaseStore } from '@/pocketbaseFiles/stores/usePocketBaseStore';
import { useEffect, useState } from 'react';

const usePocketBaseCollection = (collection) => {
  const { pocketBase } = usePocketBaseStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      try {
        const records = await pocketBase.collection(collection).getFullList();
        setData(records);
      } catch (error) {
        console.error('Error fetching collection:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collection]);

  return { data, loading };
};

export default usePocketBaseCollection;
