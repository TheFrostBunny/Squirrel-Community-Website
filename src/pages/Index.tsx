import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { JoinDiscord } from '@/components/JoinDiscord';
import { SquirrelCare } from '@/components/SquirrelCare';
import { CommunityInfo } from '@/components/CommunityInfo';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <div id="home">
          <Hero />
        </div>
        <JoinDiscord />
        <SquirrelCare />
        <CommunityInfo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
