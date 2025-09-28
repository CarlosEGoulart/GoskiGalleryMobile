import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Arts from "@/components/Arts";
import ScreenWrapper from "@/components/ScreenWrapper";
import React from "react";


export default function CatalogScreen() {
  return(
    <ScreenWrapper>
      <Header />
      
      <Arts />

      <Footer />
    </ScreenWrapper>
  )
}
