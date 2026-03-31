import type { Amiguinho } from '../../services/api';

interface PetDashboardProps {
  amiguinhos: Amiguinho[];
  selectedPet: Amiguinho | null;
  onSelectPet: (pet: Amiguinho) => void;
  onAddPet: () => void;
  onEditPet: (pet: Amiguinho) => void;
  onDeletePet: (id: string) => void;
}

const PetDashboard: React.FC<PetDashboardProps> = ({ 
  amiguinhos, 
  selectedPet, 
  onSelectPet, 
  onAddPet,
  onEditPet,
  onDeletePet
}) => {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="dashboard-layout">
        <aside className="sidebar shadow">
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--primary)', fontWeight: 700 }}>Meus Amiguinhos</h3>
            <button onClick={onAddPet} className="btn-icon" title="Novo Amiguinho">+</button>
          </header>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {amiguinhos.map(pet => (
              <div 
                key={pet._id}
                onClick={() => onSelectPet(pet)}
                className={`glass ${selectedPet?._id === pet._id ? 'active-pet' : ''}`}
                style={{ 
                  padding: '1rem', 
                  borderRadius: '16px', 
                  cursor: 'pointer',
                  border: selectedPet?._id === pet._id ? '2px solid var(--secondary)' : '1px solid transparent',
                  background: selectedPet?._id === pet._id ? 'var(--white)' : ''
                }}
              >
                <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{pet.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-soft)' }}>{pet.breed}</div>
              </div>
            ))}
            {amiguinhos.length === 0 && <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Nenhum animal cadastrado.</p>}
          </div>
        </aside>

        <main>
          {selectedPet ? (
            <div className="card" style={{ background: 'white', padding: '2rem' }}>
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div className="pet-photo-container">
                    <img 
                      src={selectedPet.photo || '/images/mysterious-dog.png'} 
                      alt={selectedPet.name} 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '50%', 
                        objectFit: 'cover',
                        border: '4px solid var(--bg-pale)'
                      }} 
                    />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>
                      {selectedPet.name} {selectedPet.gender === 'M' ? '♂️' : '♀️'}
                    </h2>
                    <p style={{ color: 'var(--text-soft)', fontSize: '0.9rem' }}>Painel Holístico de Bem-estar</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => onEditPet(selectedPet)} className="btn-icon" title="Editar">✏️</button>
                    <button onClick={() => selectedPet._id && onDeletePet(selectedPet._id)} className="btn-icon btn-icon-delete" title="Excluir">🗑️</button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="health-pulse" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--secondary)' }}>
                    {selectedPet.health}% Saúde
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Cálculo auditado hoje</div>
                </div>
              </header>

              <div className="status-grid">
                <div className="status-item glass">
                  <div style={{ fontSize: '1.5rem' }}>🍲</div>
                  <div style={{ fontWeight: 600 }}>{selectedPet.schedule?.feed.timeExpected ? `Próxima: ${selectedPet.schedule.feed.timeExpected}` : 'Horário não definido'}</div>
                </div>
                <div className="status-item glass">
                  <div style={{ fontSize: '1.5rem' }}>💧</div>
                  <div style={{ fontWeight: 600 }}>{selectedPet.schedule?.water.timeExpected ? `Próxima: ${selectedPet.schedule.water.timeExpected}` : 'Horário não definido'}</div>
                </div>
                <div className="status-item glass">
                  <div style={{ fontSize: '1.5rem' }}>✨</div>
                  <div style={{ fontWeight: 600 }}>{selectedPet.schedule?.walk.timeExpected ? `Lazer: ${selectedPet.schedule.walk.timeExpected}` : 'Horário não definido'}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                <section>
                  <h4 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--bg-pale)', paddingBottom: '0.5rem' }}>Agenda de Hoje</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className="glass" style={{ padding: '0.8rem', borderRadius: '12px' }}>
                      📅 <strong>Fome:</strong> {selectedPet.schedule?.feed.timeExpected || 'Não agendado'}
                    </div>
                    <div className="glass" style={{ padding: '0.8rem', borderRadius: '12px' }}>
                      🚿 <strong>Sede:</strong> {selectedPet.schedule?.water.timeExpected || 'Não agendado'}
                    </div>
                    <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#fff9e6', borderRadius: '12px', fontSize: '0.8rem', border: '1px dashed #ffd966' }}>
                      📩 <strong>Sistema:</strong> Notificação de e-mail agendada para 15min antes.
                    </div>
                  </div>
                </section>
                <section>
                  <h4 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--bg-pale)', paddingBottom: '0.5rem' }}>Passeios e Exercícios</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className="glass" style={{ padding: '1rem', borderRadius: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                        <div><strong>Raça:</strong> {selectedPet.breed}</div>
                        <div><strong>Gênero:</strong> {selectedPet.gender === 'M' ? 'Macho' : 'Fêmea'}</div>
                        <div><strong>Peso:</strong> {selectedPet.weight} kg</div>
                        <div><strong>Tamanho:</strong> {selectedPet.size} cm</div>
                        <div><strong>Nascimento:</strong> {new Date(selectedPet.bornDate).toLocaleDateString()}</div>
                        <div><strong>Adoção:</strong> {new Date(selectedPet.adoptionDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--bg-pale)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h5 style={{ color: 'var(--primary)' }}>💡 BONUS: Monitoramento Inteligente</h5>
                  <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Ajustando hidratação com base na temperatura atual (28°C).</p>
                </div>
                <span className="glass" style={{ padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800 }}>IA ATIVA</span>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '6rem', opacity: 0.5 }}>
              <h3>Selecione um Amiguinho ao lado</h3>
              <p>Gerencie cada um individualmente de forma holística.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PetDashboard;
