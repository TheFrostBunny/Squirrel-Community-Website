import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const JoinDiscord = () => {
  const features = [
    { icon: '🎮', title: 'Gaming Nights', description: 'Regular game sessions and tournaments' },
    { icon: '💬', title: 'Cozy Chats', description: 'Friendly conversations and daily check-ins' },
    { icon: '🎉', title: 'Fun Events', description: 'Seasonal celebrations and community activities' },
    { icon: '🎨', title: 'Creative Corner', description: 'Share your art, music, and creative projects' },
    { icon: '🌰', title: 'Meme Central', description: 'Daily dose of wholesome memes and jokes' },
    { icon: '🏆', title: 'Achievements', description: 'Level up and earn special roles and badges' }
  ];

  return (
    <section className="py-20 px-4" id="join-discord">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-squirrel-brown mb-4">
            Join Our Nutty Community! 🐿️
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover a welcoming space where every member matters. From casual gaming to deep conversations, 
            there's something for everyone in our cozy forest!
          </p>
        </div>

        {/* Main Discord Invite Card */}
        <div className="card-cozy max-w-2xl mx-auto mb-12 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-2xl font-bold text-squirrel-brown mb-2">Ready to Join?</h3>
            <p className="text-muted-foreground mb-6">
              Click below to get your exclusive invite to Squirrel Community Discord server!
            </p>
          </div>
          
          <Button 
            className="btn-squirrel text-xl px-12 py-6 mb-4"
            onClick={() => window.open('https://discord.com/invite/UGUjdgD5Mb', '_blank')}
          >
            🎉 Join Discord Server
          </Button>
          
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="secondary">80+ Members</Badge>
            <Badge variant="secondary">Active Daily</Badge>
            <Badge variant="secondary">All Welcome</Badge>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="card-cozy hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{feature.icon}</div>
                <CardTitle className="text-squirrel-brown">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Stats */}
        <div className="card-cozy text-center">
          <h3 className="text-2xl font-bold text-squirrel-brown mb-6">Why Our Community Rocks</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-autumn-orange">80+</div>
              <div className="text-sm text-muted-foreground">Happy Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-forest-green">24/7</div>
              <div className="text-sm text-muted-foreground">Active Chats</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-squirrel-brown">50+</div>
              <div className="text-sm text-muted-foreground">Fun Channels</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-moss-green">99%</div>
              <div className="text-sm text-muted-foreground">Wholesome Vibes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};