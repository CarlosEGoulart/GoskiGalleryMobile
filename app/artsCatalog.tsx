// GoskiGallery/app/artsCatalog.tsx
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import ArtDetails from '@/components/Arts/Art';
import Arts from '@/components/Arts/index';
import ScreenWrapper from '@/components/ScreenWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArtistsPage() {
  const { id } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScreenWrapper>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {id ? <ArtDetails art={undefined} /> : <Arts searchQuery={searchQuery} />}
      <Footer />
    </ScreenWrapper>
  );
}
