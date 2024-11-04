import React, { useState } from 'react';
import './CardStack.scss';
import { Card } from './Card';

interface CardData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const CardStack: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  const removeCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="card-stack">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          appId={card.id}
          title={card.title}
          onClose={() => removeCard(card.id)}
        >
          {card.content}
        </Card>
      ))}
    </div>
  );
}; 