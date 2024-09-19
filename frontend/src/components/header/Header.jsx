import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.svg';
import './Header.css';
import {deleteAccount} from "../../services/user-service.js";
import {InputField} from "../index.jsx";

const Header = ({ userProfilePic, userName }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const profileIconRef = useRef(null);
  const profileMenuRef = useRef(null);
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  const handleClickOutside = (event) => {
    if(
      profileIconRef.current &&
      !profileIconRef.current.contains(event.target) &&
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target)
    ) {
      setProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('id');
    window.location.href = '/';
  };

  const handleDeleteAccount = () => {
    setShowDeletePopup(true);
  };


  const cancelDeleteAccount = () => {
    setShowDeletePopup(false);
  };

  const excluirConta = async () => {
    try {
      await deleteAccount({
        email: window.localStorage.getItem('email'),
        password
      })
      setShowDeletePopup(false);
      alert('Conta excluída!');
      handleLogout()
    } catch (e) {
      alert('Erro ao excluir conta');
    }

  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/home">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Pesquisar" />
        </div>
        <div
          className="profile-icon"
          onClick={toggleProfileMenu}
          ref={profileIconRef}
        >
          <FontAwesomeIcon icon={faUserCircle} size="2x" className="profile-pic" />
          {profileMenuOpen && (
            <div className="profile-menu" ref={profileMenuRef}>
              <div className="profile-menu-header">
              <FontAwesomeIcon icon={faUserCircle} size="2x" className="profile-menu-pic" />
                <span className="profile-menu-username">{userName}</span>
              </div>
              <ul>
                <li onClick={handleViewProfile}>Ver perfil</li>
                <li onClick={handleDeleteAccount}>Excluir conta</li>
                <li onClick={handleLogout}>Sair</li>
              </ul>
            </div>
          )}
        </div>
      </header>
      {showDeletePopup && (
        <div className="delete-popup">
          <h2>Excluir Conta</h2>
          <p>Digite sua senha para confirmar:</p>
          <InputField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Senha"
          />
          <button type="submit" onClick={excluirConta}>Excluir</button>
          <button type="button" onClick={cancelDeleteAccount}>Cancelar</button>
        </div>
      )}
    </>
  );
};

export default Header;