import React from 'react';
import { SettingsPanel } from '../components/SettingsPanel';
import type { AppSettings, CameraDeviceInfo } from '../types/system';

interface SettingsProps {
  settings: AppSettings;
  devices: CameraDeviceInfo[];
  onUpdateSettings: (settings: AppSettings) => void;
}

export const SettingsPage: React.FC<SettingsProps> = ({
  settings,
  devices,
  onUpdateSettings,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      <SettingsPanel
        settings={settings}
        devices={devices}
        onUpdateSettings={onUpdateSettings}
      />
    </div>
  );
};
