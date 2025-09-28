import React from 'react'
import Artists from '@/components/Artists/Artists'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScreenWrapper from '@/components/ScreenWrapper';

export default function artists() {
    return(
      <ScreenWrapper>
        <Header />
        
        <Artists />
  
        <Footer />
      </ScreenWrapper>
    )
}

