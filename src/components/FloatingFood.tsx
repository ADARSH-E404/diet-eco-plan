import { useEffect, useState } from 'react';

interface FoodItem {
  id: number;
  emoji: string;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

const foodEmojis = ['🥦', '🥕', '🍎', '🍊', '🥑', '🍇', '🫐', '🍓', '🥗', '🥒'];

export const FloatingFood = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);

  useEffect(() => {
    const items: FoodItem[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: foodEmojis[Math.floor(Math.random() * foodEmojis.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4,
    }));
    setFoods(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
      {foods.map((food) => (
        <div
          key={food.id}
          className="absolute text-4xl md:text-6xl floating-element"
          style={{
            left: `${food.left}%`,
            top: `${food.top}%`,
            animationDelay: `${food.delay}s`,
            animationDuration: `${food.duration}s`,
          }}
        >
          {food.emoji}
        </div>
      ))}
    </div>
  );
};
