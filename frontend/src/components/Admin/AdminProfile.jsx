import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "../Styles/AdminProfile.css";

const AdminProfile = () => {
  const [profile, setProfile] = useState({});
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("adminToken");

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "/admin/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data.admin);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      await axios.put(
        "/admin/update-profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated");
      setEdit(false);
      fetchProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhoto = async () => {
    if (!file) {
      alert("Select image first");
      return;
    }

    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    try {
      const res =
        await axios.post(
          "/admin/upload-photo",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      alert(
        res.data.message
      );

      fetchProfile();
      window.dispatchEvent(
        new Event(
          "adminProfileUpdated"
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-profile-page">
      <div className="admin-profile-card">

        {/* LEFT */}
        <div className="admin-profile-left">

          <img
 src={
  profile.profilePic
    ? profile.profilePic
    : `https://ui-avatars.com/api/?name=${profile.name || "Admin"}`
}
            alt="Admin"
            className="admin-avatar"
          />

          <h2>
            {profile.name}
          </h2>

          <p>
            {profile.email}
          </p>

          <span className="admin-role-badge">
            Admin
          </span>

          <div className="upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFile(
                  e.target
                    .files[0]
                )
              }
            />

            <button
              onClick={
                uploadPhoto
              }
              className="upload-btn"
            >
              Upload Photo
            </button>
          </div>

        </div>

        {/* RIGHT */}
        <div className="admin-profile-right">

          <div className="admin-profile-head">
            <h3>
              My Profile
            </h3>

            {!edit ? (
              <button
                className="edit-btn"
                onClick={() =>
                  setEdit(
                    true
                  )
                }
              >
                Edit
              </button>
            ) : (
              <button
                className="save-btn"
                onClick={
                  saveProfile
                }
              >
                Save
              </button>
            )}
          </div>

          <div className="admin-form-grid">

            <div className="input-group">
              <label>
                Name
              </label>

              <input
                type="text"
                name="name"
                value={
                  profile.name ||
                  ""
                }
                onChange={
                  handleChange
                }
                disabled={
                  !edit
                }
              />
            </div>

            <div className="input-group">
              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  profile.email ||
                  ""
                }
                onChange={
                  handleChange
                }
                disabled={
                  !edit
                }
              />
            </div>

            <div className="info-box">
              <span>
                Role
              </span>

              <strong>
                Admin
              </strong>
            </div>

            <div className="info-box">
              <span>
                Joined
              </span>

              <strong>
                {profile.createdAt
                  ? new Date(
                      profile.createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </strong>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminProfile;