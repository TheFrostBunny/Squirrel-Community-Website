export const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐿️</span>
              <span className="font-bold text-xl text-squirrel-brown">Squirrel Community</span>
            </div>
            <p className="text-muted-foreground mb-4">
              A cozy Discord server where friendship grows like acorns in autumn. 
              Join our wholesome community for gaming, chatting, and endless fun!
            </p>
            <div className="flex gap-4 text-2xl">
              <span className="cursor-pointer hover:scale-110 transition-transform">🎮</span>
              <span className="cursor-pointer hover:scale-110 transition-transform">💬</span>
              <span className="cursor-pointer hover:scale-110 transition-transform">🎨</span>
              <span className="cursor-pointer hover:scale-110 transition-transform">🌰</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-squirrel-brown mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#home" className="hover:text-squirrel-brown transition-colors">Home</a></li>
              <li><a href="#join-discord" className="hover:text-squirrel-brown transition-colors">Join Discord</a></li>
              <li><a href="#squirrel-care" className="hover:text-squirrel-brown transition-colors">Squirrel Care</a></li>
              <li><a href="#community-info" className="hover:text-squirrel-brown transition-colors">Community Info</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-squirrel-brown mb-4">Community</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><span className="hover:text-squirrel-brown transition-colors cursor-pointer">Discord Server</span></li>
              <li><span className="hover:text-squirrel-brown transition-colors cursor-pointer">Community Rules</span></li>
              <li><span className="hover:text-squirrel-brown transition-colors cursor-pointer">Events Calendar</span></li>
              <li><span className="hover:text-squirrel-brown transition-colors cursor-pointer">Support</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© 2025 Squirrel Community. Made with 🐿️ and lots of nuts!</p>
          <p className="text-sm mt-2">
            <span className="hidden-easter-egg cursor-pointer hover:text-autumn-orange transition-colors">
              🌰 Click here for a nutty surprise! 🌰
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
