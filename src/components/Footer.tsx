import { useText } from '@/hooks/useText';

export const Footer = () => {
  const { getText } = useText();
  return (
    <footer className="bg-card/50 border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐿️</span>
              <span className="font-bold text-xl text-squirrel-brown">{getText('navigation.logo')}</span>
            </div>
            <p className="text-muted-foreground mb-4">
              {getText('footer.description')}
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
            <h3 className="font-semibold text-squirrel-brown mb-4">{getText('footer.quickLinks.title')}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#home" className="hover:text-squirrel-brown transition-colors">{getText('footer.quickLinks.home')}</a></li>
              <li><a href="#join-discord" className="hover:text-squirrel-brown transition-colors">{getText('footer.quickLinks.joinDiscord')}</a></li>
              <li><a href="#squirrel-care" className="hover:text-squirrel-brown transition-colors">{getText('footer.quickLinks.squirrelCare')}</a></li>
              <li><a href="#community-info" className="hover:text-squirrel-brown transition-colors">{getText('footer.quickLinks.communityInfo')}</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-squirrel-brown mb-4">{getText('footer.community.title')}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><span className="hover:text-squirrel-brown transition-colors cursor-pointer">{getText('footer.community.discordServer')}</span></li>
              <li><span className="hover:text-squirrel-brown transition-colors cursor-pointer">{getText('footer.community.communityRules')}</span></li>
              <li><span className="hover:text-squirrel-brown transition-colors cursor-pointer">{getText('footer.community.eventsCalendar')}</span></li>
              <li><span className="hover:text-squirrel-brown transition-colors cursor-pointer">{getText('footer.community.support')}</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>{getText('footer.copyright')}</p>
          <p className="text-sm mt-2">
            <span className="hidden-easter-egg cursor-pointer hover:text-autumn-orange transition-colors">
              {getText('footer.easterEgg')}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
