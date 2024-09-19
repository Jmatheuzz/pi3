import React, { useRef, useEffect, useState } from 'react';
import { Header, ProfileCard, Popup } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'; 
import './Profile.css';
import {getUserInfo, updateInfo} from "../../services/user-service.js";

const Profile = () => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [userName, setUserName] = useState('Nome de usuario');
  const [userInfo, setUserInfo] = useState('Desenvolvedor Front-end | Bacharel em Ciência da Computação | Empresa XYZ');
  const [aboutMe, setAboutMe] = useState('Aqui você pode escrever algo sobre você.');

  const [showPhotoPopup, setShowPhotoPopup] = useState(false);
  const [showEditInfoPopup, setShowEditInfoPopup] = useState(false);
  const [showContactInfoPopup, setShowContactInfoPopup] = useState(false);

  const editInfoPopupRef = useRef(null);
  const contactInfoPopupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editInfoPopupRef.current && !editInfoPopupRef.current.contains(event.target)) {
        setShowEditInfoPopup(false);
      }
      if (contactInfoPopupRef.current && !contactInfoPopupRef.current.contains(event.target)) {
        setShowContactInfoPopup(false);
      }
    };
    getUserInfo().then(({data}) => {
      setAboutMe(data.about)
      setUserName(data.username)
      setUserInfo(data.position)
    })

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };


  }, []);

  // Alterar foto
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserPhoto(reader.result);
      reader.readAsDataURL(file);
    }
    setShowPhotoPopup(false);
  };

  // Alterar info usuário
  const handleEditInfo = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setUserName(formData.get('userName'));
    setUserInfo(formData.get('userInfo'));
    setAboutMe(formData.get('aboutMe'));
    setShowEditInfoPopup(false);
    console.log()
    await updateInfo({username: formData.get('userName'), position: formData.get('userInfo'), about: formData.get('aboutMe')})
  };

  // Contato
  const handleOpenContactInfo = () => {
    setShowContactInfoPopup(true);
  };

  return (
    <div className="profile">
      <Header />
      <div className="profile-content-container">
        <div className="profile-container">
          <ProfileCard
            userPhoto={userPhoto}
            userName={userName}
            userInfo={userInfo}
          />
          <div className="profile-actions">
          <FontAwesomeIcon
              icon={faEdit}
              className="edit-info-icon"
              onClick={() => setShowEditInfoPopup(true)}
            />
            <span className="contact-info-link" onClick={handleOpenContactInfo}>
              Informações para Contato
            </span>
          </div>
          <div className="about-me">
            <h3>Sobre</h3>
            <p>{aboutMe}</p>
          </div>
        </div>
        <Popup 
          title="Editar Informações"
          isOpen={showEditInfoPopup}
          onClose={() => setShowEditInfoPopup(false)}
          ref={editInfoPopupRef}
        >
          <form onSubmit={handleEditInfo}>
            <label>
              Nome:
              <input type="text" name="userName" defaultValue={userName} />
            </label>
            <label>
              Informações:
              <input type="text" name="userInfo" defaultValue={userInfo} />
            </label>
            <label>
              Sobre:
              <textarea name="aboutMe" defaultValue={aboutMe} />
            </label>
            <button type="submit">Salvar</button>
          </form>
        </Popup>
        <Popup
          title="Informações para Contato"
          isOpen={showContactInfoPopup}
          onClose={() => setShowContactInfoPopup(false)}
          ref={contactInfoPopupRef}
        >
          <ul>
            <li><a href="https://linkedin.com/in/ser-linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="mailto:seu-email@example.com">Email</a></li>
          </ul>
        </Popup>
      </div>
    </div>
  )
};

export default Profile;