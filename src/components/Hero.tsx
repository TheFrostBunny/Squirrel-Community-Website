import { useState } from 'react';
import { Button } from '@/components/ui/button';
import squirrelMascot from '@/assets/squirrel-mascot.png';
import forestHeroBg from '@/assets/forest-hero-bg.jpg';

export const Hero = () => {
  const [mascotClicks, setMascotClicks] = useState(0);

  const handleMascotClick = () => {
    setMascotClicks(prev => prev + 1);
    // Easter egg for multiple clicks
    if (mascotClicks + 1 === 5) {
      // Trigger special animation or sound
      console.log('🐿️ Squirrel says: "Nuts about you clicking me!"');
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${forestHeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Forest overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-green/20 via-transparent to-moss-green/30"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Mascot */}
        <div 
          className="mb-8 cursor-pointer inline-block squirrel-bounce hover:animate-wiggle transition-all duration-300"
          onClick={handleMascotClick}
        >
          <img 
            src={squirrelMascot} 
            alt="Squirrel Community Mascot" 
            className="w-64 h-64 mx-auto drop-shadow-lg hover:drop-shadow-2xl"
          />
        </div>

        {/* Welcome Message */}
        <div className="card-cozy max-w-2xl mx-auto mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-squirrel-brown mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-autumn-orange to-forest-green bg-clip-text text-transparent">
              Squirrel Community
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            A cozy Discord server where friendship grows like acorns in autumn! 
            Join our wholesome community for gaming, chatting, and endless fun. 🐿️✨
          </p>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="btn-squirrel text-lg px-8 py-4">
            🎮 Join Our Discord
          </Button>
          <Button variant="outline" className="btn-forest text-lg px-8 py-4">
            🌰 Explore Community
          </Button>
        </div>

        {/* Hidden clicks counter for easter egg */}
        {mascotClicks > 0 && (
          <p className="mt-4 text-sm text-autumn-orange animate-pulse">
            {mascotClicks < 5 
              ? `Squirrel happiness: ${mascotClicks}/5 🐿️` 
              : "🎉 Maximum squirrel happiness achieved! 🎉"
            }
          </p>
        )}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 text-4xl leaf-float">🍃</div>
      <div className="absolute top-40 right-20 text-3xl leaf-float animation-delay-1000">🌰</div>
      <div className="absolute bottom-40 left-20 text-2xl leaf-float animation-delay-2000">🍂</div>
      <div className="absolute bottom-20 right-10 text-4xl leaf-float animation-delay-3000">🌿</div>
    </section>
  );
};