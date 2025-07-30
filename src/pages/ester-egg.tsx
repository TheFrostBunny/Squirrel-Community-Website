import { EasterEggs } from "@/components/EasterEggs";
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const EasterEggPage = () => {
    return (
        <div>
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#1C1612]">            
        <EasterEggs />
        </div>
        <Footer />
        </div>
    );
    }
export default EasterEggPage;