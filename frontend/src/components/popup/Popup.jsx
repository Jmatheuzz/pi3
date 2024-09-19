import React, { useRef, useEffect } from 'react';
import './Popup.css';

const Popup = ({ title, children, isOpen, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content" ref={popupRef}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Popup;