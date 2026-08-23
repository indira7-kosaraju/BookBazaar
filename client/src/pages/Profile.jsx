import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      const response = await API.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const profile = response.data.user;

      setUser(profile);

      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        location: profile.location || "",
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await API.put(
        "/users/profile",
        {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          location: formData.location.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);

      setFormData({
        name: response.data.user.name || "",
        phone: response.data.user.phone || "",
        location: response.data.user.location || "",
      });

      setEditing(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-message">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-message">
        <h2>Unable to load profile</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* HEADER */}

      <div className="profile-header">
        <p>👤 Account</p>

        <h1>My Profile</h1>

        <span>
          Manage your personal information
        </span>
      </div>

      {/* PROFILE CARD */}

      <div className="profile-card">

        {/* PROFILE TOP */}

        <div className="profile-top">

          <div className="profile-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>

        </div>

        {!editing ? (

          /* VIEW MODE */

          <div className="profile-view">

            <div className="profile-field">
              <span>Full Name</span>
              <strong>
                {user.name}
              </strong>
            </div>

            <div className="profile-field">
              <span>Email Address</span>
              <strong>
                {user.email}
              </strong>
            </div>

            <div className="profile-field">
              <span>Phone Number</span>
              <strong>
                {user.phone || "Not provided"}
              </strong>
            </div>

            <div className="profile-field">
              <span>Location</span>
              <strong>
                {user.location || "Not provided"}
              </strong>
            </div>

            <button
              className="edit-profile-button"
              onClick={() => setEditing(true)}
            >
              ✏️ Edit Profile
            </button>

          </div>

        ) : (

          /* EDIT MODE */

          <form
            className="profile-form"
            onSubmit={updateProfile}
          >

            <div className="profile-form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="profile-form-group">
              <label>Email Address</label>

              <input
                type="email"
                value={user.email}
                disabled
              />

              <small>
                Email cannot be changed.
              </small>
            </div>

            <div className="profile-form-group">
              <label>Phone Number</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="profile-form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your location"
              />
            </div>

            <div className="profile-actions">

              <button
                type="button"
                className="profile-cancel"
                onClick={() => setEditing(false)}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="profile-save"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "💾 Save Changes"}
              </button>

            </div>

          </form>
        )}

      </div>
    </div>
  );
}

export default Profile;