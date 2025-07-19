import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { JoinDiscord } from '@/components/JoinDiscord';
import { SquirrelCare } from '@/components/SquirrelCare';
import { CommunityInfo } from '@/components/CommunityInfo';
import { Footer } from '@/components/Footer';
import { FloatingSquirrels } from '@/components/FloatingSquirrels';
import { SquirrelNeighborhood } from '@/components/SquirrelNeighborhood';
import { EasterEggs } from '@/components/EasterEggs';
import { GameCenter } from '@/components/GameCenter';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingSquirrels />
      <Navigation />
      <main>
        <div id="home">
          <Hero />
        </div>
        <JoinDiscord />
        <SquirrelCare />
        <GameCenter />
        <SquirrelNeighborhood />
        <CommunityInfo />
        <EasterEggs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
