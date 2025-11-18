import { usePocketBaseStore } from '@/pocketbaseFiles/stores/usePocketBaseStore';
import { useEffect, useState } from 'react';

const usePocketBaseDocument = (collection, id) => {
  const { pocketBase } = usePocketBaseStore();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      try {
        const document = await pocketBase.collection(collection).getOne(id);
        setData(document);
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDocument();
    }
  }, [collection, id]);

  return { data, loading };
};

export default usePocketBaseDocument;
