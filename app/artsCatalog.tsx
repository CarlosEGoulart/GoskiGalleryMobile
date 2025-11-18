// GoskiGallery/app/artsCatalog.tsx
import Art from '@/components/Arts/Art';
import Arts from '@/components/Arts/index';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScreenWrapper from '@/components/ScreenWrapper';
import usePocketBaseDocument from '@/pocketbaseFiles/hooks/usePocketBaseDocument';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';

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
