import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface SquirrelStats {
  name: string;
  happiness: number;
  hunger: number;
  energy: number;
  level: number;
  nuts: number;
}

export const SquirrelCare = () => {
  const [squirrel, setSquirrel] = useState<SquirrelStats>({
    name: 'Nutkin',
    happiness: 75,
    hunger: 60,
    energy: 80,
    level: 1,
    nuts: 5
  });

  const [lastFed, setLastFed] = useState<number>(Date.now());
  const [gameUnlocked, setGameUnlocked] = useState(false);

  // Simulate stat decay over time
  useEffect(() => {
    const interval = setInterval(() => {
      setSquirrel(prev => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 1),
        energy: Math.max(0, prev.energy - 0.5),
        happiness: Math.max(0, prev.happiness - 0.3)
      }));
    }, 30000); // Update every 30 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const feedSquirrel = () => {
    if (squirrel.nuts > 0) {
      setSquirrel(prev => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 25),
        happiness: Math.min(100, prev.happiness + 10),
        nuts: prev.nuts - 1
      }));
      setLastFed(Date.now());
    }
  };

  const playWithSquirrel = () => {
    if (squirrel.energy > 20) {
      setSquirrel(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 20),
        energy: Math.max(0, prev.energy - 20)
      }));
    }
  };

  const restSquirrel = () => {
    setSquirrel(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 30),
      happiness: Math.min(100, prev.happiness + 5)
    }));
  };

  const getSquirrelMood = () => {
    if (squirrel.happiness > 80) return { emoji: '😊', mood: 'Ecstatic' };
    if (squirrel.happiness > 60) return { emoji: '😄', mood: 'Happy' };
    if (squirrel.happiness > 40) return { emoji: '😐', mood: 'Content' };
    if (squirrel.happiness > 20) return { emoji: '😔', mood: 'Sad' };
    return { emoji: '😢', mood: 'Very Sad' };
  };

  const unlockGame = () => {
    setGameUnlocked(true);
  };

  if (!gameUnlocked) {
    return (
      <section className="py-20 px-4" id="squirrel-care">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-squirrel-brown mb-8">
            🐿️ Squirrel Care Mini-Game
          </h2>
          <div className="card-cozy max-w-2xl mx-auto">
            <div className="text-8xl mb-6 squirrel-bounce">🐿️</div>
            <h3 className="text-2xl font-bold text-squirrel-brown mb-4">
              Coming Soon!
            </h3>
            <p className="text-muted-foreground mb-6">
              Get ready to adopt your very own virtual squirrel! Feed, play, and watch it grow. 
              Each squirrel has unique personalities and unlockable accessories.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">🌰</span>
                <span>Collect nuts and treats</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">🏠</span>
                <span>Decorate your squirrel's nest</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">👥</span>
                <span>Visit friends' squirrels</span>
              </div>
            </div>
            <Button 
              className="btn-squirrel mt-6"
              onClick={unlockGame}
            >
              🎮 Try Beta Version
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const mood = getSquirrelMood();

  return (
    <section className="py-20 px-4" id="squirrel-care">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-squirrel-brown mb-4">
            🐿️ Your Squirrel: {squirrel.name}
          </h2>
          <p className="text-xl text-muted-foreground">
            Take care of your virtual squirrel friend!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Squirrel Display */}
          <Card className="card-cozy">
            <CardHeader className="text-center">
              <div className="text-8xl mb-4 squirrel-bounce">{mood.emoji}</div>
              <CardTitle className="text-squirrel-brown">
                {squirrel.name} is {mood.mood}
              </CardTitle>
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">Level {squirrel.level}</Badge>
                <Badge variant="outline">{squirrel.nuts} 🌰</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Happiness 😊</span>
                    <span className="text-sm">{Math.round(squirrel.happiness)}%</span>
                  </div>
                  <Progress value={squirrel.happiness} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Hunger 🍽️</span>
                    <span className="text-sm">{Math.round(squirrel.hunger)}%</span>
                  </div>
                  <Progress value={squirrel.hunger} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Energy ⚡</span>
                    <span className="text-sm">{Math.round(squirrel.energy)}%</span>
                  </div>
                  <Progress value={squirrel.energy} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="card-cozy">
            <CardHeader>
              <CardTitle className="text-squirrel-brown">Care Actions</CardTitle>
              <CardDescription>
                Keep your squirrel happy and healthy!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="btn-squirrel w-full"
                onClick={feedSquirrel}
                disabled={squirrel.nuts === 0}
              >
                🌰 Feed Acorn ({squirrel.nuts} left)
              </Button>
              <Button 
                className="btn-forest w-full"
                onClick={playWithSquirrel}
                disabled={squirrel.energy < 20}
              >
                🎮 Play Together
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={restSquirrel}
              >
                😴 Let Rest
              </Button>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground text-center">
                  Join our Discord to unlock more features, trade nuts with friends, 
                  and participate in squirrel competitions!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};