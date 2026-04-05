import { useState, useEffect } from 'react';
import LandingPage from './components/Landing/LandingPage';
import PetDashboard from './components/Dashboard/PetDashboard';
import AmiguinhoForm from './components/AmiguinhoForm/AmiguinhoForm';
import Navbar from './components/Navbar/Navbar';
import Alert from './components/Common/Alert';
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
  const [alertMsg, setAlertMsg] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const data = await api.getAmiguinhos();
      setAmiguinhos(data);
      
      // Update selectedPet if it was already set
      if (selectedPet) {
        const updated = data.find(p => p._id === selectedPet._id);
        if (updated) setSelectedPet(updated);
      } else if (data.length > 0) {
        setSelectedPet(data[0]);
      }
      
      const status = await api.checkBemEstar();
      setWellBeing(status);
    } catch (error) {
      setWellBeing(false);
      console.error(error);
    }
  };

  const checkStatus = async () => {
    try {
      const status = await api.checkBemEstar();
      setWellBeing(status);
    } catch (error) {
      setWellBeing(false);
    }
  };

  const handleCreateOrUpdate = async (data: Amiguinho) => {
    try {
      if (editingAmiguinho?._id) {
        await api.updateAmiguinho(editingAmiguinho._id, data);
        setAlertMsg({ message: 'Amiguinho atualizado com sucesso!', type: 'success' });
      } else {
        await api.createAmiguinho(data);
        setAlertMsg({ message: 'Amiguinho cadastrado com sucesso!', type: 'success' });
      }
      setIsFormOpen(false);
      setEditingAmiguinho(null);
      fetchData();
    } catch (error: any) {
      const apiResponse = error.response || error.apiResponse;
      if (apiResponse) {
        // Detailed errors will be handled inside the form for field-specific display
        // but we still want a main message
        setAlertMsg({ message: apiResponse.message, type: 'error' });
      } else {
        setAlertMsg({ message: error.message || 'Erro ao realizar operação', type: 'error' });
      }
      throw error;
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
        setAlertMsg({ message: 'Amiguinho removido com sucesso!', type: 'success' });
        fetchData();
        if (selectedPet?._id === id) setSelectedPet(null);
      } catch (error: any) {
        setAlertMsg({ message: error.message || 'Erro ao excluir amiguinho', type: 'error' });
      }
    }
  };

  const startInteraction = () => {
    setViewMode('dashboard');
    fetchData();
  };

  return (
    <>
      {alertMsg && (
        <Alert 
          message={alertMsg.message} 
          type={alertMsg.type} 
          onClose={() => setAlertMsg(null)} 
        />
      )}

      {!wellBeing && (
        <div style={{ background: '#f44336', color: 'white', textAlign: 'center', padding: '0.5rem', fontWeight: 600, fontSize: '0.9rem', position: 'relative', zIndex: 6000 }}>
          O sistema está offline. Algumas funcionalidades podem estar indisponíveis.
        </div>
      )}

      {viewMode === 'landing' ? (
        <LandingPage 
          onStart={startInteraction} 
          onGoHome={() => setViewMode('landing')} 
        />
      ) : (
        <>
          <Navbar onGoHome={() => setViewMode('landing')} />
          
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
            <div 
              style={{ 
                position: 'fixed', 
                top: 0, left: 0, right: 0, bottom: 0, 
                background: 'rgba(75, 42, 74, 0.4)', 
                backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 3000, padding: '1rem'
              }}
              onClick={() => { setIsFormOpen(false); setEditingAmiguinho(null); }}
            >
              <div 
                style={{ position: 'relative', width: '100%', maxWidth: '600px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <AmiguinhoForm 
                  onSubmit={handleCreateOrUpdate}
                  onCancel={() => { setIsFormOpen(false); setEditingAmiguinho(null); }}
                  initialData={editingAmiguinho}
                />
              </div>
            </div>
          )}

          <footer style={{ marginTop: 'auto', padding: '2rem', textAlign: 'center', color: 'var(--primary)', fontWeight: 500 }}>
            <p>© 2026 Better Pets - Gestão Holística e Consciente.</p>
          </footer>
        </>
      )}
    </>
  );
}

export default App;
