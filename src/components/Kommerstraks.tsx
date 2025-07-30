import { MessageCircle } from 'lucide-react';

export const Kommerstraks = () => (
  <div className="flex flex-col items-center justify-center min-h-[300px] bg-background rounded-lg shadow-md p-8">
    <MessageCircle className="w-12 h-12 text-squirrel-brown mb-4" />
    <h2 className="text-2xl font-bold text-squirrel-brown mb-2">Coming Soon!</h2>
    <p className="text-muted-foreground text-center max-w-md">
      This feature is under development. Soon you'll be able to chat and share with others in Squirrel Haven's Social Hub!
    </p>
  </div>
);