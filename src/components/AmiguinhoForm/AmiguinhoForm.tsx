import React, { useState, useEffect } from 'react';
import './AmiguinhoForm.css';
import type { Amiguinho } from '../../services/api';

interface AmiguinhoFormProps {
  onSubmit: (data: Amiguinho) => void;
  onCancel: () => void;
  initialData?: Amiguinho | null;
}

const AmiguinhoForm: React.FC<AmiguinhoFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<Amiguinho>({
    name: '',
    age: 0,
    breed: '',
  });

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="amiguinho-form-container glass">
      <h2 className="form-title">
        {initialData ? 'Editar Amiguinho' : 'Novo Amiguinho'}
      </h2>
      <form className="amiguinho-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nome do Amiguinho</label>
          <input
            type="text"
            className="form-input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Totó"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Idade (anos)</label>
          <input
            type="number"
            className="form-input"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Raça</label>
          <input
            type="text"
            className="form-input"
            value={formData.breed}
            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
            placeholder="Ex: Labrador"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline form-btn" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary form-btn">
            {initialData ? 'Salvar Alterações' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AmiguinhoForm;
