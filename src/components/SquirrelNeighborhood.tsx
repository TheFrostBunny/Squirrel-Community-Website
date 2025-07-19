import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Gift, Trophy, Users, Star, Crown } from 'lucide-react';

interface Neighbor {
  id: string;
  name: string;
  squirrelName: string;
  level: number;
  mood: string;
  online: boolean;
  lastSeen: string;
  nuts: number;
  achievements: number;
  personalityTrait: string;
}

interface NutNote {
  id: string;
  from: string;
  message: string;
  emoji: string;
  timestamp: string;
}

export const SquirrelNeighborhood = () => {
  const [neighbors] = useState<Neighbor[]>([
    {
      id: '1',
      name: 'AcornHunter42',
      squirrelName: 'Whiskers',
      level: 8,
      mood: 'happy',
      online: true,
      lastSeen: 'now',
      nuts: 342,
      achievements: 6,
      personalityTrait: 'Energetic'
    },
    {
      id: '2',
      name: 'TreeClimber',
      squirrelName: 'Fluffy',
      level: 12,
      mood: 'playful',
      online: false,
      lastSeen: '2h ago',
      nuts: 567,
      achievements: 9,
      personalityTrait: 'Curious'
    },
    {
      id: '3',
      name: 'NutCollector',
      squirrelName: 'Squeaky',
      level: 5,
      mood: 'sleepy',
      online: true,
      lastSeen: 'now',
      nuts: 189,
      achievements: 3,
      personalityTrait: 'Sleepy'
    },
    {
      id: '4',
      name: 'ForestFriend',
      squirrelName: 'Chippy',
      level: 15,
      mood: 'happy',
      online: false,
      lastSeen: '1h ago',
      nuts: 823,
      achievements: 12,
      personalityTrait: 'Friendly'
    },
    {
      id: '5',
      name: 'BranchJumper',
      squirrelName: 'Nutmeg',
      level: 7,
      mood: 'mischievous',
      online: true,
      lastSeen: 'now',
      nuts: 234,
      achievements: 4,
      personalityTrait: 'Mischievous'
    }
  ]);

  const [nutNotes, setNutNotes] = useState<NutNote[]>([
    {
      id: '1',
      from: 'AcornHunter42',
      message: 'Your squirrel looks so happy! 🌰',
      emoji: '🌰',
      timestamp: '5m ago'
    },
    {
      id: '2',
      from: 'TreeClimber',
      message: 'Want to be squirrel friends?',
      emoji: '🤝',
      timestamp: '1h ago'
    },
    {
      id: '3',
      from: 'ForestFriend',
      message: 'Awesome nest decorations!',
      emoji: '🏠',
      timestamp: '2h ago'
    }
  ]);

  const [selectedNeighbor, setSelectedNeighbor] = useState<Neighbor | null>(null);
  const [friendRequests] = useState(['TreeClimber', 'NutCollector']);
  const [friends] = useState(['AcornHunter42', 'ForestFriend']);

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'playful': return '😄';
      case 'sleepy': return '😴';
      case 'mischievous': return '😈';
      case 'curious': return '🤔';
      default: return '😊';
    }
  };

  const visitNeighbor = (neighbor: Neighbor) => {
    setSelectedNeighbor(neighbor);
  };

  const sendNutNote = (neighborId: string, message: string, emoji: string) => {
    const newNote: NutNote = {
      id: Date.now().toString(),
      from: 'You',
      message,
      emoji,
      timestamp: 'just now'
    };
    setNutNotes(prev => [newNote, ...prev]);
  };

  const leaderboard = [...neighbors]
    .sort((a, b) => b.nuts - a.nuts)
    .slice(0, 10);

  return (
    <section className="py-20 px-4" id="neighborhood">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-squirrel-brown mb-4">
            🏘️ Squirrel Neighborhood
          </h2>
          <p className="text-xl text-muted-foreground">
            Visit friends, send nut notes, and climb the leaderboards!
          </p>
        </div>

        <Tabs defaultValue="neighborhood" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
            <TabsTrigger value="friends">Friends ({friends.length})</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="notes">Nut Notes ({nutNotes.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="neighborhood" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neighbors.map((neighbor) => (
                <Card key={neighbor.id} className="card-cozy hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="relative mb-4">
                      <div className="text-6xl mb-2">{getMoodEmoji(neighbor.mood)}</div>
                      <div className="absolute -top-1 -right-1">
                        {neighbor.online ? (
                          <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{neighbor.squirrelName}</CardTitle>
                    <CardDescription>by {neighbor.name}</CardDescription>
                    <div className="flex justify-center gap-2 flex-wrap">
                      <Badge variant="secondary">Lv.{neighbor.level}</Badge>
                      <Badge variant="outline">{neighbor.nuts}🌰</Badge>
                      <Badge variant="outline" className="text-xs">{neighbor.personalityTrait}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground text-center">
                      {neighbor.achievements} achievements • {neighbor.online ? 'Online' : `Last seen ${neighbor.lastSeen}`}
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => visitNeighbor(neighbor)}
                      >
                        <Users className="w-4 h-4 mr-1" />
                        Visit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => sendNutNote(neighbor.id, 'Hi there! 👋', '👋')}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="friends" className="mt-6">
            <div className="space-y-6">
              {friendRequests.length > 0 && (
                <Card className="card-cozy">
                  <CardHeader>
                    <CardTitle className="text-lg">Friend Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {friendRequests.map((request) => (
                        <div key={request} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{request[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{request}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm">Accept</Button>
                            <Button size="sm" variant="outline">Decline</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="card-cozy">
                <CardHeader>
                  <CardTitle className="text-lg">Your Friends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {friends.map((friendName) => {
                      const friend = neighbors.find(n => n.name === friendName);
                      if (!friend) return null;
                      
                      return (
                        <div key={friend.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="text-3xl">{getMoodEmoji(friend.mood)}</div>
                          <div className="flex-1">
                            <p className="font-medium">{friend.squirrelName}</p>
                            <p className="text-sm text-muted-foreground">{friend.name} • Lv.{friend.level}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Gift className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <Card className="card-cozy">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Nut Collection Leaderboard
                </CardTitle>
                <CardDescription>
                  The richest squirrels in the neighborhood!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((neighbor, index) => (
                    <div key={neighbor.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl">
                        {index === 0 && '👑'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && `#${index + 1}`}
                      </div>
                      <div className="text-3xl">{getMoodEmoji(neighbor.mood)}</div>
                      <div className="flex-1">
                        <p className="font-medium">{neighbor.squirrelName}</p>
                        <p className="text-sm text-muted-foreground">{neighbor.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{neighbor.nuts}🌰</p>
                        <p className="text-sm text-muted-foreground">Level {neighbor.level}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="mt-6">
            <Card className="card-cozy">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Nut Notes
                </CardTitle>
                <CardDescription>
                  Messages from your squirrel friends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nutNotes.map((note) => (
                    <div key={note.id} className="flex gap-3 p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl">{note.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{note.from}</span>
                          <span className="text-sm text-muted-foreground">{note.timestamp}</span>
                        </div>
                        <p className="text-muted-foreground">{note.message}</p>
                      </div>
                    </div>
                  ))}
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Send some nut notes to make friends!</p>
                    <div className="flex gap-2 justify-center">
                      <Button size="sm" variant="outline">🌰 Send Acorn</Button>
                      <Button size="sm" variant="outline">👋 Say Hi</Button>
                      <Button size="sm" variant="outline">❤️ Send Love</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedNeighbor && (
          <Card className="card-cozy mt-6 border-primary/50">
            <CardHeader className="text-center">
              <CardTitle>Visiting {selectedNeighbor.squirrelName}'s Nest</CardTitle>
              <div className="text-8xl my-4">{getMoodEmoji(selectedNeighbor.mood)}</div>
              <p className="text-muted-foreground">
                {selectedNeighbor.squirrelName} is {selectedNeighbor.personalityTrait.toLowerCase()} and loves to play!
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex justify-center gap-4">
                <Button onClick={() => sendNutNote(selectedNeighbor.id, 'Beautiful nest!', '🏠')}>
                  🏠 Compliment Nest
                </Button>
                <Button onClick={() => sendNutNote(selectedNeighbor.id, 'Want to play together?', '🎮')}>
                  🎮 Play Together
                </Button>
                <Button onClick={() => setSelectedNeighbor(null)} variant="outline">
                  👋 Leave Visit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};