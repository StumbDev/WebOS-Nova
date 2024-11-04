import React from 'react';
import './Dock.scss';

interface DockItem {
  id: string;
  icon: string;
  label: string;
  onClick: () => void;
}

interface DockProps {
  items: DockItem[];
}

export const Dock: React.FC<DockProps> = ({ items }) => {
  return (
    <div className="dock">
      {items.map((item) => (
        <button key={item.id} className="dock-item" onClick={item.onClick}>
          <img src={item.icon} alt={item.label} />
          <span className="dock-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}; 