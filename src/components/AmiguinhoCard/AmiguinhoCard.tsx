import React from 'react';
import './AmiguinhoCard.css';
import type { Amiguinho } from '../../services/api';

interface AmiguinhoCardProps {
  amiguinho: Amiguinho;
  onDelete: (id: string) => void;
  onEdit: (amiguinho: Amiguinho) => void;
}

const AmiguinhoCard: React.FC<AmiguinhoCardProps> = ({ amiguinho, onDelete, onEdit }) => {
  const defaultPhoto = '/images/mysterious-dog.png';

  return (
    <div className="amiguinho-card">
      <div className="card-image-content">
        <img 
          src={amiguinho.photo || defaultPhoto} 
          alt={amiguinho.name} 
          className="card-photo" 
        />
        <div className="gender-badge">
          {amiguinho.gender === 'M' ? '♂️' : '♀️'}
        </div>
      </div>
      <div className="card-header">
        <div>
          <h3 className="amiguinho-name">{amiguinho.name}</h3>
          <p className="amiguinho-breed">🐾 {amiguinho.breed}</p>
        </div>
        <span className="amiguinho-age">{amiguinho.age} {amiguinho.age === 1 ? 'ano' : 'anos'}</span>
      </div>
      
      <div className="card-actions">
        <button className="btn-icon" onClick={() => onEdit(amiguinho)} title="Editar">
          ✏️
        </button>
        <button className="btn-icon btn-icon-delete" onClick={() => amiguinho._id && onDelete(amiguinho._id)} title="Remover">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default AmiguinhoCard;
