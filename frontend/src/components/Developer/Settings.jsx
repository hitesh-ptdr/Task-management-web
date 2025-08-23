import React, { useState } from "react";
import axios from "../../api/axios";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/developers/change-password", {
        currentPassword,
        newPassword,
      });
      setMessage(res.data.message || "Password changed successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error changing password");
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Password:</label><br/>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label><br/>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Settings;
