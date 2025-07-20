import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import squirrelMascot from '@/assets/squirrel-mascot.png';
import forestHeroBg from '@/assets/forest-hero-bg.jpg';
import { useText } from '@/hooks/useText';

export const Hero = () => {
  const [mascotClicks, setMascotClicks] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { getText } = useText();

  // Parallax mouse effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fade in animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMascotClick = () => {
    setMascotClicks(prev => prev + 1);
    // Easter egg for multiple clicks
    if (mascotClicks + 1 === 5) {
      console.log(getText('hero.easterEgg'));
    }
  };

  const handleJoinDiscord = () => {
    window.open('https://discord.gg/squirrel-community', '_blank');
  };

  const scrollToCommunity = () => {
    document.getElementById('join-discord')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url(${forestHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 5}px) scale(1.1)`,
        }}
      />
      
      {/* Multi-layer forest overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-green/30 via-transparent to-background/60"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-moss-green/20 via-transparent to-autumn-orange/20"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-2xl opacity-70 leaf-float`}
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              transform: `translate(${mousePosition.x * (5 + i)}px, ${mousePosition.y * (3 + i)}px)`,
            }}
          >
            {['🍃', '🌰', '🍂', '🌿', '🐿️', '✨', '🍁', '🌾'][i]}
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div 
        className={`relative z-10 text-center max-w-6xl mx-auto px-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Community Badge */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Badge className="bg-gradient-to-r from-autumn-orange/90 to-forest-green/90 text-white px-6 py-2 text-sm font-medium">
            {getText('hero.badge')}
          </Badge>
        </div>

        {/* Mascot with enhanced interactions */}
        <div 
          className="mb-8 cursor-pointer inline-block group relative"
          onClick={handleMascotClick}
          style={{ animationDelay: '0.4s' }}
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-autumn-orange/30 to-forest-green/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            
            {/* Main mascot */}
            <img 
              src={squirrelMascot} 
              alt={getText('hero.mascot.alt')} 
              className={`relative w-80 h-80 mx-auto drop-shadow-2xl transition-all duration-500 group-hover:scale-110 ${
                mascotClicks > 3 ? 'animate-wiggle' : 'squirrel-bounce'
              }`}
              style={{
                transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 4}px)`,
              }}
            />
            
            {/* Floating hearts on click */}
            {mascotClicks > 0 && (
              <div className="absolute -top-4 -right-4 text-2xl animate-bounce">
                {'❤️'.repeat(Math.min(mascotClicks, 3))}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Welcome Message */}
        <div 
          className="mb-12 animate-fade-in" 
          style={{ animationDelay: '0.6s' }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="block text-squirrel-brown mb-2">{getText('hero.title.welcomeTo')}</span>
            <span className="block bg-gradient-to-r from-autumn-orange via-forest-green to-moss-green bg-clip-text text-transparent">
              {getText('hero.title.squirrelCommunity')}
            </span>
          </h1>
          
          <div className="card-cozy max-w-3xl mx-auto backdrop-blur-md bg-card/70">
            <p className="text-2xl md:text-3xl text-muted-foreground mb-6 leading-relaxed">
              {getText('hero.description.main')}
            </p>
            <p className="text-lg text-muted-foreground">
              {getText('hero.description.subtitle')}
              <br />
              <span className="text-forest-green font-medium">{getText('hero.description.welcome')}</span>
            </p>
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          <Button 
            className="btn-squirrel text-xl px-12 py-6 shadow-glow hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={handleJoinDiscord}
          >
            <span className="mr-2">🎮</span>
            {getText('hero.buttons.joinDiscord')}
            <span className="ml-2">✨</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="text-xl px-10 py-6 bg-card/70 backdrop-blur-sm border-2 border-forest-green/30 hover:border-forest-green hover:bg-forest-green/10 transition-all duration-300"
            onClick={scrollToCommunity}
          >
            <span className="mr-2">🌰</span>
            {getText('hero.buttons.exploreCommunity')}
          </Button>
        </div>

        {/* Enhanced click counter */}
        {mascotClicks > 0 && (
          <div 
            className="mt-8 animate-fade-in"
            style={{ animationDelay: '1s' }}
          >
            <div className="card-cozy max-w-sm mx-auto bg-gradient-to-r from-autumn-orange/10 to-forest-green/10">
              <p className="text-lg font-medium text-squirrel-brown">
                {mascotClicks < 5 
                  ? (
                    <>
                      <span className="text-2xl mr-2">🐿️</span>
                      {getText('hero.mascot.happiness', { count: mascotClicks })}
                      <span className="ml-2">{'⭐'.repeat(mascotClicks)}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl mr-2">🎉</span>
                      {getText('hero.mascot.maxHappiness')}
                      <span className="ml-2">🌟✨🎊</span>
                    </>
                  )
                }
              </p>
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          style={{ animationDelay: '1.2s' }}
        >
          <div className="text-muted-foreground text-center">
            <div className="text-sm mb-2">{getText('hero.scrollIndicator')}</div>
            <div className="text-2xl">⬇️</div>
          </div>
        </div>
      </div>
    </section>
  );
};