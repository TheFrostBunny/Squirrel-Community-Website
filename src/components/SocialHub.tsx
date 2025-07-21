import { useState } from 'react';
import { useText } from '@/hooks/useText';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { 
  Users, 
  MessageCircle, 
  User, 
  Search, 
  Heart, 
  Share, 
  Plus,
  Award,
  Star,
  Calendar,
  ThumbsUp,
  Trophy,
  Gift,
  Crown
} from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  squirrelName: string;
  avatar: string;
  online: boolean;
  level: number;
  mood: string;
  nuts: number;
  achievements: number;
  personalityTrait: string;
  lastSeen: string;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  liked: boolean;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
}

interface NutNote {
  id: string;
  from: string;
  message: string;
  emoji: string;
  timestamp: string;
}

const SocialHub = () => {
  const { getText } = useText();
  const [activeTab, setActiveTab] = useState('neighborhood');
  const [searchFriend, setSearchFriend] = useState('');
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [selectedNeighbor, setSelectedNeighbor] = useState<Friend | null>(null);

  // Mock data - Enhanced friends with neighborhood data
  const [friends] = useState<Friend[]>([
    { 
      id: '1', 
      name: 'NuttyBuddy', 
      squirrelName: 'Whiskers',
      avatar: '🐿️', 
      online: true, 
      level: 15,
      mood: 'happy',
      nuts: 342,
      achievements: 6,
      personalityTrait: 'Energetic',
      lastSeen: 'now'
    },
    { 
      id: '2', 
      name: 'AcornHunter', 
      squirrelName: 'Fluffy',
      avatar: '🌰', 
      online: false, 
      level: 12,
      mood: 'playful',
      nuts: 567,
      achievements: 9,
      personalityTrait: 'Curious',
      lastSeen: '2h ago'
    },
    { 
      id: '3', 
      name: 'TreeHopper', 
      squirrelName: 'Squeaky',
      avatar: '🌳', 
      online: true, 
      level: 18,
      mood: 'sleepy',
      nuts: 189,
      achievements: 3,
      personalityTrait: 'Sleepy',
      lastSeen: 'now'
    },
    { 
      id: '4', 
      name: 'ForestFriend', 
      squirrelName: 'Chippy',
      avatar: '🍂', 
      online: true, 
      level: 9,
      mood: 'mischievous',
      nuts: 823,
      achievements: 12,
      personalityTrait: 'Friendly',
      lastSeen: '1h ago'
    }
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'NuttyBuddy',
      avatar: '🐿️',
      content: 'Just reached level 15! My squirrel learned a new trick! 🎉',
      timestamp: new Date(Date.now() - 3600000),
      likes: 5,
      comments: [
        {
          id: '1',
          author: 'AcornHunter',
          avatar: '🌰',
          content: 'Congratulations! What trick did it learn?',
          timestamp: new Date(Date.now() - 1800000)
        }
      ],
      liked: false
    },
    {
      id: '2',
      author: 'TreeHopper',
      avatar: '🌳',
      content: 'Found a rare golden acorn in the Tree Jumping game! Anyone else seen one?',
      timestamp: new Date(Date.now() - 7200000),
      likes: 8,
      comments: [],
      liked: true
    }
  ]);

  const [nutNotes, setNutNotes] = useState<NutNote[]>([
    {
      id: '1',
      from: 'NuttyBuddy',
      message: 'Your squirrel looks so happy! 🌰',
      emoji: '🌰',
      timestamp: '5m ago'
    },
    {
      id: '2',
      from: 'TreeHopper',
      message: 'Want to be squirrel friends?',
      emoji: '🤝',
      timestamp: '1h ago'
    }
  ]);

  const userProfile = {
    name: 'You',
    avatar: '🐿️',
    level: 10,
    experience: { current: 750, total: 1000 },
    joinedDate: new Date('2024-01-15'),
    badges: ['Early Bird', 'Nut Collector', 'Friend Maker'],
    achievements: 15,
    totalFriends: friends.length
  };

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

  const leaderboard = [...friends]
    .sort((a, b) => b.nuts - a.nuts)
    .slice(0, 10);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchFriend.toLowerCase()) ||
    friend.squirrelName.toLowerCase().includes(searchFriend.toLowerCase())
  );

  const visitNeighbor = (friend: Friend) => {
    setSelectedNeighbor(friend);
  };

  const sendNutNote = (friendId: string, message: string, emoji: string) => {
    const newNote: NutNote = {
      id: Date.now().toString(),
      from: 'You',
      message,
      emoji,
      timestamp: 'just now'
    };
    setNutNotes(prev => [newNote, ...prev]);
    toast({
      title: 'Nut note sent!',
      description: `Sent "${message}" to your friend`
    });
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleAddPost = () => {
    if (!newPost.trim()) return;
    
    const post: Post = {
      id: Date.now().toString(),
      author: userProfile.name,
      avatar: userProfile.avatar,
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      liked: false
    };
    
    setPosts([post, ...posts]);
    setNewPost('');
    toast({
      title: getText('socialHub.messages.postShared'),
      description: getText('socialHub.feed.title')
    });
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: userProfile.name,
      avatar: userProfile.avatar,
      content: newComment,
      timestamp: new Date()
    };
    
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));
    setNewComment('');
    toast({
      title: getText('socialHub.messages.commentAdded')
    });
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return getText('socialHub.feed.timeAgo', { time: 'just now' });
    if (seconds < 3600) return getText('socialHub.feed.timeAgo', { time: `${Math.floor(seconds / 60)}m` });
    if (seconds < 86400) return getText('socialHub.feed.timeAgo', { time: `${Math.floor(seconds / 3600)}h` });
    return getText('socialHub.feed.timeAgo', { time: `${Math.floor(seconds / 86400)}d` });
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {getText('socialHub.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {getText('socialHub.subtitle')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="neighborhood" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Neighborhood
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Friends
            </TabsTrigger>
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Friends Tab */}
          <TabsContent value="friends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {getText('socialHub.friends.title')}
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    {getText('socialHub.friends.addFriend')}
                  </Button>
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={getText('socialHub.friends.searchPlaceholder')}
                    value={searchFriend}
                    onChange={(e) => setSearchFriend(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredFriends.map((friend) => (
                    <Card key={friend.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="text-lg">{friend.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{friend.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {friend.squirrelName} • Lv.{friend.level}
                            </p>
                          </div>
                        </div>
                        <Badge variant={friend.online ? "default" : "secondary"}>
                          {friend.online ? getText('socialHub.friends.online') : getText('socialHub.friends.offline')}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {getText('socialHub.friends.sendMessage')}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => visitNeighbor(friend)}
                        >
                          <User className="h-4 w-4 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
                {filteredFriends.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    {getText('socialHub.friends.noFriends')}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{getText('socialHub.feed.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-6">
                  <Avatar>
                    <AvatarFallback className="text-lg">{userProfile.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder={getText('socialHub.feed.shareUpdate')}
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="mb-3"
                    />
                    <Button onClick={handleAddPost} disabled={!newPost.trim()}>
                      {getText('socialHub.feed.post')}
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  {posts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="pt-6">
                        <div className="flex gap-3 mb-4">
                          <Avatar>
                            <AvatarFallback className="text-lg">{post.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{post.author}</h4>
                              <span className="text-sm text-muted-foreground">
                                {getTimeAgo(post.timestamp)}
                              </span>
                            </div>
                            <p className="mb-4">{post.content}</p>
                            <div className="flex items-center gap-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleLikePost(post.id)}
                                className={post.liked ? "text-red-500" : ""}
                              >
                                <Heart className={`h-4 w-4 mr-1 ${post.liked ? "fill-current" : ""}`} />
                                {post.likes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowComments({
                                  ...showComments,
                                  [post.id]: !showComments[post.id]
                                })}
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {post.comments.length}
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share className="h-4 w-4 mr-1" />
                                {getText('socialHub.feed.share')}
                              </Button>
                            </div>

                            {showComments[post.id] && (
                              <div className="mt-4 space-y-3">
                                <Separator />
                                {post.comments.map((comment) => (
                                  <div key={comment.id} className="flex gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback className="text-sm">{comment.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="bg-muted rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-medium text-sm">{comment.author}</span>
                                          <span className="text-xs text-muted-foreground">
                                            {getTimeAgo(comment.timestamp)}
                                          </span>
                                        </div>
                                        <p className="text-sm">{comment.content}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <div className="flex gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="text-sm">{userProfile.avatar}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 flex gap-2">
                                    <Input
                                      placeholder={getText('socialHub.feed.writeComment')}
                                      value={newComment}
                                      onChange={(e) => setNewComment(e.target.value)}
                                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() => handleAddComment(post.id)}
                                      disabled={!newComment.trim()}
                                    >
                                      {getText('socialHub.feed.postComment')}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {posts.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      {getText('socialHub.feed.noUpdates')}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {getText('socialHub.profile.title')}
                    <Button variant="outline" size="sm">
                      {getText('socialHub.profile.editProfile')}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-2xl">{userProfile.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{userProfile.name}</h3>
                      <p className="text-muted-foreground">
                        {getText('socialHub.profile.level', { level: userProfile.level })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {getText('socialHub.profile.joinedDate', { 
                          date: userProfile.joinedDate.toLocaleDateString() 
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          {getText('socialHub.profile.experience', {
                            current: userProfile.experience.current,
                            total: userProfile.experience.total
                          })}
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(userProfile.experience.current / userProfile.experience.total) * 100}%` 
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{userProfile.achievements}</div>
                        <div className="text-sm text-muted-foreground">{getText('socialHub.profile.achievements')}</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{userProfile.totalFriends}</div>
                        <div className="text-sm text-muted-foreground">{getText('socialHub.tabs.friends')}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{getText('socialHub.profile.badges')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {userProfile.badges.length > 0 ? (
                    <div className="grid gap-3">
                      {userProfile.badges.map((badge, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Award className="h-6 w-6 text-primary" />
                          <div>
                            <h4 className="font-medium">{badge}</h4>
                            <p className="text-sm text-muted-foreground">Earned achievement</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      {getText('socialHub.profile.noBadges')}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        {selectedNeighbor && (
          <Card className="mt-6 border-primary/50">
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

export default SocialHub;