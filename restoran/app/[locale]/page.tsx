import Hero from "@/features/pages/hero";
import MenuSection from "@/features/pages/menu";
import Restoran from "@/features/pages/restoran";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <MenuSection />
      <Restoran />
    </main>
  );
}
