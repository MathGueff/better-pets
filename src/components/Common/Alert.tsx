import React from 'react';
import './Alert.css';

interface AlertProps {
  message: string;
  type?: 'error' | 'success' | 'warning';
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type = 'error', onClose }) => {
  return (
    <div className={`alert alert-${type} glass`}>
      <span className="alert-message">{message}</span>
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
