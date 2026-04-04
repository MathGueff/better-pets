const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const AnimalGender = {
  MALE: 'M',
  FEMALE: 'F'
} as const;

export type AnimalGender = typeof AnimalGender[keyof typeof AnimalGender];

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

export interface AnimalSchedule {
  feed: { timeExpected: string };
  walk: { timeExpected: string };
  water: { timeExpected: string };
}

export interface Amiguinho {
  _id?: string;
  name: string;
  age?: number;
  breed: string;
  photo?: string;
  gender: AnimalGender;
  size: number;
  weight: number;
  bornDate: string;
  adoptionDate: string;
  schedule?: AnimalSchedule;
  health?: number; // Calculated field for frontend
}

// Initial mock state for transformation
const mockBase = {
  gender: AnimalGender.MALE,
  size: 45,
  weight: 12,
  bornDate: '2021-05-15',
  adoptionDate: '2021-08-20',
  health: 85,
};

const enrichAmiguinho = (a: Amiguinho): Amiguinho => ({
  ...mockBase,
  ...a,
  health: a.health || calculateHealth(a)
});

const calculateHealth = (a: Amiguinho): number => {
  // Simple heuristic for now: base health + age penalty
  let score = 85;
  if (a.age && a.age > 10) score -= 10;
  return score;
};

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  message: string;
  code: number;
  status: boolean;
  error?: ValidationError[];
}

export class ApiError extends Error {
  response: ApiErrorResponse;
  constructor(response: ApiErrorResponse) {
    super(response.message);
    this.response = response;
  }
}

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
        enrichAmiguinho({ _id: '1', name: 'Bidu', age: 3, breed: 'Poodle', gender: AnimalGender.MALE, size: 30, weight: 5, bornDate: '2021-01-01', adoptionDate: '2021-03-01' }),
        enrichAmiguinho({ _id: '2', name: 'Rex', age: 5, breed: 'Golden Retriever', gender: AnimalGender.MALE, size: 60, weight: 30, bornDate: '2019-01-01', adoptionDate: '2019-05-01' }),
        enrichAmiguinho({ _id: '3', name: 'Luna', age: 2, breed: 'SRD', gender: AnimalGender.FEMALE, size: 40, weight: 12, bornDate: '2022-01-01', adoptionDate: '2022-04-01' }),
      ];
    }
  },

  async createAmiguinho(data: Amiguinho): Promise<Amiguinho> {
    const response = await fetch(`${API_URL}/animals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(errorData);
    }
    
    const json = await response.json();
    return enrichAmiguinho(json.data);
  },

  async updateAmiguinho(id: string, data: Partial<Amiguinho>): Promise<Amiguinho> {
    const response = await fetch(`${API_URL}/animals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(errorData);
    }
    
    const json = await response.json();
    return enrichAmiguinho(json.data);
  },

  async deleteAmiguinho(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/animals/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(errorData);
    }
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
