import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ArtistProfile from '@/components/Artists/Artist';
import Artists from '@/components/Artists/index';
import ScreenWrapper from '@/components/ScreenWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArtistsPage() {
  const { id } = useLocalSearchParams();

  return (
    <ScreenWrapper>
      <Header />
      {id ? <ArtistProfile /> : <Artists />}
      <Footer />
    </ScreenWrapper>
  );
}
