const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface RoutineItem {
  id: string;
  timeExpected: string;
  time?: string;
  food?: string;
  completed: boolean;
  expectedDuration?: string;
  timeStart?: string;
  timeEnd?: string;
}

export interface Amiguinho {
  _id?: string;
  name: string;
  age: number;
  breed?: string;
  weight?: number;
  height?: number;
  bornDate?: string;
  adoptionDate?: string;
  status?: {
    isFull: boolean;
    isHidrated: boolean;
    isHappy: boolean;
  };
  health?: number;
  today?: {
    eat: RoutineItem[];
    walk: RoutineItem[];
    water: RoutineItem[];
  };
}

// Initial mock state for transformation
const mockBase = {
  weight: 12,
  height: 45,
  bornDate: '2021-05-15',
  adoptionDate: '2021-08-20',
  status: { isFull: true, isHidrated: false, isHappy: true },
  health: 85,
  today: {
    eat: [
      { id: 'e1', timeExpected: '08:00', food: 'Ração Premium', completed: true, time: '08:05' },
      { id: 'e2', timeExpected: '18:00', food: 'Ração Premium', completed: false },
    ],
    walk: [
      { id: 'w1', timeExpected: '07:00', expectedDuration: '30min', completed: true, timeStart: '07:05', timeEnd: '07:35' },
    ],
    water: [
      { id: 'wa1', timeExpected: '10:00', completed: true },
      { id: 'wa2', timeExpected: '14:00', completed: false },
    ]
  }
};

const enrichAmiguinho = (a: Amiguinho): Amiguinho => ({
  ...mockBase,
  ...a,
  health: calculateHealth(a.status || mockBase.status)
});

const calculateHealth = (status: any): number => {
  let score = 0;
  if (status.isFull) score += 33;
  if (status.isHidrated) score += 33;
  if (status.isHappy) score += 34;
  return score;
};

export const api = {
  async getAmiguinhos(): Promise<Amiguinho[]> {
    try {
      const response = await fetch(`${API_URL}/animals`);
      if (!response.ok) throw new Error('Falha ao carregar amiguinhos');
      const json = await response.json();
      const list = json.data || [];
      return list.map(enrichAmiguinho);
    } catch (error) {
      console.error('API Error:', error);
      return [
        enrichAmiguinho({ _id: '1', name: 'Bidu', age: 3, breed: 'Poodle' }),
        enrichAmiguinho({ _id: '2', name: 'Rex', age: 5, breed: 'Golden Retriever' }),
        enrichAmiguinho({ _id: '3', name: 'Luna', age: 2, breed: 'SRD' }),
      ];
    }
  },

  async createAmiguinho(data: Amiguinho): Promise<Amiguinho> {
    const response = await fetch(`${API_URL}/animals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Falha ao criar amiguinho');
    const json = await response.json();
    return enrichAmiguinho(json.data);
  },

  async updateAmiguinho(id: string, data: Partial<Amiguinho>): Promise<Amiguinho> {
    const response = await fetch(`${API_URL}/animals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Falha ao atualizar amiguinho');
    const json = await response.json();
    return enrichAmiguinho(json.data);
  },

  async deleteAmiguinho(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/animals/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Falha ao remover amiguinho');
  },

  async checkBemEstar(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  },
};
