import React from 'react';
import './Navbar.css';
import logoPath from '../../assets/logo.svg';

interface NavbarProps {
  wellBeing: boolean;
  onGoHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ wellBeing, onGoHome }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={onGoHome} style={{ cursor: 'pointer' }}>
        <img src={logoPath} alt="Better Pets Logo" className="logo" />
        <span>Better Pets</span>
      </div>
      
      <div className="nav-links">
        <button onClick={onGoHome} className="nav-item">Início</button>
        <a href="#" className="nav-item">Amiguinhos</a>
        <div className="bem-estar-status">
          <div className={`status-dot ${wellBeing ? 'status-online' : 'status-offline'}`} />
          Bem-estar do sistema
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
