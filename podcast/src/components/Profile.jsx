import React, { useState } from 'react';
import './Profile.css'; // Import CSS styles

const Profile = () => {
  // Example initial state for profile fields
  const [profileData, setProfileData] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update profile data (e.g., API call)
    console.log('Profile data submitted:', profileData);
    // Optionally, show success message or handle errors
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={profileData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
