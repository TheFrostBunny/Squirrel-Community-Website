import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const CommunityInfo = () => {
  const rules = [
    { icon: '🤝', title: 'Be Kind & Respectful', description: 'Treat everyone with kindness and respect' },
    { icon: '🚫', title: 'No Spam or Self-Promotion', description: 'Keep conversations genuine and engaging' },
    { icon: '🔞', title: 'Keep It Family-Friendly', description: 'Content should be appropriate for all ages' },
    { icon: '🎯', title: 'Stay On Topic', description: 'Use appropriate channels for discussions' },
    { icon: '🛡️', title: 'Listen to Moderators', description: 'Our team is here to help maintain a positive environment' }
  ];

  const roles = [
    { name: 'Squirrel Leader', color: 'bg-autumn-orange', description: 'Server administrators and founders' },
    { name: 'Elder Squirrel', color: 'bg-forest-green', description: 'Trusted moderators and helpers' },
    { name: 'Busy Squirrel', color: 'bg-squirrel-brown', description: 'Active community members' },
    { name: 'Baby Squirrel', color: 'bg-moss-green', description: 'New members to the community' },
    { name: 'Gaming Nut', color: 'bg-acorn-tan', description: 'Gaming enthusiasts and organizers' },
    { name: 'Creative Squirrel', color: 'bg-leaf-green', description: 'Artists, writers, and creators' }
  ];

  const events = [
    { name: 'Weekly Game Night', time: 'Every Friday 8PM EST', description: 'Community gaming sessions' },
    { name: 'Art Share Sunday', time: 'Every Sunday', description: 'Share your creative works' },
    { name: 'Movie Night', time: 'Every Saturday 9PM EST', description: 'Watch movies together' },
    { name: 'Trivia Tuesday', time: 'Every Tuesday 7PM EST', description: 'Test your knowledge' },
    { name: 'Seasonal Events', time: 'Monthly', description: 'Special themed celebrations' }
  ];

  const highlights = [
    { 
      title: '🎨 Community Art Gallery', 
      description: 'Amazing artwork from our talented members',
      stats: '100+ artworks shared'
    },
    { 
      title: '🎮 Gaming Tournaments', 
      description: 'Regular competitions with fun prizes',
      stats: '25+ tournaments held'
    },
    { 
      title: '🏆 Meme of the Month', 
      description: 'Celebrating the best community memes',
      stats: '500+ memes shared'
    },
    { 
      title: '📚 Book Club', 
      description: 'Monthly reading discussions',
      stats: '12 books read together'
    }
  ];

  return (
    <section className="py-20 px-4" id="community-info">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-squirrel-brown mb-4">
            🌰 Community Info
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our cozy corner of the internet!
          </p>
        </div>

        <Tabs defaultValue="rules" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rules">Server Rules</TabsTrigger>
            <TabsTrigger value="roles">Roles & Ranks</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
          </TabsList>

          <TabsContent value="rules" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rules.map((rule, index) => (
                <Card key={index} className="card-cozy">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{rule.icon}</div>
                    <CardTitle className="text-squirrel-brown text-lg">{rule.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {rule.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              {roles.map((role, index) => (
                <Card key={index} className="card-cozy">
                  <CardContent className="flex items-center gap-4 pt-6">
                    <div className={`w-4 h-4 rounded-full ${role.color}`}></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-squirrel-brown">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-8">
            <div className="space-y-4">
              {events.map((event, index) => (
                <Card key={index} className="card-cozy">
                  <CardContent className="flex items-center justify-between pt-6">
                    <div>
                      <h3 className="font-semibold text-squirrel-brown">{event.name}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <Badge variant="secondary">{event.time}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="highlights" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <Card key={index} className="card-cozy">
                  <CardHeader>
                    <CardTitle className="text-squirrel-brown">{highlight.title}</CardTitle>
                    <CardDescription>{highlight.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline">{highlight.stats}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-squirrel-brown mb-8 text-center">
            Frequently Asked Questions 🤔
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-cozy">
              <CardHeader>
                <CardTitle className="text-lg text-squirrel-brown">How do I get started?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Just join our Discord server and introduce yourself in the welcome channel! 
                  We'll help you get comfortable and find your favorite channels.
                </p>
              </CardContent>
            </Card>
            <Card className="card-cozy">
              <CardHeader>
                <CardTitle className="text-lg text-squirrel-brown">Can I suggest new features?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Absolutely! We love hearing from our community. Use the #suggestions channel 
                  to share your ideas for the server or this website.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};