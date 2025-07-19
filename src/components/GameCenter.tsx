import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gamepad2, Target, Zap, Brain, Trophy, Timer, Star } from 'lucide-react';

interface MiniGame {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rewards: {
    nuts: number;
    coins: number;
    exp: number;
  };
}

interface GameScore {
  gameId: string;
  score: number;
  timestamp: Date;
}

export const GameCenter = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameScores, setGameScores] = useState<GameScore[]>([]);
  const [nutCatchScore, setNutCatchScore] = useState(0);
  const [nutCatchPosition, setNutCatchPosition] = useState(50);
  const [fallingNuts, setFallingNuts] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [gameTime, setGameTime] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);

  // Memory Game States
  const [memoryCards, setMemoryCards] = useState<Array<{id: number, symbol: string, flipped: boolean, matched: boolean}>>([]);
  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);

  // Quick Click Game States
  const [clickTargets, setClickTargets] = useState<Array<{id: number, x: number, y: number, active: boolean}>>([]);
  const [clickScore, setClickScore] = useState(0);
  const [clickTimeLeft, setClickTimeLeft] = useState(15);

  const miniGames: MiniGame[] = [
    {
      id: 'nut-catch',
      name: 'Nut Catcher',
      description: 'Catch falling acorns with your basket!',
      icon: '🌰',
      difficulty: 'easy',
      rewards: { nuts: 10, coins: 5, exp: 15 }
    },
    {
      id: 'memory-match',
      name: 'Squirrel Memory',
      description: 'Match pairs of forest symbols!',
      icon: '🧠',
      difficulty: 'medium',
      rewards: { nuts: 15, coins: 10, exp: 25 }
    },
    {
      id: 'quick-click',
      name: 'Lightning Reflexes',
      description: 'Click the targets before they disappear!',
      icon: '⚡',
      difficulty: 'hard',
      rewards: { nuts: 20, coins: 15, exp: 35 }
    },
    {
      id: 'tree-jump',
      name: 'Tree Jumping',
      description: 'Help the squirrel jump between branches!',
      icon: '🌳',
      difficulty: 'medium',
      rewards: { nuts: 12, coins: 8, exp: 20 }
    }
  ];

  // Nut Catch Game Logic
  useEffect(() => {
    if (activeGame === 'nut-catch' && isPlaying && gameTime > 0) {
      const gameInterval = setInterval(() => {
        setGameTime(prev => prev - 1);
        
        // Add new falling nut
        if (Math.random() < 0.3) {
          setFallingNuts(prev => [...prev, {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: 0
          }]);
        }
        
        // Move nuts down
        setFallingNuts(prev => prev.map(nut => ({
          ...nut,
          y: nut.y + 5
        })).filter(nut => nut.y < 100));
      }, 100);

      return () => clearInterval(gameInterval);
    } else if (gameTime === 0 && isPlaying) {
      endGame('nut-catch', nutCatchScore);
    }
  }, [activeGame, isPlaying, gameTime, nutCatchScore]);

  // Memory Game Setup
  const setupMemoryGame = () => {
    const symbols = ['🌰', '🍄', '🌿', '🐿️', '🌳', '🍂', '🌲', '⭐'];
    const cards = [];
    
    for (let i = 0; i < 8; i++) {
      cards.push(
        { id: i * 2, symbol: symbols[i], flipped: false, matched: false },
        { id: i * 2 + 1, symbol: symbols[i], flipped: false, matched: false }
      );
    }
    
    setMemoryCards(cards.sort(() => Math.random() - 0.5));
    setMemoryFlipped([]);
    setMemoryMoves(0);
  };

  // Quick Click Game Setup
  const setupQuickClickGame = () => {
    setClickTargets([]);
    setClickScore(0);
    setClickTimeLeft(15);
    
    const interval = setInterval(() => {
      if (clickTimeLeft > 0) {
        setClickTargets(prev => {
          const newTargets = prev.filter(target => target.active);
          
          // Add new target
          if (Math.random() < 0.6) {
            newTargets.push({
              id: Date.now(),
              x: Math.random() * 80 + 10,
              y: Math.random() * 80 + 10,
              active: true
            });
          }
          
          return newTargets;
        });
        
        setClickTimeLeft(prev => prev - 1);
      } else {
        clearInterval(interval);
        endGame('quick-click', clickScore);
      }
    }, 1000);
  };

  const startGame = (gameId: string) => {
    setActiveGame(gameId);
    setIsPlaying(true);
    
    switch (gameId) {
      case 'nut-catch':
        setNutCatchScore(0);
        setGameTime(30);
        setFallingNuts([]);
        break;
      case 'memory-match':
        setupMemoryGame();
        break;
      case 'quick-click':
        setupQuickClickGame();
        break;
    }
  };

  const endGame = (gameId: string, score: number) => {
    setIsPlaying(false);
    setGameScores(prev => [...prev, {
      gameId,
      score,
      timestamp: new Date()
    }]);
    
    // Give rewards based on performance
    const game = miniGames.find(g => g.id === gameId);
    if (game && score > 0) {
      // Award nuts, coins, exp based on score
      console.log(`Game ${gameId} completed with score ${score}. Rewards: ${game.rewards.nuts} nuts, ${game.rewards.coins} coins, ${game.rewards.exp} exp`);
    }
  };

  const catchNut = (nutId: number) => {
    const nut = fallingNuts.find(n => n.id === nutId);
    if (nut && Math.abs(nut.x - nutCatchPosition) < 15 && nut.y > 80) {
      setNutCatchScore(prev => prev + 1);
      setFallingNuts(prev => prev.filter(n => n.id !== nutId));
    }
  };

  const flipMemoryCard = (cardId: number) => {
    if (memoryFlipped.length < 2 && !memoryCards[cardId]?.flipped && !memoryCards[cardId]?.matched) {
      const newFlipped = [...memoryFlipped, cardId];
      setMemoryFlipped(newFlipped);
      
      setMemoryCards(prev => prev.map(card => 
        card.id === cardId ? { ...card, flipped: true } : card
      ));
      
      if (newFlipped.length === 2) {
        setMemoryMoves(prev => prev + 1);
        
        const [first, second] = newFlipped;
        if (memoryCards[first]?.symbol === memoryCards[second]?.symbol) {
          // Match found
          setTimeout(() => {
            setMemoryCards(prev => prev.map(card => 
              card.id === first || card.id === second 
                ? { ...card, matched: true } 
                : card
            ));
            setMemoryFlipped([]);
          }, 500);
        } else {
          // No match
          setTimeout(() => {
            setMemoryCards(prev => prev.map(card => 
              card.id === first || card.id === second 
                ? { ...card, flipped: false } 
                : card
            ));
            setMemoryFlipped([]);
          }, 1000);
        }
      }
    }
  };

  const clickTarget = (targetId: number) => {
    setClickTargets(prev => prev.filter(target => target.id !== targetId));
    setClickScore(prev => prev + 1);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300';
      case 'hard': return 'bg-red-500/20 text-red-700 dark:text-red-300';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
    }
  };

  const getHighScore = (gameId: string) => {
    const scores = gameScores.filter(score => score.gameId === gameId);
    return scores.length > 0 ? Math.max(...scores.map(s => s.score)) : 0;
  };

  if (activeGame && isPlaying) {
    return (
      <section className="py-20 px-4" id="game-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveGame(null);
                setIsPlaying(false);
              }}
              className="mb-4"
            >
              ← Back to Game Center
            </Button>
          </div>

          {activeGame === 'nut-catch' && (
            <Card className="card-cozy">
              <CardHeader className="text-center">
                <CardTitle>🌰 Nut Catcher</CardTitle>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">Score: {nutCatchScore}</Badge>
                  <Badge variant="outline">Time: {gameTime}s</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 bg-gradient-to-b from-sky-200 to-green-200 rounded-lg overflow-hidden">
                  {/* Falling Nuts */}
                  {fallingNuts.map(nut => (
                    <div
                      key={nut.id}
                      className="absolute text-2xl cursor-pointer"
                      style={{ left: `${nut.x}%`, top: `${nut.y}%` }}
                      onClick={() => catchNut(nut.id)}
                    >
                      🌰
                    </div>
                  ))}
                  
                  {/* Basket */}
                  <div
                    className="absolute bottom-4 text-4xl cursor-pointer"
                    style={{ left: `${nutCatchPosition}%`, transform: 'translateX(-50%)' }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                      if (rect) {
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        setNutCatchPosition(Math.max(10, Math.min(90, x)));
                      }
                    }}
                  >
                    🧺
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Move your mouse to control the basket and catch falling nuts!
                </p>
              </CardContent>
            </Card>
          )}

          {activeGame === 'memory-match' && (
            <Card className="card-cozy">
              <CardHeader className="text-center">
                <CardTitle>🧠 Squirrel Memory</CardTitle>
                <Badge variant="outline">Moves: {memoryMoves}</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                  {memoryCards.map((card, index) => (
                    <div
                      key={card.id}
                      className={`aspect-square rounded-lg border-2 flex items-center justify-center text-3xl cursor-pointer transition-all ${
                        card.flipped || card.matched 
                          ? 'bg-primary/20 border-primary' 
                          : 'bg-muted hover:bg-muted/80 border-muted-foreground'
                      }`}
                      onClick={() => flipMemoryCard(index)}
                    >
                      {card.flipped || card.matched ? card.symbol : '❓'}
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Find matching pairs of forest symbols!
                </p>
              </CardContent>
            </Card>
          )}

          {activeGame === 'quick-click' && (
            <Card className="card-cozy">
              <CardHeader className="text-center">
                <CardTitle>⚡ Lightning Reflexes</CardTitle>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">Score: {clickScore}</Badge>
                  <Badge variant="outline">Time: {clickTimeLeft}s</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg overflow-hidden">
                  {clickTargets.map(target => (
                    <div
                      key={target.id}
                      className="absolute w-12 h-12 bg-red-500 rounded-full cursor-pointer flex items-center justify-center text-white font-bold animate-pulse hover:scale-110 transition-transform"
                      style={{ left: `${target.x}%`, top: `${target.y}%` }}
                      onClick={() => clickTarget(target.id)}
                    >
                      🎯
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Click the targets as fast as you can!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4" id="game-center">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-squirrel-brown mb-4">
            🎮 Squirrel Game Center
          </h2>
          <p className="text-xl text-muted-foreground">
            Play mini-games to earn nuts, coins, and experience!
          </p>
        </div>

        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="games">Mini Games</TabsTrigger>
            <TabsTrigger value="scores">High Scores</TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {miniGames.map((game) => (
                <Card key={game.id} className="card-cozy hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{game.icon}</div>
                      <div className="flex-1">
                        <CardTitle>{game.name}</CardTitle>
                        <CardDescription>{game.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getDifficultyColor(game.difficulty)}>
                        {game.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        High Score: {getHighScore(game.id)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl">🌰</p>
                        <p className="text-sm font-medium">{game.rewards.nuts}</p>
                      </div>
                      <div>
                        <p className="text-2xl">💰</p>
                        <p className="text-sm font-medium">{game.rewards.coins}</p>
                      </div>
                      <div>
                        <p className="text-2xl">⭐</p>
                        <p className="text-sm font-medium">{game.rewards.exp}</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full btn-squirrel"
                      onClick={() => startGame(game.id)}
                    >
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      Play Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scores" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {miniGames.map((game) => {
                const gameScoresFiltered = gameScores
                  .filter(score => score.gameId === game.id)
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 5);

                return (
                  <Card key={game.id} className="card-cozy">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">{game.icon}</span>
                        {game.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {gameScoresFiltered.length > 0 ? (
                        <div className="space-y-2">
                          {gameScoresFiltered.map((score, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">
                                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                                </span>
                                <span className="font-medium">Score: {score.score}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {score.timestamp.toLocaleDateString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-8">
                          No scores yet. Be the first to play!
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};