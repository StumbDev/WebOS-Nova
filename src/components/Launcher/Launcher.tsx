import React, { useState } from 'react';
import './Launcher.scss';

interface AppIcon {
  id: string;
  icon: string;
  name: string;
  launchApp: () => void;
}

interface LauncherProps {
  apps: AppIcon[];
  onClose: () => void;
}

export const Launcher: React.FC<LauncherProps> = ({ apps, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="launcher">
      <div className="launcher-search">
        <input
          type="text"
          placeholder="Just Type to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>
      <div className="launcher-grid">
        {filteredApps.map(app => (
          <button 
            key={app.id} 
            className="app-icon"
            onClick={() => {
              app.launchApp();
              onClose();
            }}
          >
            <img src={app.icon} alt={app.name} />
            <span>{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}; 