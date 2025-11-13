import { Register } from "@/components/Authenticate";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import usePocketBaseAuth from "@/pocketbase/hooks/usePocketBaseAuth";
import { router } from "expo-router";
import { useEffect } from "react";

export default function RegisterPage() {
  const { user, loading } = usePocketBaseAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/artsCatalog');
    }
  }, [user, loading]);

  return (
    <ScreenWrapper>
      <Header />
      <Register />;
    </ScreenWrapper>
  )
}
