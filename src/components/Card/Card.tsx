import React, { useState } from 'react';
import './Card.scss';

interface CardProps {
  appId: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const Card: React.FC<CardProps> = ({ appId, title, children, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    // Check if card should be closed based on drag position
    if (e.clientY > window.innerHeight * 0.8) {
      onClose();
    }
  };

  return (
    <div 
      className={`card ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card-header">
        <h3>{title}</h3>
        <button onClick={onClose} className="close-btn">×</button>
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}; 