import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatGiziIndonesia from "@/components/StatGiziIndonesia";
import AboutSection from "@/components/AboutSection";
import KonsultasiCards from "@/components/KonsultasiCards";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatGiziIndonesia />
      <AboutSection />
      <KonsultasiCards />
      <Footer />
    </main>
  );
}