import React, { useContext } from 'react';
import { ThemeContext } from '../Profiledashboard/ThemeContext'; // Adjust the path as needed

const Settings = () => {
  const { theme, setTheme, language, setLanguage } = useContext(ThemeContext);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    alert(`Application will reload after switching to ${e.target.value === 'en' ? 'English' : 'Hindi'}`);
    // Add reload or translation logic here if needed
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-5 font-sans min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 mb-5 shadow-md">
        <h2 className="text-xl mb-2 text-gray-900 dark:text-gray-100">Choose Your Language</h2>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          After changing the application language, the application will reload
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md">
        <h2 className="text-xl mb-2 text-gray-900 dark:text-gray-100">Choose Your Theme</h2>
        <div className="flex items-center gap-5">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={handleThemeChange}
              className="mr-1 text-blue-600"
            />
            <span className="text-gray-900 dark:text-gray-100">Dark Mode</span>
            <div className="w-24 h-16 border border-gray-300 dark:border-gray-600 bg-black"></div>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={handleThemeChange}
              className="mr-1 text-blue-600"
            />
            <span className="text-gray-900 dark:text-gray-100">Light Mode</span>
            <div className="w-24 h-16 border border-gray-300 dark:border-gray-600 bg-white"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;