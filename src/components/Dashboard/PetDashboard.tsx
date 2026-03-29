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
                  <div>
                    <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>{selectedPet.name}</h2>
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
                  <div style={{ fontWeight: 600 }}>{selectedPet.status?.isFull ? 'Satisfeito' : 'Com fome'}</div>
                </div>
                <div className="status-item glass">
                  <div style={{ fontSize: '1.5rem' }}>💧</div>
                  <div style={{ fontWeight: 600 }}>{selectedPet.status?.isHidrated ? 'Hidratado' : 'Sede'}</div>
                </div>
                <div className="status-item glass">
                  <div style={{ fontSize: '1.5rem' }}>✨</div>
                  <div style={{ fontWeight: 600 }}>{selectedPet.status?.isHappy ? 'Feliz' : 'Triste'}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                <section>
                  <h4 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--bg-pale)', paddingBottom: '0.5rem' }}>Rotina de Alimentação</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedPet.today?.eat.map(item => (
                      <div key={item.id} className="glass" style={{ padding: '0.8rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{item.timeExpected} - {item.food}</span>
                        <span>{item.completed ? '✅' : '⏳'}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#fff9e6', borderRadius: '12px', fontSize: '0.8rem', border: '1px dashed #ffd966' }}>
                      📩 <strong>Placeholder:</strong> Notificação de e-mail agendada para 15min antes.
                    </div>
                  </div>
                </section>
                <section>
                  <h4 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--bg-pale)', paddingBottom: '0.5rem' }}>Passeios e Exercícios</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedPet.today?.walk.map(item => (
                      <div key={item.id} className="glass" style={{ padding: '0.8rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Passeio de {item.expectedDuration}</span>
                        <span>{item.completed ? '✅' : '🚲'}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#e6f3ff', borderRadius: '12px', fontSize: '0.8rem', border: '1px dashed #66b3ff' }}>
                      🤖 <strong>IA Suggestion:</strong> Horário ideal para o próximo passeio baseado no clima atual.
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
