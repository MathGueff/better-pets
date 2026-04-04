import React from 'react';
import './Navbar.css';
import logoPath from '../../assets/logo.svg';

interface NavbarProps {
  onGoHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGoHome }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={onGoHome} style={{ cursor: 'pointer' }}>
        <img src={logoPath} alt="Better Pets Logo" className="logo" />
        <span>Better Pets</span>
      </div>
      
      <div className="nav-links">
        <button onClick={onGoHome} className="nav-item">Início</button>
        <button onClick={onGoHome} className="nav-item">Amiguinhos</button>
      </div>
    </nav>
  );
};

export default Navbar;
