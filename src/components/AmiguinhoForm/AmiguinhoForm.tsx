import React, { useState, useEffect } from 'react';
import './AmiguinhoForm.css';
import Alert from '../Common/Alert';
import { ApiError } from '../../services/api';
import type { Amiguinho, ValidationError } from '../../services/api';

interface AmiguinhoFormProps {
  onSubmit: (data: Amiguinho) => Promise<void>;
  onCancel: () => void;
  initialData?: Amiguinho | null;
}

const AmiguinhoForm: React.FC<AmiguinhoFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const getDefaultDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const [formData, setFormData] = useState<Amiguinho>({
    name: '',
    breed: '',
    gender: 'M',
    size: 0,
    weight: 0,
    bornDate: new Date().toISOString().split('T')[0],
    adoptionDate: new Date().toISOString().split('T')[0],
    photo: '',
    schedule: {
      walk: { timeExpected: getDefaultDateTime() },
      feed: { timeExpected: getDefaultDateTime() },
      water: { timeExpected: getDefaultDateTime() },
    }
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [mainError, setMainError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        schedule: initialData.schedule || {
          walk: { timeExpected: getDefaultDateTime() },
          feed: { timeExpected: getDefaultDateTime() },
          water: { timeExpected: getDefaultDateTime() },
        }
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setMainError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (error: any) {
      if (error instanceof ApiError) {
        setMainError(error.response.message);
        setErrors(error.response.error || []);
      } else if (error.response) {
        setMainError(error.response.message);
        setErrors(error.response.error || []);
      } else {
        setMainError(error.message || 'Ocorreu um erro inesperado');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string) => {
    const error = errors.find(err => err.field === fieldName);
    return error ? error.message : null;
  };

  const updateSchedule = (type: 'walk' | 'feed' | 'water', dateTime: string) => {
    setFormData({
      ...formData,
      schedule: {
        ...formData.schedule!,
        [type]: { timeExpected: dateTime }
      }
    });
  };

  return (
    <div className="amiguinho-form-container glass">
      <button className="form-close-btn" onClick={onCancel}>&times;</button>
      <h2 className="form-title">
        {initialData ? 'Editar Amiguinho' : 'Novo Amiguinho'}
      </h2>

      {mainError && <Alert message={mainError} onClose={() => setMainError(null)} />}

      <form className="amiguinho-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nome do Amiguinho</label>
          <input
            type="text"
            className={`form-input ${getFieldError('name') ? 'input-error' : ''}`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Totó"
          />
          {getFieldError('name') && <span className="error-text">{getFieldError('name')}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Raça</label>
          <input
            type="text"
            className={`form-input ${getFieldError('breed') ? 'input-error' : ''}`}
            value={formData.breed}
            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
            placeholder="Ex: Labrador"
          />
          {getFieldError('breed') && <span className="error-text">{getFieldError('breed')}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Gênero</label>
            <select 
              className={`form-input ${getFieldError('gender') ? 'input-error' : ''}`}
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
            >
              <option value="M">Macho</option>
              <option value="F">Fêmea</option>
            </select>
            {getFieldError('gender') && <span className="error-text">{getFieldError('gender')}</span>}
          </div>
          <div className="form-group" style={{ flex: 2 }}>
            <label className="form-label">URL da Foto</label>
            <input
              type="text"
              className={`form-input ${getFieldError('photo') ? 'input-error' : ''}`}
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              placeholder="https://..."
            />
            {getFieldError('photo') && <span className="error-text">{getFieldError('photo')}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Peso (kg)</label>
            <input
              type="number"
              className={`form-input ${getFieldError('weight') ? 'input-error' : ''}`}
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
              step="0.1"
            />
            {getFieldError('weight') && <span className="error-text">{getFieldError('weight')}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Tamanho (cm)</label>
            <input
              type="number"
              className={`form-input ${getFieldError('size') ? 'input-error' : ''}`}
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: Number(e.target.value) })}
            />
            {getFieldError('size') && <span className="error-text">{getFieldError('size')}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Data de Nascimento</label>
            <input
              type="date"
              className={`form-input ${getFieldError('bornDate') ? 'input-error' : ''}`}
              value={formData.bornDate}
              onChange={(e) => setFormData({ ...formData, bornDate: e.target.value })}
            />
            {getFieldError('bornDate') && <span className="error-text">{getFieldError('bornDate')}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Data de Adoção</label>
            <input
              type="date"
              className={`form-input ${getFieldError('adoptionDate') ? 'input-error' : ''}`}
              value={formData.adoptionDate}
              onChange={(e) => setFormData({ ...formData, adoptionDate: e.target.value })}
            />
            {getFieldError('adoptionDate') && <span className="error-text">{getFieldError('adoptionDate')}</span>}
          </div>
        </div>

        <div className="schedule-section">
          <h3 className="section-subtitle">Eventos</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Passeio</label>
              <input
                type="datetime-local"
                className={`form-input ${getFieldError('schedule.walk') ? 'input-error' : ''}`}
                value={formData.schedule?.walk.timeExpected}
                onChange={(e) => updateSchedule('walk', e.target.value)}
              />
              {getFieldError('schedule.walk') && <span className="error-text">{getFieldError('schedule.walk')}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Refeição</label>
              <input
                type="datetime-local"
                className={`form-input ${getFieldError('schedule.feed') ? 'input-error' : ''}`}
                value={formData.schedule?.feed.timeExpected}
                onChange={(e) => updateSchedule('feed', e.target.value)}
              />
              {getFieldError('schedule.feed') && <span className="error-text">{getFieldError('schedule.feed')}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Água</label>
              <input
                type="datetime-local"
                className={`form-input ${getFieldError('schedule.water') ? 'input-error' : ''}`}
                value={formData.schedule?.water.timeExpected}
                onChange={(e) => updateSchedule('water', e.target.value)}
              />
              {getFieldError('schedule.water') && <span className="error-text">{getFieldError('schedule.water')}</span>}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline form-btn" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary form-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : (initialData ? 'Salvar Alterações' : 'Cadastrar')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AmiguinhoForm;
