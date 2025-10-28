import { Register } from "@/components/Authenticate";
import Header from "@/components/Header"
import ScreenWrapper from "@/components/ScreenWrapper";

export default function RegisterPage() {
  return (
    <ScreenWrapper>
      <Header />
      <Register />;
    </ScreenWrapper>
  )
}
