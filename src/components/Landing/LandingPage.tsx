import React from 'react';
import Navbar from '../Navbar/Navbar';
import logoPath from '../../assets/logo.svg';

interface LandingPageProps {
  onStart: () => void;
  onGoHome: () => void;
  wellBeing: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onGoHome, wellBeing }) => {
  return (
    <div className="landing-container">
      <Navbar wellBeing={wellBeing} onGoHome={onGoHome} />
      
      <main className="container">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Cuide do Seu Amiguinho da Forma Certa.</h1>
            <p className="hero-subtitle">
              Acompanhamento integrado de alimentação, hidratação, exercícios e bem-estar para o seu amiguinho, tudo em um só lugar.
            </p>
            <button className="btn btn-primary btn-lg" onClick={onStart}>
              Começar Agora
            </button>
          </div>
          <div className="hero-visual">
            <img 
              src={logoPath} 
              alt="Better Pets Illustration" 
              className="hero-image"
              style={{ padding: '2rem', background: 'var(--white)', opacity: 0.9 }}
            />
          </div>
        </section>

        <section className="pillars-grid">
          <div className="pillar-card">
            <span className="pillar-icon">🍲</span>
            <h3 className="pillar-title">Nutrição</h3>
            <p className="pillar-desc">Cálculo de ração e gastos baseado nas características do seu animal.</p>
          </div>
          <div className="pillar-card">
            <span className="pillar-icon">💧</span>
            <h3 className="pillar-title">Hidratação</h3>
            <p className="pillar-desc">Monitoramento diário ajustado pela temperatura e exercícios.</p>
          </div>
          <div className="pillar-card">
            <span className="pillar-icon">🏃</span>
            <h3 className="pillar-title">Exercício</h3>
            <p className="pillar-desc">Cronograma ideal e metas diárias para manter a forma.</p>
          </div>
          <div className="pillar-card">
            <span className="pillar-icon">🏥</span>
            <h3 className="pillar-title">Bem-estar</h3>
            <p className="pillar-desc">Gestão completa de saúde, medicamentos e exames (Snapshot).</p>
          </div>
        </section>

        <section style={{ marginTop: '8rem', textAlign: 'center', padding: '4rem', background: 'var(--white)', borderRadius: 'var(--radius)' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Sincronização com Snapshot</h2>
          <p style={{ color: 'var(--text-soft)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            A cada dia, os status do seu amiguinho são auditados e salvos. Mantenha um histórico completo de toda a vida do seu pet.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <span className="glass" style={{ padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>Cron Jobs</span>
            <span className="glass" style={{ padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>Snapshot Logs</span>
            <span className="glass" style={{ padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>Auditoria</span>
          </div>
        </section>
      </main>

      <footer style={{ marginTop: '8rem', padding: '4rem 2rem', background: 'var(--primary)', color: 'var(--white)', textAlign: 'center' }}>
        <img src={logoPath} alt="Logo" style={{ width: '60px', marginBottom: '1rem', filter: 'brightness(1.5)' }} />
        <h3>Better Pets</h3>
        <p style={{ opacity: 0.7, fontSize: '0.9rem', marginTop: '1rem' }}>© 2026 Better Pets - Gestão Holística de Pets</p>
      </footer>
    </div>
  );
};

export default LandingPage;
