import { useState, useEffect } from 'react';
import LandingPage from './components/Landing/LandingPage';
import PetDashboard from './components/Dashboard/PetDashboard';
import AmiguinhoForm from './components/AmiguinhoForm/AmiguinhoForm';
import Navbar from './components/Navbar/Navbar';
import { api } from './services/api';
import type { Amiguinho } from './services/api';

type ViewMode = 'landing' | 'dashboard';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [amiguinhos, setAmiguinhos] = useState<Amiguinho[]>([]);
  const [selectedPet, setSelectedPet] = useState<Amiguinho | null>(null);
  const [wellBeing, setWellBeing] = useState<boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAmiguinho, setEditingAmiguinho] = useState<Amiguinho | null>(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const data = await api.getAmiguinhos();
      setAmiguinhos(data);
      if (data.length > 0 && !selectedPet) {
        setSelectedPet(data[0]);
      }
      const status = await api.checkBemEstar();
      setWellBeing(status);
    } catch (error) {
      console.error(error);
    }
  };

  const checkStatus = async () => {
    const status = await api.checkBemEstar();
    setWellBeing(status);
  };

  const handleCreateOrUpdate = async (data: Amiguinho) => {
    try {
      if (editingAmiguinho?._id) {
        await api.updateAmiguinho(editingAmiguinho._id, data);
      } else {
        await api.createAmiguinho(data);
      }
      setIsFormOpen(false);
      setEditingAmiguinho(null);
      fetchData();
    } catch {
      alert('Erro ao salvar amiguinho');
    }
  };

  const handleEdit = (pet: Amiguinho) => {
    setEditingAmiguinho(pet);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este amiguinho?')) {
      try {
        await api.deleteAmiguinho(id);
        fetchData();
        if (selectedPet?._id === id) setSelectedPet(null);
      } catch {
        alert('Erro ao excluir amiguinho');
      }
    }
  };

  const startInteraction = () => {
    setViewMode('dashboard');
    fetchData();
  };

  if (viewMode === 'landing') {
    return (
      <LandingPage 
        wellBeing={wellBeing} 
        onStart={startInteraction} 
        onGoHome={() => setViewMode('landing')} 
      />
    );
  }

  return (
    <>
      <Navbar wellBeing={wellBeing} onGoHome={() => setViewMode('landing')} />
      
      <main className="container" style={{ minHeight: '80vh' }}>
        <PetDashboard 
          amiguinhos={amiguinhos}
          selectedPet={selectedPet}
          onSelectPet={setSelectedPet}
          onAddPet={() => { setEditingAmiguinho(null); setIsFormOpen(true); }}
          onEditPet={handleEdit}
          onDeletePet={handleDelete}
        />
      </main>

      {isFormOpen && (
        <div style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(75, 42, 74, 0.4)', 
          backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 3000, padding: '1rem'
        }}>
          <AmiguinhoForm 
            onSubmit={handleCreateOrUpdate}
            onCancel={() => { setIsFormOpen(false); setEditingAmiguinho(null); }}
            initialData={editingAmiguinho}
          />
        </div>
      )}

      <footer style={{ marginTop: 'auto', padding: '2rem', textAlign: 'center', color: 'var(--primary)', fontWeight: 500 }}>
        <p>© 2026 Better Pets - Gestão Holística e Consciente.</p>
      </footer>
    </>
  );
}

export default App;
