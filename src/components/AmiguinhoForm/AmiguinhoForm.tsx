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
    gender: 'M',
    size: 0,
    weight: 0,
    bornDate: new Date().toISOString().split('T')[0],
    adoptionDate: new Date().toISOString().split('T')[0],
    photo: '',
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
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Gênero</label>
            <select 
              className="form-input"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
              required
            >
              <option value="M">Macho</option>
              <option value="F">Fêmea</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">URL da Foto</label>
            <input
              type="text"
              className="form-input"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Peso (kg)</label>
            <input
              type="number"
              className="form-input"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
              min="0"
              step="0.1"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tamanho (cm)</label>
            <input
              type="number"
              className="form-input"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: Number(e.target.value) })}
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Data de Nascimento</label>
            <input
              type="date"
              className="form-input"
              value={formData.bornDate}
              onChange={(e) => setFormData({ ...formData, bornDate: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Data de Adoção</label>
            <input
              type="date"
              className="form-input"
              value={formData.adoptionDate}
              onChange={(e) => setFormData({ ...formData, adoptionDate: e.target.value })}
              required
            />
          </div>
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
