import React, { useState } from 'react';
import './Suggestion.css';
import {createFollow} from "../../services/follow-service.js";

const Suggestion = ({ suggestions, createFollowCall  }) => {
  return (
    <div className="suggestion">
      <h3>Sugestões de Amizade</h3>
      {suggestions.length === 0 && <span>Sem sugestões no momento</span>}
      {suggestions.map((user) => (
        <div key={user.id} className="suggestion-item">
          <img src={user.avatar} alt={`${user.name} avatar`} className="suggestion-avatar" />
          <div className="suggestion-info">
            <div className="suggestion-name">{user.name}</div>
          </div>
          <button 
            className='follow-button'
            onClick={() => createFollowCall(user.userId)}
          >
            Seguir
          </button>
        </div>
      ))}
    </div>
  );
};

export default Suggestion;