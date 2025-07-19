import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EasterEgg {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'legendary';
  reward?: string;
}

export const EasterEggs = () => {
  const [easterEggs, setEasterEggs] = useState<EasterEgg[]>([
    {
      id: 'konami',
      name: 'Konami Code',
      description: 'Found the secret gaming reference!',
      emoji: '🎮',
      unlocked: false,
      rarity: 'legendary',
      reward: '100 bonus nuts'
    },
    {
      id: 'triple-click',
      name: 'Persistent Clicker',
      description: 'Clicked the squirrel 10 times in a row',
      emoji: '🖱️',
      unlocked: false,
      rarity: 'common',
      reward: '25 nuts'
    },
    {
      id: 'midnight',
      name: 'Night Owl',
      description: 'Visited during midnight hours',
      emoji: '🌙',
      unlocked: false,
      rarity: 'rare',
      reward: 'Special night theme'
    },
    {
      id: 'disco',
      name: 'Disco Fever',
      description: 'Made the squirrel dance for 30 seconds',
      emoji: '🕺',
      unlocked: false,
      rarity: 'rare',
      reward: 'Dance animation'
    },
    {
      id: 'secret-message',
      name: 'Hidden Message',
      description: 'Found the secret message in the footer',
      emoji: '📜',
      unlocked: false,
      rarity: 'common',
      reward: '15 nuts'
    },
    {
      id: 'rainbow',
      name: 'Rainbow Hunter',
      description: 'Triggered the rainbow effect',
      emoji: '🌈',
      unlocked: false,
      rarity: 'legendary',
      reward: 'Rainbow squirrel skin'
    }
  ]);

  const [konamiSequence] = useState(['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']);
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEggModal, setShowEasterEggModal] = useState<EasterEgg | null>(null);

  // Konami Code Detection
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setCurrentSequence(prev => {
        const newSequence = [...prev, event.code].slice(-konamiSequence.length);
        
        if (newSequence.length === konamiSequence.length && 
            newSequence.every((key, index) => key === konamiSequence[index])) {
          unlockEasterEgg('konami');
          return [];
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiSequence]);

  // Midnight Detection
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    if ((hour >= 23 || hour <= 1) && !easterEggs.find(e => e.id === 'midnight')?.unlocked) {
      unlockEasterEgg('midnight');
    }
  }, []);

  const unlockEasterEgg = (id: string) => {
    setEasterEggs(prev => prev.map(egg => 
      egg.id === id ? { ...egg, unlocked: true } : egg
    ));
    
    const egg = easterEggs.find(e => e.id === id);
    if (egg && !egg.unlocked) {
      setShowEasterEggModal(egg);
      
      // Add celebration effect
      document.body.style.animation = 'rainbow-flash 2s ease-in-out';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 2000);
    }
  };

  // Click counter for squirrel
  const handleSquirrelClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 10 && !easterEggs.find(e => e.id === 'triple-click')?.unlocked) {
        unlockEasterEgg('triple-click');
        return 0;
      }
      return newCount;
    });
    
    // Reset after 2 seconds of no clicks
    setTimeout(() => {
      setClickCount(0);
    }, 2000);
  };

  // Rainbow trigger (secret combination)
  const triggerRainbow = () => {
    if (!easterEggs.find(e => e.id === 'rainbow')?.unlocked) {
      unlockEasterEgg('rainbow');
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'rare': return 'bg-blue-500/20 text-blue-700 dark:text-blue-300';
      case 'legendary': return 'bg-purple-500/20 text-purple-700 dark:text-purple-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  const unlockedCount = easterEggs.filter(egg => egg.unlocked).length;

  return (
    <>
      {/* Hidden Easter Egg Elements */}
      <div className="hidden">
        <div 
          id="secret-squirrel-clicker"
          onClick={handleSquirrelClick}
          className="cursor-pointer"
        />
        <button
          id="rainbow-trigger"
          onClick={triggerRainbow}
          onKeyDown={(e) => {
            if (e.key === 'r' && e.ctrlKey && e.shiftKey) {
              triggerRainbow();
            }
          }}
        />
      </div>

      {/* Easter Egg Collection Display */}
      <section className="py-20 px-4" id="easter-eggs">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-squirrel-brown mb-4">
              🥚 Easter Egg Collection
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              Hidden secrets and surprises around the site!
            </p>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {unlockedCount}/{easterEggs.length} Discovered
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {easterEggs.map((egg) => (
              <Card 
                key={egg.id} 
                className={`card-cozy transition-all duration-300 ${
                  egg.unlocked 
                    ? 'border-primary/50 shadow-lg' 
                    : 'opacity-60 hover:opacity-80'
                }`}
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">
                    {egg.unlocked ? egg.emoji : '❓'}
                  </div>
                  <CardTitle className={egg.unlocked ? '' : 'blur-sm'}>
                    {egg.unlocked ? egg.name : '???'}
                  </CardTitle>
                  <div className="flex justify-center gap-2">
                    <Badge className={getRarityColor(egg.rarity)}>
                      {egg.rarity}
                    </Badge>
                    {egg.unlocked && (
                      <Badge variant="default">Unlocked!</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className={egg.unlocked ? '' : 'blur-sm'}>
                    {egg.unlocked ? egg.description : 'Keep exploring to unlock this secret!'}
                  </CardDescription>
                  {egg.unlocked && egg.reward && (
                    <p className="text-sm font-medium text-primary mt-2">
                      Reward: {egg.reward}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="card-cozy max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>🔍 Hunt for More!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• Try clicking things multiple times</p>
                  <p>• Use keyboard combinations</p>
                  <p>• Visit at different times of day</p>
                  <p>• Look for hidden messages</p>
                  <p>• Explore every corner of the site</p>
                  <p>• Join our Discord for clues!</p>
                </div>
                <Button className="mt-4" variant="outline">
                  🕵️ Need a Hint?
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Easter Egg Unlock Modal */}
      {showEasterEggModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full animate-scale-in">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">{showEasterEggModal.emoji}</div>
              <CardTitle className="text-2xl text-primary">
                Easter Egg Unlocked!
              </CardTitle>
              <CardDescription className="text-lg">
                {showEasterEggModal.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                {showEasterEggModal.description}
              </p>
              {showEasterEggModal.reward && (
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="font-medium text-primary">
                    Reward: {showEasterEggModal.reward}
                  </p>
                </div>
              )}
              <Button 
                onClick={() => setShowEasterEggModal(null)}
                className="w-full"
              >
                Awesome! 🎉
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};