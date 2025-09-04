import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: MarketingLayoutProps): React.ReactElement {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
