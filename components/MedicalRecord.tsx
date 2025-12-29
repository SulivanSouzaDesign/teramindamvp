
import React, { useState } from 'react';
import { Client } from '../types';
import { Search, Save, User, Brain, Heart, Users, Activity, Target, ChevronRight, Check, X, ClipboardList as ClipboardIcon } from 'lucide-react';

const MOCK_CLIENTS: Client[] = [
  { 
    id: '1', 
    name: 'Ana Silva', 
    nextSession: '2023-10-27T14:00:00', 
    status: 'Active', 
    email: 'ana@example.com', 
    notes: 'Trabalhando ansiedade social e gatilhos.', 
    avatar: 'https://picsum.photos/100/100?random=1',
    reasonForTherapy: 'Dificuldade de falar em reuniões e crises de ansiedade antes de apresentações.',
    expectationsAndGoals: 'Sentir-se mais segura e reduzir os sintomas físicos da ansiedade.',
    mentalHealthHistory: 'Já fez terapia cognitivo-comportamental por 6 meses há 2 anos.',
    familyHistory: 'Mãe com histórico de depressão.',
    lifeContextAndRelationships: 'Mora sozinha, trabalha como designer em uma agência grande.',
    initialEvaluation: 'Caso típico de ansiedade social, bom prognóstico com acompanhamento contínuo.'
  },
  { 
    id: '2', 
    name: 'Bruno Costa', 
    nextSession: '2023-10-28T10:00:00', 
    status: 'Active', 
    email: 'bruno@example.com', 
    notes: 'Questões profissionais e burnout.', 
    avatar: 'https://picsum.photos/100/100?random=2'
  },
];

export const MedicalRecord: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedClient = clients.find(c => c.id === selectedClientId);

  const handleSave = () => {
    setIsSaving(true);
    setShowSuccess(false);
    
    // Simulating API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      // Auto-dismiss after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1000);
  };

  const updateClientField = (field: keyof Client, value: string) => {
    if (!selectedClientId) return;
    setClients(prev => prev.map(c => 
      c.id === selectedClientId ? { ...c, [field]: value } : c
    ));
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 animate-fade-in pb-20 md:pb-0 font-sans">
      {/* Sidebar: Client List */}
      <div className="w-full md:w-80 flex flex-col bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 p-6 h-full shadow-sm">
        <h3 className="text-xl font-serif text-brand-primary mb-6">Pacientes</h3>
        
        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary/30" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="w-full bg-white/50 border border-brand-primary/5 rounded-2xl pl-10 pr-4 py-2 text-sm outline-none focus:border-brand-accent transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-2 overflow-y-auto flex-1 no-scrollbar">
          {filteredClients.map(client => (
            <button
              key={client.id}
              onClick={() => { setSelectedClientId(client.id); setShowSuccess(false); }}
              className={`w-full p-4 rounded-2xl transition-all flex items-center gap-3 text-left ${
                selectedClientId === client.id 
                  ? 'bg-brand-primary text-brand-accent shadow-lg shadow-brand-primary/10' 
                  : 'hover:bg-white/60 text-brand-primary'
              }`}
            >
              <img src={client.avatar} className="w-10 h-10 rounded-xl object-cover" alt="" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{client.name}</p>
                <p className={`text-[10px] uppercase tracking-wider font-medium opacity-60`}>
                  {client.reasonForTherapy ? 'Prontuário Ativo' : 'Entrevista Pendente'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: The Record Form */}
      <div className="flex-1 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-2xl shadow-brand-primary/5 h-full flex flex-col overflow-hidden">
        {!selectedClient ? (
          <div className="flex-1 flex flex-col items-center justify-center text-brand-slate/40 p-10 text-center">
            <ClipboardIcon size={64} strokeWidth={1} className="mb-4" />
            <h3 className="text-xl font-serif text-brand-primary opacity-60">Selecione um paciente</h3>
            <p className="max-w-xs mt-2 text-sm">Escolha um paciente na lista ao lado para acessar ou preencher o prontuário da primeira entrevista.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-8 border-b border-brand-primary/5 flex justify-between items-center bg-white/20">
              <div className="flex items-center gap-4">
                <img src={selectedClient.avatar} className="w-14 h-14 rounded-2xl object-cover shadow-sm border-2 border-white" alt="" />
                <div>
                  <h2 className="text-2xl font-serif text-brand-primary leading-tight">Prontuário Psicológico</h2>
                  <p className="text-sm text-brand-slate font-light">Anamnese Inicial - {selectedClient.name}</p>
                </div>
              </div>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-brand-primary text-brand-accent px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-brand-primary/10 text-sm font-bold disabled:opacity-50 active:scale-95"
              >
                <Save size={18} /> {isSaving ? 'Salvando...' : 'Salvar Prontuário'}
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar relative">
              
              {/* Temporary Success Message */}
              {showSuccess && (
                <div className="animate-fade-in bg-brand-accent/20 border border-brand-accent/30 p-4 rounded-2xl flex items-center justify-between mb-6 shadow-sm">
                  <div className="flex items-center gap-3 text-brand-primary">
                    <div className="bg-brand-accent p-1 rounded-full">
                      <Check size={14} className="text-brand-primary" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-bold tracking-tight">Prontuário de {selectedClient.name} atualizado com sucesso.</span>
                  </div>
                  <button 
                    onClick={() => setShowSuccess(false)}
                    className="p-1 hover:bg-brand-accent/20 rounded-full transition-colors"
                  >
                    <X size={16} className="text-brand-primary/40" />
                  </button>
                </div>
              )}

              <RecordSection 
                icon={<Activity size={20}/>} 
                title="Motivo da Busca pela Terapia" 
                subtitle="A principal queixa ou preocupação do paciente no momento."
              >
                <textarea 
                  value={selectedClient.reasonForTherapy || ''}
                  onChange={(e) => updateClientField('reasonForTherapy', e.target.value)}
                  placeholder="Descreva o que levou o paciente a procurar ajuda profissional agora..."
                  className="w-full bg-white/80 border border-brand-primary/5 rounded-[1.5rem] p-5 outline-none focus:border-brand-accent transition-all text-brand-primary font-light resize-none h-32 shadow-inner"
                />
              </RecordSection>

              <RecordSection 
                icon={<Target size={20}/>} 
                title="Expectativas e Objetivos" 
                subtitle="O que o paciente espera alcançar e o que gostaria que mudasse."
              >
                <textarea 
                  value={selectedClient.expectationsAndGoals || ''}
                  onChange={(e) => updateClientField('expectationsAndGoals', e.target.value)}
                  placeholder="Quais são os marcos de sucesso para este tratamento?"
                  className="w-full bg-white/80 border border-brand-primary/5 rounded-[1.5rem] p-5 outline-none focus:border-brand-accent transition-all text-brand-primary font-light resize-none h-32 shadow-inner"
                />
              </RecordSection>

              <RecordSection 
                icon={<Brain size={20}/>} 
                title="Histórico de Saúde Mental" 
                subtitle="Tratamentos anteriores, diagnósticos e resultados."
              >
                <textarea 
                  value={selectedClient.mentalHealthHistory || ''}
                  onChange={(e) => updateClientField('mentalHealthHistory', e.target.value)}
                  placeholder="Terapia prévia, uso de psicotrópicos, internações..."
                  className="w-full bg-white/80 border border-brand-primary/5 rounded-[1.5rem] p-5 outline-none focus:border-brand-accent transition-all text-brand-primary font-light resize-none h-32 shadow-inner"
                />
              </RecordSection>

              <RecordSection 
                icon={<Users size={20}/>} 
                title="Histórico Familiar" 
                subtitle="Dinâmica familiar e saúde mental dos parentes próximos."
              >
                <textarea 
                  value={selectedClient.familyHistory || ''}
                  onChange={(e) => updateClientField('familyHistory', e.target.value)}
                  placeholder="Relacionamento com pais, irmãos e histórico de doenças na família..."
                  className="w-full bg-white/80 border border-brand-primary/5 rounded-[1.5rem] p-5 outline-none focus:border-brand-accent transition-all text-brand-primary font-light resize-none h-32 shadow-inner"
                />
              </RecordSection>

              <RecordSection 
                icon={<Heart size={20}/>} 
                title="Contexto de Vida e Relacionamentos" 
                subtitle="Rotina, hábitos, relacionamentos interpessoais e situação atual."
              >
                <textarea 
                  value={selectedClient.lifeContextAndRelationships || ''}
                  onChange={(e) => updateClientField('lifeContextAndRelationships', e.target.value)}
                  placeholder="Como é o dia a dia do paciente? Rede de apoio? Trabalho?"
                  className="w-full bg-white/80 border border-brand-primary/5 rounded-[1.5rem] p-5 outline-none focus:border-brand-accent transition-all text-brand-primary font-light resize-none h-32 shadow-inner"
                />
              </RecordSection>

              <RecordSection 
                icon={<User size={20}/>} 
                title="Avaliação Inicial do Terapeuta" 
                subtitle="Parecer técnico, compatibilidade e plano de ação."
              >
                <textarea 
                  value={selectedClient.initialEvaluation || ''}
                  onChange={(e) => updateClientField('initialEvaluation', e.target.value)}
                  placeholder="Sua avaliação profissional do caso e indicações de tratamento..."
                  className="w-full bg-brand-primary/5 border border-brand-primary/10 rounded-[1.5rem] p-5 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium resize-none h-40 shadow-inner"
                />
              </RecordSection>

              <div className="pb-10 flex justify-center">
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 text-brand-primary font-bold hover:text-brand-accent transition-all group py-2"
                >
                  Confirmar e Salvar Prontuário <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const RecordSection: React.FC<{ 
  icon: React.ReactNode, 
  title: string, 
  subtitle: string, 
  children: React.ReactNode 
}> = ({ icon, title, subtitle, children }) => (
  <section className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-brand-primary/5 rounded-xl text-brand-primary">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-serif text-brand-primary leading-tight">{title}</h4>
        <p className="text-xs text-brand-slate/60 font-medium">{subtitle}</p>
      </div>
    </div>
    {children}
  </section>
);
