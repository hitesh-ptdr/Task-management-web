import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "../Styles/DeveloperSettings.css";

const Settings = () => {
  const [settings, setSettings] = useState(null);

  const token = localStorage.getItem("devToken");

  /* ===========================
     LOAD FROM BACKEND
  ============================ */
  useEffect(() => {
    const fetchSettings = async () => {
      const res = await axios.get("/settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSettings(res.data);
    };

    fetchSettings();
  }, [token]);

  /* ===========================
     HANDLE CHANGE
  ============================ */
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* ===========================
     SAVE TO BACKEND
  ============================ */
  const handleSave = async () => {
    await axios.put("/settings", settings, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Saved successfully");
  };

  if (!settings) return <p>Loading...</p>;

  return (
    <div>
      <h2>Settings</h2>

      <label>
        Dark Mode
        <input
          type="checkbox"
          name="darkMode"
          checked={settings.darkMode}
          onChange={handleChange}
        />
      </label>

      <label>
        Email Notify
        <input
          type="checkbox"
          name="emailNotify"
          checked={settings.emailNotify}
          onChange={handleChange}
        />
      </label>

      <label>
        Language
        <select
          name="language"
          value={settings.language}
          onChange={handleChange}
        >
          <option>English</option>
          <option>Hindi</option>
        </select>
      </label>

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Settings;