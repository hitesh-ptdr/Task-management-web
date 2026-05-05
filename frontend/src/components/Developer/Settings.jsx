import React, { useEffect, useState } from "react";
import "../Styles/DeveloperSettings.css";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDark = () => {
    const value = !darkMode;
    setDarkMode(value);
    localStorage.setItem("darkMode", value);
    document.body.classList.toggle("dark-theme", value);
  };

  return (
    <div className="settings-page">
      <div className="settings-card">
        <h2>Settings</h2>

        <label>
          Dark Mode
          <input type="checkbox" checked={darkMode} onChange={toggleDark} />
        </label>
      </div>
    </div>
  );
};

export default Settings;