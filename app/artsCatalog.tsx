// GoskiGallery/app/artsCatalog.tsx
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Art from '@/components/Arts/Art';
import Arts from '@/components/Arts/index';
import ScreenWrapper from '@/components/ScreenWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import usePocketBaseDocument from '@/pocketbase/hooks/usePocketBaseDocument';

export default function ArtistsPage() {
  const { id } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: art, loading } = usePocketBaseDocument('arts', id as string);

  return (
    <ScreenWrapper>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {id ? <Art art={art} /> : <Arts searchQuery={searchQuery} />}
      <Footer />
    </ScreenWrapper>
  );
}
