import React, { useState, useEffect } from 'react';

// Theme presets
const THEME_PRESETS = {
  default: {
    primary: '#4F46E5',
    secondary: '#7C3AED',
    background: '#F9FAFB',
    text: '#1F2937',
    card: '#FFFFFF',
  },
  dark: {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    background: '#111827',
    text: '#F9FAFB',
    card: '#1F2937',
  },
  ocean: {
    primary: '#0EA5E9',
    secondary: '#06B6D4',
    background: '#F0F9FF',
    text: '#0C4A6E',
    card: '#FFFFFF',
  },
  forest: {
    primary: '#059669',
    secondary: '#10B981',
    background: '#F0FDF4',
    text: '#064E3B',
    card: '#FFFFFF',
  },
  sunset: {
    primary: '#F97316',
    secondary: '#EC4899',
    background: '#FFF7ED',
    text: '#7C2D12',
    card: '#FFFFFF',
  },
};

const Settings = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('dashboard_theme');
    return savedTheme ? JSON.parse(savedTheme) : THEME_PRESETS.default;
  });
  const [selectedPreset, setSelectedPreset] = useState('default');

  useEffect(() => {
    // Apply theme to root element
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);
    root.style.setProperty('--background-color', theme.background);
    root.style.setProperty('--text-color', theme.text);
    root.style.setProperty('--card-color', theme.card);
    
    // Force a re-render of all components
    const event = new CustomEvent('themeChanged');
    window.dispatchEvent(event);
  }, [theme]);

  const handlePresetChange = (presetName) => {
    setSelectedPreset(presetName);
    setTheme(THEME_PRESETS[presetName]);
    localStorage.setItem('dashboard_theme', JSON.stringify(THEME_PRESETS[presetName]));
  };

  const handleCustomColorChange = (colorType, value) => {
    const newTheme = { ...theme, [colorType]: value };
    setTheme(newTheme);
    localStorage.setItem('dashboard_theme', JSON.stringify(newTheme));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[var(--card-color)] rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6 text-[var(--text-color)]">Dashboard Theme</h2>
        
        <div className="space-y-8">
          {/* Theme Presets */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-[var(--text-color)]">Choose a Theme</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(THEME_PRESETS).map(([name, preset]) => (
                <button
                  key={name}
                  onClick={() => handlePresetChange(name)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPreset === name
                      ? 'border-[var(--primary-color)] ring-2 ring-[var(--primary-color)]'
                      : 'border-gray-200 hover:border-[var(--primary-color)]'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${preset.primary} 0%, ${preset.secondary} 100%)`,
                  }}
                >
                  <span className="text-white font-medium capitalize">{name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-[var(--text-color)]">Customize Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-color)]">
                  Primary Color
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={theme.primary}
                    onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <span className="text-sm text-[var(--text-color)]">{theme.primary}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-color)]">
                  Secondary Color
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={theme.secondary}
                    onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <span className="text-sm text-[var(--text-color)]">{theme.secondary}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-color)]">
                  Background Color
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={theme.background}
                    onChange={(e) => handleCustomColorChange('background', e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <span className="text-sm text-[var(--text-color)]">{theme.background}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-color)]">
                  Text Color
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={theme.text}
                    onChange={(e) => handleCustomColorChange('text', e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <span className="text-sm text-[var(--text-color)]">{theme.text}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-[var(--text-color)]">Preview</h3>
            <div 
              className="p-6 rounded-lg border border-gray-200"
              style={{ backgroundColor: theme.background }}
            >
              <div 
                className="p-4 rounded-lg mb-4"
                style={{ backgroundColor: theme.card }}
              >
                <h4 style={{ color: theme.text }} className="font-medium mb-2">
                  Sample Card
                </h4>
                <p style={{ color: theme.text }} className="text-sm">
                  This is how your dashboard will look with the selected theme.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{
                    backgroundColor: theme.primary,
                    color: '#FFFFFF',
                  }}
                >
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{
                    backgroundColor: theme.secondary,
                    color: '#FFFFFF',
                  }}
                >
                  Secondary Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
