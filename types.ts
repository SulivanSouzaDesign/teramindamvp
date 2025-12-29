
export interface Client {
  id: string;
  name: string;
  nextSession: string; // ISO Date
  status: 'Active' | 'Paused' | 'New';
  email: string;
  notes: string;
  avatar?: string;
  
  // Dados Pessoais
  birthDate?: string;
  cpf?: string;
  address?: string;
  civilStatus?: string;
  occupation?: string;
  
  // Contato
  phone?: string;
  emergencyContact?: string;
  
  // Saúde
  medicalHistory?: string;
  medications?: string;
  allergies?: string;
  healthConditions?: string;
  
  // Financeiro e Convênio
  consultationFee?: number; // Custo por consulta em reais
  insuranceNumber?: string;
  billingDetails?: string;

  // --- Prontuário Psicológico (Anamnese Inicial) ---
  reasonForTherapy?: string;
  expectationsAndGoals?: string;
  mentalHealthHistory?: string;
  familyHistory?: string;
  lifeContextAndRelationships?: string;
  initialEvaluation?: string;
}

export interface Session {
  id: string;
  clientId: string;
  clientName: string;
  date: string; // ISO Date
  time: string;
  type: 'Online' | 'Presencial';
  status: 'Scheduled' | 'Completed' | 'Canceled';
}

export interface Message {
  id: string;
  sender: 'user' | 'client' | 'system';
  text: string;
  timestamp: Date;
}

export enum ViewState {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  CLIENTS = 'CLIENTS',
  CALENDAR = 'CALENDAR',
  CHAT = 'CHAT',
  MEDICAL_RECORD = 'MEDICAL_RECORD',
  SETTINGS = 'SETTINGS'
}
