import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { OnboardingModal } from '../components/OnboardingModal';
import { HelpPanel } from '../components/HelpPanel';
import { Home } from '../pages/Home';
import { Translator } from '../pages/Translator';
import { History } from '../pages/History';
import { About } from '../pages/About';
import { SettingsPage } from '../pages/Settings';
import { StorageService } from '../services/StorageService';
import type { AppSettings, CameraDeviceInfo } from '../types/system';
import { CameraManager } from '../vision/CameraManager';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'translator' | 'history' | 'about' | 'settings' | 'help'>('home');
  const [settings, setSettings] = useState<AppSettings>(() => StorageService.getSettings());
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [devices, setDevices] = useState<CameraDeviceInfo[]>([]);

  // Check onboarding on initial mount
  useEffect(() => {
    const isCompleted = StorageService.isOnboardingCompleted();
    if (!isCompleted) {
      setIsOnboardingOpen(true);
    }

    // Discover video input devices for settings
    const camMgr = new CameraManager();
    camMgr.getAvailableDevices().then(setDevices);
  }, []);

  // Sync dark mode class with state
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    StorageService.saveSettings(newSettings);
  };

  const handleToggleDemoMode = (enabled: boolean) => {
    const updated = { ...settings, isDemoMode: enabled };
    handleUpdateSettings(updated);
  };

  const handleToggleDarkMode = (enabled: boolean) => {
    const updated = { ...settings, darkMode: enabled };
    handleUpdateSettings(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Header Bar */}
      <Header
        activeTab={activeTab === 'home' || activeTab === 'help' ? 'translator' : activeTab}
        setActiveTab={tab => setActiveTab(tab)}
        isDemoMode={settings.isDemoMode}
        setIsDemoMode={handleToggleDemoMode}
        darkMode={settings.darkMode}
        setDarkMode={handleToggleDarkMode}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <Home
            onStartTranslator={() => setActiveTab('translator')}
            onViewHelp={() => setActiveTab('help')}
            onExploreAbout={() => setActiveTab('about')}
          />
        )}

        {activeTab === 'translator' && (
          <Translator
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
          />
        )}

        {activeTab === 'history' && <History />}

        {activeTab === 'about' && <About />}

        {activeTab === 'settings' && (
          <SettingsPage
            settings={settings}
            devices={devices}
            onUpdateSettings={handleUpdateSettings}
          />
        )}

        {activeTab === 'help' && (
          <div className="py-6 px-4">
            <HelpPanel />
          </div>
        )}
      </main>

      {/* Persistent Footer */}
      <Footer />

      {/* First-Run Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </div>
  );
};

export default App;
