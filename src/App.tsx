import React, { useState } from 'react';
import { CardStack } from './components/Card/CardStack';
import { Dock } from './components/Dock/Dock';
import { Launcher } from './components/Launcher/Launcher';
import { QuickSettings } from './components/SystemUI/QuickSettings';
import './App.scss';

const App: React.FC = () => {
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);

  const dockItems = [
    {
      id: 'launcher',
      icon: '/icons/launcher.png',
      label: 'Launcher',
      onClick: () => setIsLauncherOpen(true),
    },
    {
      id: 'settings',
      icon: '/icons/settings.png',
      label: 'Settings',
      onClick: () => setIsQuickSettingsOpen(true),
    },
    // Add more dock items as needed
  ];

  const apps = [
    // Define your apps here
  ];

  return (
    <div className="app">
      <CardStack />
      
      {isLauncherOpen && (
        <Launcher 
          apps={apps} 
          onClose={() => setIsLauncherOpen(false)} 
        />
      )}
      
      {isQuickSettingsOpen && (
        <QuickSettings 
          onClose={() => setIsQuickSettingsOpen(false)} 
        />
      )}
      
      <Dock items={dockItems} />
    </div>
  );
};

export default App; 