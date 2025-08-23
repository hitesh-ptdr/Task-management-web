// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import "../Styles/Profile.css";

// const Profile = () => {
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("/developer/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(res.data);
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         alert("❌ Failed to fetch profile");
//       }
//     };
//     fetchProfile();
//   }, []);

//   if (!profile) return <p>Loading profile...</p>;

//   return (
//     <div className="profile-container">
//       <h2>Developer Profile</h2>
//       <p><strong>Name:</strong> {profile.name}</p>
//       <p><strong>Email:</strong> {profile.email}</p>
//       <p><strong>Role:</strong> {profile.role}</p>
//       <p><strong>Status:</strong> {profile.status}</p>
//       <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
//     </div>
//   );
// };

// export default Profile;
   

import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "../Styles/DeveloperProfile.css";

const DeveloperProfile = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("devToken");
        const res = await axios.get("/developer/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("devToken");
      const res = await axios.put("/developer/profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="dev-profile-container">
      <form onSubmit={handleUpdate}>
        <h2>Developer Profile</h2>
        {message && <p className="success-msg">{message}</p>}
        <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" required />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default DeveloperProfile;
