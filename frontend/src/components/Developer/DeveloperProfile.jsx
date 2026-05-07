import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "../Styles/DeveloperProfile.css";

const DeveloperProfile = () => {
  const [profile, setProfile] = useState({});
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("devToken");

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "/developers/verify",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data.developer);
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
        "/developers/update-profile",
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

  /* =========================
     FIXED PHOTO UPLOAD
  ========================= */
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
          "/developers/upload-photo",
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

      setFile(null);
fetchProfile();

window.dispatchEvent(
  new Event("profileUpdated")
);
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data
          ?.message ||
          "Upload Failed"
      );
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* LEFT */}
        <div className="profile-left">

          <img
            src={
              profile.profilePic
                ? `https://task-management-web-umd5.onrender.com/uploads/${profile.profilePic}`
                : `https://ui-avatars.com/api/?name=${profile.name || "User"}`
            }
            alt="Profile"
            className="avatar"
          />

          <h2>
            {profile.name}
          </h2>

          <p>
            {profile.email}
          </p>

          <span className="role-badge">
            {profile.role}
          </span>

          {/* Upload */}
          <div
            style={{
              width: "100%",
              marginTop:
                "20px",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFile(
                  e.target
                    .files[0]
                )
              }
              style={{
                width:
                  "100%",
                marginBottom:
                  "10px",
                color:
                  "white",
              }}
            />

            <button
              onClick={
                uploadPhoto
              }
              style={{
                width:
                  "100%",
                padding:
                  "12px",
                border:
                  "none",
                borderRadius:
                  "12px",
                background:
                  "#2563eb",
                color:
                  "#fff",
                fontWeight:
                  "600",
                cursor:
                  "pointer",
              }}
            >
              Upload Photo
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="profile-right">

          <div className="profile-head">
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

          <div className="form-grid">

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
                {
                  profile.role
                }
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

export default DeveloperProfile;