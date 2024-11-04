import React from 'react';
import './QuickSettings.scss';

interface QuickSettingsProps {
  onClose: () => void;
}

export const QuickSettings: React.FC<QuickSettingsProps> = ({ onClose }) => {
  return (
    <div className="quick-settings">
      <div className="quick-settings-header">
        <h2>Quick Settings</h2>
        <button onClick={onClose}>×</button>
      </div>
      
      <div className="settings-grid">
        <button className="setting-tile">
          <i className="wifi-icon" />
          <span>Wi-Fi</span>
        </button>
        <button className="setting-tile">
          <i className="bluetooth-icon" />
          <span>Bluetooth</span>
        </button>
        <button className="setting-tile">
          <i className="brightness-icon" />
          <span>Brightness</span>
        </button>
        <button className="setting-tile">
          <i className="volume-icon" />
          <span>Volume</span>
        </button>
      </div>

      <div className="brightness-slider">
        <input type="range" min="0" max="100" />
      </div>

      <div className="volume-slider">
        <input type="range" min="0" max="100" />
      </div>
    </div>
  );
}; 