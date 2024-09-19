import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './ProfileCard.css';

const ProfileCard = ({ userPhoto, userName, userInfo }) => {

  const navigate = useNavigate();
    console.log(userName)
  const handleCardClick = () => {
    navigate('/profile');
  };

  return (
    <div className="profile-card"> 
      <div className="user-photo-container" onClick={handleCardClick}>
        {userPhoto ? (
          <img src={userPhoto} alt="User" className="user-photo" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
        )}
      </div>
      <div className="profile-details">
        <h2 className="user-name" onClick={handleCardClick}>{userName || 'Nome do Usuário'}</h2>
        <p className="user-title" onClick={handleCardClick}>{userInfo || 'Info do Usuário'}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
