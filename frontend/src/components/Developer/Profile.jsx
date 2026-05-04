// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import '../../components/Styles/DeveloperProfile.css';

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("/developers/verify");
//         setProfile(res.data.developer);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   if (loading) return <p className="text-center mt-5">Loading profile...</p>;
//   if (!profile) return <p className="text-center text-danger mt-5">No profile data found.</p>;

//   return (
//     <div className="profile-page d-flex justify-content-center align-items-center">
//       <div className="card profile-card shadow-lg p-4">
//         <h2 className="text-center mb-3">My Profile</h2>
//         <hr />

//         <div className="profile-details">
//           <p><strong>Name:</strong> {profile.name}</p>
//           <p><strong>Email:</strong> {profile.email}</p>
//           <p><strong>Role:</strong> {profile.role || "Developer"}</p>
//           <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
//           <p><strong>Projects:</strong> {profile.projects?.length || 0}</p>
//         </div>

//         <div className="d-grid mt-3">
//           <button className="btn btn-primary">Edit Profile</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
   
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import '../../components/Styles/DeveloperProfile.css';


const Profile = () => {
  const [profile, setProfile] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/developers/verify");
      setProfile(res.data.developer);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await axios.put(
        "/developers/update-profile",
        profile
      );

      alert("Profile Updated");
      setEdit(false);
      fetchProfile();
    } catch (error) {
      alert("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  const firstLetter =
    profile?.name?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Left */}
        <div className="profile-left">
          <div className="avatar">
            {firstLetter}
          </div>

          <h2>
            {profile.name || "Developer"}
          </h2>

          <p>
            {profile.email ||
              "developer@email.com"}
          </p>

          <span className="role-badge">
            {profile.role || "Developer"}
          </span>
        </div>

        {/* Right */}
        <div className="profile-right">
          <div className="profile-head">
            <h3>
              Account Information
            </h3>

            {!edit ? (
              <button
                className="edit-btn"
                onClick={() =>
                  setEdit(true)
                }
              >
                Edit Profile
              </button>
            ) : (
              <button
                className="save-btn"
                onClick={
                  handleUpdate
                }
                disabled={
                  loading
                }
              >
                {loading
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            )}
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>
                Full Name
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
                Email Address
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

            {edit && (
              <div className="input-group full">
                <label>
                  New Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  onChange={
                    handleChange
                  }
                />
              </div>
            )}

            <div className="info-box">
              <span>
                Joined Date
              </span>

              <strong>
                {profile.createdAt
                  ? new Date(
                      profile.createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </strong>
            </div>

            <div className="info-box">
              <span>Status</span>
              <strong>
                Active
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;