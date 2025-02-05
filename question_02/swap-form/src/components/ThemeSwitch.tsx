
'use client';  

import React, { useState, useEffect } from 'react';

const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <label htmlFor="theme-toggle" className="inline-flex items-center cursor-pointer">
        <span className="mr-2 text-sm">Toggle Dark Mode</span>
        <input
          id="theme-toggle"
          type="checkbox"
          checked={isDarkMode}
          onChange={handleToggle}
          className="hidden"
        />
        <span className="w-12 h-6 bg-gray-300 rounded-full relative">
          <span
            className={`w-6 h-6 bg-white rounded-full transition-all duration-300 absolute left-0 top-0.5 ${isDarkMode ? 'transform translate-x-6' : ''}`}
          />
        </span>
      </label>
    </div>
  );
};

export default ThemeSwitch;
