import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Gamepad2, Bed, Sparkles, Crown, Star, Apple, Cookie, Fish, Gift, Shirt, Glasses, Award, Zap, TreePine } from 'lucide-react';

interface SquirrelStats {
  name: string;
  level: number;
  happiness: number;
  hunger: number;
  energy: number;
  health: number;
  coins: number;
  nuts: number;
  exp: number;
  maxExp: number;
  personality: string;
  accessories: string[];
  achievements: string[];
  lastFed: number;
  mood: string;
}

export const SquirrelCare = () => {
  const [gameUnlocked, setGameUnlocked] = useState(false);
  const [squirrel, setSquirrel] = useState<SquirrelStats>({
    name: 'Nutkin',
    level: 1,
    happiness: 75,
    hunger: 60,
    energy: 80,
    health: 90,
    coins: 150,
    nuts: 25,
    exp: 0,
    maxExp: 100,
    personality: 'Playful',
    accessories: [],
    achievements: [],
    lastFed: Date.now(),
    mood: 'happy'
  });

  const [inventory] = useState([
    { id: 'acorn', name: 'Acorn', type: 'food', effect: { hunger: 20, happiness: 5 }, cost: 10, icon: '🌰' },
    { id: 'apple', name: 'Apple', type: 'food', effect: { hunger: 30, happiness: 10 }, cost: 15, icon: '🍎' },
    { id: 'cookie', name: 'Cookie', type: 'food', effect: { hunger: 15, happiness: 25 }, cost: 20, icon: '🍪' },
    { id: 'berries', name: 'Berries', type: 'food', effect: { hunger: 25, happiness: 15, health: 10 }, cost: 25, icon: '🫐' },
    { id: 'hat', name: 'Party Hat', type: 'accessory', effect: { happiness: 15 }, cost: 50, icon: '🎩' },
    { id: 'glasses', name: 'Cool Glasses', type: 'accessory', effect: { happiness: 10 }, cost: 30, icon: '🕶️' },
    { id: 'bowtie', name: 'Bow Tie', type: 'accessory', effect: { happiness: 12 }, cost: 40, icon: '🎀' },
    { id: 'crown', name: 'Royal Crown', type: 'accessory', effect: { happiness: 20 }, cost: 100, icon: '👑' }
  ]);

  const [activities] = useState([
    { id: 'fetch', name: 'Play Fetch', energyCost: 20, effect: { happiness: 25, exp: 20 }, icon: '🎾', coins: 5 },
    { id: 'puzzle', name: 'Puzzle Game', energyCost: 15, effect: { happiness: 15, exp: 30 }, icon: '🧩', coins: 8 },
    { id: 'climb', name: 'Tree Climbing', energyCost: 25, effect: { happiness: 20, exp: 25 }, icon: '🌳', coins: 6 },
    { id: 'dance', name: 'Dance Party', energyCost: 10, effect: { happiness: 30, exp: 15 }, icon: '💃', coins: 4 },
    { id: 'hide', name: 'Hide & Seek', energyCost: 18, effect: { happiness: 22, exp: 18 }, icon: '👁️', coins: 7 },
    { id: 'swim', name: 'Swimming', energyCost: 30, effect: { happiness: 35, exp: 35, health: 15 }, icon: '🏊', coins: 10 }
  ]);

  // Auto-decrease stats over time
  useEffect(() => {
    const interval = setInterval(() => {
      setSquirrel(prev => {
        const newHappiness = Math.max(0, prev.happiness - 0.8);
        const newHunger = Math.max(0, prev.hunger - 1.2);
        const newEnergy = Math.max(0, prev.energy - 0.5);
        
        return {
          ...prev,
          hunger: newHunger,
          energy: newEnergy,
          happiness: newHappiness,
          mood: newHappiness > 70 ? 'happy' : newHappiness > 40 ? 'neutral' : 'sad'
        };
      });
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  // Level up system
  useEffect(() => {
    if (squirrel.exp >= squirrel.maxExp) {
      setSquirrel(prev => ({
        ...prev,
        level: prev.level + 1,
        exp: prev.exp - prev.maxExp,
        maxExp: Math.floor(prev.maxExp * 1.5),
        coins: prev.coins + (prev.level * 15),
        nuts: prev.nuts + (prev.level * 2),
        health: Math.min(100, prev.health + 10)
      }));
      
      // Achievement for leveling up
      checkAchievements();
    }
  }, [squirrel.exp, squirrel.maxExp]);

  const checkAchievements = () => {
    const newAchievements = [];
    
    if (squirrel.level >= 5 && !squirrel.achievements.includes('level5')) {
      newAchievements.push('level5');
    }
    if (squirrel.happiness === 100 && !squirrel.achievements.includes('maxHappy')) {
      newAchievements.push('maxHappy');
    }
    if (squirrel.coins >= 500 && !squirrel.achievements.includes('rich')) {
      newAchievements.push('rich');
    }
    
    if (newAchievements.length > 0) {
      setSquirrel(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements],
        coins: prev.coins + (newAchievements.length * 25)
      }));
    }
  };

  const feedSquirrel = (food: any) => {
    if (squirrel.coins >= food.cost) {
      setSquirrel(prev => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + food.effect.hunger),
        happiness: Math.min(100, prev.happiness + (food.effect.happiness || 0)),
        health: Math.min(100, prev.health + (food.effect.health || 0)),
        coins: prev.coins - food.cost,
        exp: prev.exp + 10,
        lastFed: Date.now()
      }));
      checkAchievements();
    }
  };

  const playActivity = (activity: any) => {
    if (squirrel.energy >= activity.energyCost) {
      setSquirrel(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + activity.effect.happiness),
        energy: Math.max(0, prev.energy - activity.energyCost),
        health: Math.min(100, prev.health + (activity.effect.health || 0)),
        exp: prev.exp + activity.effect.exp,
        coins: prev.coins + activity.coins
      }));
      checkAchievements();
    }
  };

  const buyAccessory = (accessory: any) => {
    if (squirrel.coins >= accessory.cost && !squirrel.accessories.includes(accessory.id)) {
      setSquirrel(prev => ({
        ...prev,
        accessories: [...prev.accessories, accessory.id],
        coins: prev.coins - accessory.cost,
        happiness: Math.min(100, prev.happiness + accessory.effect.happiness)
      }));
    }
  };

  const restSquirrel = () => {
    setSquirrel(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 50),
      health: Math.min(100, prev.health + 15),
      happiness: Math.min(100, prev.happiness + 8),
      exp: prev.exp + 5
    }));
  };

  const getMoodEmoji = () => {
    switch (squirrel.mood) {
      case 'happy': return '😊';
      case 'neutral': return '😐';
      case 'sad': return '😢';
      default: return '😊';
    }
  };

  const getPersonalityTrait = () => {
    const traits = ['Playful', 'Curious', 'Sleepy', 'Energetic', 'Friendly', 'Mischievous'];
    return traits[squirrel.level % traits.length];
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
              Advanced Care System!
            </h3>
            <p className="text-muted-foreground mb-6">
              Adopt your virtual squirrel with enhanced features! Feed from multiple foods, 
              play various activities, collect accessories, and unlock achievements.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌰</span>
                <span>Multiple food types</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                <span>6 unique activities</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👑</span>
                <span>Collectible accessories</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <span>Achievement system</span>
              </div>
            </div>
            <Button 
              className="btn-squirrel mt-6"
              onClick={() => setGameUnlocked(true)}
            >
              🎮 Start Advanced Care
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4" id="squirrel-care">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-squirrel-brown mb-4">
            🐿️ {squirrel.name} - Level {squirrel.level}
          </h2>
          <p className="text-xl text-muted-foreground">
            {getPersonalityTrait()} Squirrel • {squirrel.achievements.length} Achievements
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Squirrel Status */}
          <Card className="card-cozy lg:col-span-1">
            <CardHeader className="text-center">
              <div className="relative">
                <div className="text-8xl mb-4 squirrel-bounce">{getMoodEmoji()}</div>
                <div className="absolute -top-2 -right-2 text-2xl">
                  {squirrel.accessories.includes('hat') && '🎩'}
                  {squirrel.accessories.includes('glasses') && '🕶️'}
                  {squirrel.accessories.includes('crown') && '👑'}
                </div>
              </div>
              <CardTitle className="text-squirrel-brown">
                {squirrel.name}
              </CardTitle>
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge variant="secondary">Lv.{squirrel.level}</Badge>
                <Badge variant="outline">{squirrel.coins}💰</Badge>
                <Badge variant="outline">{squirrel.nuts}🌰</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Experience</span>
                  <span className="text-sm">{squirrel.exp}/{squirrel.maxExp}</span>
                </div>
                <Progress value={(squirrel.exp / squirrel.maxExp) * 100} className="h-2" />
              </div>
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
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Health ❤️</span>
                  <span className="text-sm">{Math.round(squirrel.health)}%</span>
                </div>
                <Progress value={squirrel.health} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Activities Tabs */}
          <Card className="card-cozy lg:col-span-2">
            <Tabs defaultValue="activities" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="food">Food</TabsTrigger>
                <TabsTrigger value="shop">Shop</TabsTrigger>
                <TabsTrigger value="achievements">Awards</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activities" className="p-4">
                <h3 className="text-lg font-semibold mb-4">Play Activities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {activities.map((activity) => (
                    <Button
                      key={activity.id}
                      variant="outline"
                      className="h-20 flex flex-col gap-1"
                      onClick={() => playActivity(activity)}
                      disabled={squirrel.energy < activity.energyCost}
                    >
                      <span className="text-2xl">{activity.icon}</span>
                      <span className="text-sm">{activity.name}</span>
                      <span className="text-xs text-muted-foreground">
                        -{activity.energyCost} energy • +{activity.coins}💰
                      </span>
                    </Button>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={restSquirrel}
                >
                  😴 Rest (+50 energy)
                </Button>
              </TabsContent>

              <TabsContent value="food" className="p-4">
                <h3 className="text-lg font-semibold mb-4">Feed Your Squirrel</h3>
                <div className="grid grid-cols-2 gap-3">
                  {inventory.filter(item => item.type === 'food').map((food) => (
                    <Button
                      key={food.id}
                      variant="outline"
                      className="h-20 flex flex-col gap-1"
                      onClick={() => feedSquirrel(food)}
                      disabled={squirrel.coins < food.cost}
                    >
                      <span className="text-2xl">{food.icon}</span>
                      <span className="text-sm">{food.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {food.cost}💰 • +{food.effect.hunger}🍽️
                      </span>
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shop" className="p-4">
                <h3 className="text-lg font-semibold mb-4">Accessory Shop</h3>
                <div className="grid grid-cols-2 gap-3">
                  {inventory.filter(item => item.type === 'accessory').map((accessory) => (
                    <Button
                      key={accessory.id}
                      variant={squirrel.accessories.includes(accessory.id) ? "default" : "outline"}
                      className="h-20 flex flex-col gap-1"
                      onClick={() => buyAccessory(accessory)}
                      disabled={squirrel.coins < accessory.cost || squirrel.accessories.includes(accessory.id)}
                    >
                      <span className="text-2xl">{accessory.icon}</span>
                      <span className="text-sm">{accessory.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {squirrel.accessories.includes(accessory.id) ? 'Owned' : `${accessory.cost}💰`}
                      </span>
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="p-4">
                <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg border ${squirrel.achievements.includes('level5') ? 'bg-primary/20 border-primary' : 'bg-muted/50'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <p className="font-medium">Level 5 Master</p>
                        <p className="text-sm text-muted-foreground">Reach level 5</p>
                      </div>
                      {squirrel.achievements.includes('level5') && <Badge className="ml-auto">✓</Badge>}
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${squirrel.achievements.includes('maxHappy') ? 'bg-primary/20 border-primary' : 'bg-muted/50'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">😊</span>
                      <div>
                        <p className="font-medium">Pure Joy</p>
                        <p className="text-sm text-muted-foreground">Reach 100% happiness</p>
                      </div>
                      {squirrel.achievements.includes('maxHappy') && <Badge className="ml-auto">✓</Badge>}
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${squirrel.achievements.includes('rich') ? 'bg-primary/20 border-primary' : 'bg-muted/50'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💰</span>
                      <div>
                        <p className="font-medium">Wealthy Squirrel</p>
                        <p className="text-sm text-muted-foreground">Collect 500 coins</p>
                      </div>
                      {squirrel.achievements.includes('rich') && <Badge className="ml-auto">✓</Badge>}
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Earn +25💰 for each achievement unlocked!
                </p>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
};