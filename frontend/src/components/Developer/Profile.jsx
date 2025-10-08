import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import '../../components/Styles/DeveloperProfile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/developers/verify");
        setProfile(res.data.developer);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading profile...</p>;
  if (!profile) return <p className="text-center text-danger mt-5">No profile data found.</p>;

  return (
    <div className="profile-page d-flex justify-content-center align-items-center">
      <div className="card profile-card shadow-lg p-4">
        <h2 className="text-center mb-3">My Profile</h2>
        <hr />

        <div className="profile-details">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role || "Developer"}</p>
          <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
          <p><strong>Projects:</strong> {profile.projects?.length || 0}</p>
        </div>

        <div className="d-grid mt-3">
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
