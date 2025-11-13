import { Login } from "@/components/Authenticate";
import Header from '@/components/Header';
import ScreenWrapper from "@/components/ScreenWrapper";
import useAuth from "@/firebase/hooks/useAuth";
import { router } from "expo-router";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/artsCatalog');
    }
  }, [user, loading]);

  return(
    <ScreenWrapper>
      <Header />
      <Login />;
    </ScreenWrapper>
  )
}
