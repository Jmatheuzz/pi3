import React, { useState } from 'react';
import './Post.css';

const Post = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(prev => !prev);
  };

  const connectionDegree = 3; // Grau de conexao, mudar com o retorno do BFS

  return (
    <div className="post">
      <div className="post-header">
        <img src={user.avatar} alt={`${user.name} avatar`} className="post-avatar" />
        <div className="post-info">
          <div className="post-name">{user.name}</div>
          <div className="post-info-text">Grau de conexão {connectionDegree}</div>
        </div>
        <button 
          className={`follow-button ${isFollowing ? 'following' : ''}`} 
          onClick={handleFollowToggle}
        >
          {isFollowing ? 'Seguindo' : 'Seguir'}
        </button>
      </div>
      <div className="post-content">{user.postContent}</div>
    </div>
  );
};

export default Post;
