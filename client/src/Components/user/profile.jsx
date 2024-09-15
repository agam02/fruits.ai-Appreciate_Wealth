import React from 'react';
import './Profile.css';
import image from '../../assets/unsplash_mEZ3PoFGs_k.png'

const Profile = () => {
  return (
    <div className="profile-container">
      {/* Profile Info Section */}
      <div className="profile-card">
        <div className="profile-image-wrapper">
          <img
            src={image}
            alt="Jane Doe"
            className="profile-image"
          />
          <div className="edit-icon">
            <i className="fas fa-pencil-alt"></i>
          </div>
        </div>
        <div className="profile-info">
          <h2 className="profile-name">Jane Doe</h2>
          <p className="profile-bio">This is a small bio description to let users express themselves</p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="menu-section">
        <ul className="menu-list">
          <li><i className="fas fa-user"></i> Account</li>
          <li><i className="fas fa-comment"></i> Chat Settings</li>
          <li><i className="fas fa-bell"></i> Notifications</li>
          <li><i className="fas fa-database"></i> Storage</li>
          <li><i className="fas fa-question-circle"></i> Help</li>
          <li><i className="fas fa-user-friends"></i> Invite a friend</li>
        </ul>
        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
