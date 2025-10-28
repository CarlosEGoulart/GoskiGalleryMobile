import { Login } from "@/components/Authenticate";
import Header from '@/components/Header';
import ScreenWrapper from "@/components/ScreenWrapper";

export default function LoginPage() {
  return(
    <ScreenWrapper>
      <Header />
      <Login />;
    </ScreenWrapper>
  )
}
