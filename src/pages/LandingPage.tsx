import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { UploadSection } from "../components/UploadSection";
import { ChatInterface } from "../components/ChatInterface";
import { About } from "../components/About";
import { Footer } from "../components/Footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden antialiased">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none"></div>
      
      {/* Vignette Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>
      
      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <HowItWorks />
          <UploadSection />
          <ChatInterface />
          <About />
        </main>
        <Footer />
      </div>
    </div>
  );
}
