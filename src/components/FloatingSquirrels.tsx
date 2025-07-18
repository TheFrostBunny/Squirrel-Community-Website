import { useState, useEffect } from 'react';

interface FloatingSquirrel {
  id: number;
  x: number;
  y: number;
  emoji: string;
  speed: number;
  direction: number;
}

export const FloatingSquirrels = () => {
  const [squirrels, setSquirrels] = useState<FloatingSquirrel[]>([]);

  useEffect(() => {
    // Initialize floating squirrels
    const initialSquirrels: FloatingSquirrel[] = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      emoji: ['🐿️', '🌰', '🍃'][i % 3],
      speed: 0.5 + Math.random() * 0.5,
      direction: Math.random() * Math.PI * 2,
    }));

    setSquirrels(initialSquirrels);

    const moveSquirrels = () => {
      setSquirrels(prev => 
        prev.map(squirrel => {
          let newX = squirrel.x + Math.cos(squirrel.direction) * squirrel.speed;
          let newY = squirrel.y + Math.sin(squirrel.direction) * squirrel.speed;
          let newDirection = squirrel.direction;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth - 50) {
            newDirection = Math.PI - squirrel.direction;
            newX = Math.max(0, Math.min(window.innerWidth - 50, newX));
          }
          if (newY <= 0 || newY >= window.innerHeight - 50) {
            newDirection = -squirrel.direction;
            newY = Math.max(0, Math.min(window.innerHeight - 50, newY));
          }

          return {
            ...squirrel,
            x: newX,
            y: newY,
            direction: newDirection,
          };
        })
      );
    };

    const interval = setInterval(moveSquirrels, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {squirrels.map(squirrel => (
        <div
          key={squirrel.id}
          className="absolute text-2xl opacity-30 transition-all duration-1000 ease-linear"
          style={{
            left: squirrel.x,
            top: squirrel.y,
            transform: `rotate(${squirrel.direction}rad)`,
          }}
        >
          {squirrel.emoji}
        </div>
      ))}
    </div>
  );
};