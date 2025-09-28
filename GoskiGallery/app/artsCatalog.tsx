import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ArtDetails from '@/components/Arts/Art';
import Arts from '@/components/Arts/index';
import ScreenWrapper from '@/components/ScreenWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArtistsPage() {
  const { id } = useLocalSearchParams();

  return (
    <ScreenWrapper>
      <Header />
      {id ? <ArtDetails /> : <Arts />}
      <Footer />
    </ScreenWrapper>
  );
}
