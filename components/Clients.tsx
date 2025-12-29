
import React, { useState } from 'react';
import { Client } from '../types';
import { 
  Search, Plus, MoreHorizontal, X, User, Mail, FileText, 
  Calendar, ChevronRight, Phone, HeartPulse, CreditCard, MapPin, Briefcase, Users, DollarSign,
  ClipboardList, Activity, Info, ShieldCheck
} from 'lucide-react';

const MOCK_CLIENTS: Client[] = [
  { 
    id: '1', 
    name: 'Ana Silva', 
    nextSession: '2023-10-27T14:00:00', 
    status: 'Active', 
    email: 'ana@example.com', 
    notes: 'Trabalhando ansiedade social e gatilhos em reuniões de trabalho.', 
    avatar: 'https://picsum.photos/100/100?random=1',
    phone: '(11) 98765-4321',
    birthDate: '1992-05-15',
    cpf: '123.456.789-00',
    address: 'Rua das Flores, 123, São Paulo - SP',
    civilStatus: 'Solteira',
    occupation: 'Designer UI/UX',
    consultationFee: 180,
    medicalHistory: 'Histórico de asma na infância.',
    medications: 'Nenhuma',
    insuranceNumber: 'Bradesco Saúde',
    reasonForTherapy: 'Ansiedade social severa.',
    initialEvaluation: 'Paciente demonstra boa abertura para o processo.'
  },
  { 
    id: '2', 
    name: 'Bruno Costa', 
    nextSession: '2023-10-28T10:00:00', 
    status: 'Active', 
    email: 'bruno@example.com', 
    notes: 'Questões profissionais e burnout. Foco em equilíbrio vida-trabalho.', 
    avatar: 'https://picsum.photos/100/100?random=2',
    phone: '(11) 91234-5678',
    consultationFee: 200,
    occupation: 'Engenheiro de Software'
  },
];

export const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [viewingClient, setViewingClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState<'pessoal' | 'saude' | 'financeiro'>('pessoal');
  const [profileTab, setProfileTab] = useState<'info' | 'prontuario' | 'financeiro'>('info');

  const [formData, setFormData] = useState<Partial<Client>>({
    name: '', email: '', phone: '', birthDate: '', cpf: '', 
    address: '', civilStatus: '', occupation: '', emergencyContact: '',
    medicalHistory: '', medications: '', allergies: '', healthConditions: '',
    insuranceNumber: '', billingDetails: '', notes: '', consultationFee: 0
  });

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'consultationFee' ? parseFloat(value) || 0 : value 
    }));
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const client: Client = {
      ...(formData as Client),
      id: Date.now().toString(),
      status: 'New',
      nextSession: new Date().toISOString(),
      avatar: `https://picsum.photos/100/100?random=${clients.length + 1}`
    };

    setClients([client, ...clients]);
    setIsNewClientModalOpen(false);
    setActiveTab('pessoal');
    setFormData({ name: '', email: '', phone: '', consultationFee: 0 }); 
  };

  return (
    <div className="h-full flex flex-col animate-fade-in relative font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-light text-brand-primary">Seus Pacientes</h2>
          <p className="text-brand-slate mt-1 font-light">Gestão clínica completa e humanizada.</p>
        </div>
        <button 
          onClick={() => {
            setFormData({ 
              name: '', email: '', phone: '', birthDate: '', cpf: '', 
              address: '', civilStatus: 'Solteiro(a)', occupation: '', emergencyContact: '',
              medicalHistory: '', medications: '', allergies: '', healthConditions: '',
              insuranceNumber: '', billingDetails: '', notes: '', consultationFee: 0 
            });
            setActiveTab('pessoal');
            setIsNewClientModalOpen(true);
          }}
          className="bg-brand-primary text-brand-accent px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-brand-primary/10 text-sm font-bold tracking-wide active:scale-95 z-10"
        >
          <Plus size={18} /> Novo Paciente
        </button>
      </header>

      <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-1 border border-white/60 shadow-sm mb-6 max-w-md w-full focus-within:border-brand-accent transition-colors">
        <div className="flex items-center px-4">
          <Search size={20} className="text-brand-primary/30" />
          <input 
            type="text" 
            placeholder="Buscar por nome..." 
            className="w-full bg-transparent p-3 outline-none text-brand-primary placeholder-brand-primary/30 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-24 pr-2 no-scrollbar">
        {filteredClients.map(client => (
          <div 
            key={client.id} 
            onClick={() => { setViewingClient(client); setProfileTab('info'); }}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/60 hover:border-brand-accent/50 transition-all cursor-pointer group hover:shadow-xl hover:shadow-brand-primary/5"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <img src={client.avatar} alt={client.name} className="w-12 h-12 rounded-2xl object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                <div>
                  <h3 className="font-bold text-brand-primary">{client.name}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg ${
                    client.status === 'Active' ? 'bg-brand-accent/20 text-brand-primary' :
                    client.status === 'Paused' ? 'bg-orange-100 text-orange-700' :
                    'bg-brand-primary/10 text-brand-primary'
                  }`}>
                    {client.status === 'Active' ? 'Ativo' : client.status === 'Paused' ? 'Pausado' : 'Novo'}
                  </span>
                </div>
              </div>
              <button className="text-brand-primary/20 hover:text-brand-primary" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-brand-slate mb-4">
               <DollarSign size={14} className="text-brand-accent" />
               <span className="font-bold text-brand-primary">R$ {client.consultationFee || 0}</span>
               <span className="opacity-40">/ sessão</span>
            </div>

            <p className="text-sm text-brand-slate line-clamp-2 mb-4 h-10 leading-relaxed font-light">
              {client.notes || "Sem notas iniciais registradas."}
            </p>

            <div className="pt-4 border-t border-brand-primary/5 flex justify-between items-center text-[10px] font-bold text-brand-primary/40 uppercase tracking-widest">
              <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(client.nextSession).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
              <span className="group-hover:translate-x-1 transition-transform group-hover:text-brand-primary flex items-center gap-1">Ver perfil <ChevronRight size={12}/></span>
            </div>
          </div>
        ))}
      </div>

      {/* NEW CLIENT MODAL - Completo com todos os campos */}
      {isNewClientModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-primary/60 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-brand-bg w-full max-w-2xl rounded-[2.5rem] p-8 shadow-2xl relative border border-white/50 my-auto h-auto max-h-[90vh] overflow-y-auto no-scrollbar">
            <button 
              onClick={() => { setIsNewClientModalOpen(false); setActiveTab('pessoal'); }}
              className="absolute top-6 right-6 p-2 text-brand-primary/40 hover:text-brand-primary hover:bg-white/50 rounded-full transition-all"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-bold text-brand-primary mb-2">Novo Cadastro de Paciente</h3>
            <p className="text-brand-slate text-sm mb-6 font-light">Preencha os dados completos para iniciar o prontuário.</p>
            
            <div className="flex gap-4 mb-8 border-b border-brand-primary/5 pb-2 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('pessoal')}
                className={`text-xs font-bold uppercase tracking-widest pb-2 px-1 transition-all whitespace-nowrap ${activeTab === 'pessoal' ? 'text-brand-primary border-b-2 border-brand-accent' : 'text-brand-primary/30 hover:text-brand-primary'}`}
              >
                Dados Pessoais
              </button>
              <button 
                onClick={() => setActiveTab('saude')}
                className={`text-xs font-bold uppercase tracking-widest pb-2 px-1 transition-all whitespace-nowrap ${activeTab === 'saude' ? 'text-brand-primary border-b-2 border-brand-accent' : 'text-brand-primary/30 hover:text-brand-primary'}`}
              >
                Saúde
              </button>
              <button 
                onClick={() => setActiveTab('financeiro')}
                className={`text-xs font-bold uppercase tracking-widest pb-2 px-1 transition-all whitespace-nowrap ${activeTab === 'financeiro' ? 'text-brand-primary border-b-2 border-brand-accent' : 'text-brand-primary/30 hover:text-brand-primary'}`}
              >
                Financeiro
              </button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-6">
              {activeTab === 'pessoal' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 animate-fade-in">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Nome Completo</label>
                    <input name="name" required autoFocus value={formData.name} onChange={handleInputChange} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium" placeholder="Ex: Maria Oliveira" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">E-mail</label>
                    <input name="email" type="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium" placeholder="paciente@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Telefone</label>
                    <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(00) 00000-0000" className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">CPF</label>
                    <input name="cpf" value={formData.cpf} onChange={handleInputChange} placeholder="000.000.000-00" className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Data de Nascimento</label>
                    <input name="birthDate" type="date" value={formData.birthDate} onChange={handleInputChange} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Estado Civil</label>
                    <select name="civilStatus" value={formData.civilStatus} onChange={handleInputChange} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium appearance-none">
                      <option value="Solteiro(a)">Solteiro(a)</option>
                      <option value="Casado(a)">Casado(a)</option>
                      <option value="Divorciado(a)">Divorciado(a)</option>
                      <option value="Viúvo(a)">Viúvo(a)</option>
                      <option value="União Estável">União Estável</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Profissão</label>
                    <input name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium" placeholder="Ex: Arquiteto" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Endereço Residencial</label>
                    <input name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium" placeholder="Rua, Número, Bairro, Cidade - UF" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Contato de Emergência</label>
                    <input name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium" placeholder="Nome e Telefone de um familiar..." />
                  </div>
                </div>
              )}

              {activeTab === 'saude' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Histórico Médico</label>
                    <textarea name="medicalHistory" rows={2} value={formData.medicalHistory} onChange={handleInputChange} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium resize-none" placeholder="Doenças crônicas, cirurgias..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Medicamentos em Uso</label>
                    <textarea name="medications" rows={2} value={formData.medications} onChange={handleInputChange} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium resize-none" placeholder="Lista de remédios e dosagens..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Alergias</label>
                      <input name="allergies" value={formData.allergies} onChange={handleInputChange} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium" placeholder="Ex: Penicilina, Glúten..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Condições Especiais</label>
                      <input name="healthConditions" value={formData.healthConditions} onChange={handleInputChange} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium" placeholder="PCD, Gestante, etc." />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'financeiro' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Valor da Consulta (Sessão)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary font-bold text-sm">R$</span>
                      <input 
                        name="consultationFee" 
                        type="number" 
                        required 
                        value={formData.consultationFee} 
                        onChange={handleInputChange} 
                        className="w-full bg-white border border-brand-primary/10 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:border-brand-accent transition-all text-brand-primary font-bold" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Convênio / Plano de Saúde</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary/20" size={18} />
                      <input name="insuranceNumber" value={formData.insuranceNumber} onChange={handleInputChange} className="w-full bg-white border border-brand-primary/10 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium" placeholder="Nome do plano ou número da carteirinha" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Informações de Cobrança</label>
                    <textarea name="billingDetails" rows={3} value={formData.billingDetails} onChange={handleInputChange} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium resize-none" placeholder="Dados para nota fiscal, dias de pagamento, etc." />
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-6 border-t border-brand-primary/5">
                {activeTab !== 'pessoal' ? (
                  <button type="button" onClick={() => setActiveTab(activeTab === 'financeiro' ? 'saude' : 'pessoal')} className="flex-1 bg-white border border-brand-primary/10 text-brand-primary py-4 rounded-2xl font-bold hover:bg-brand-primary/5 transition-all active:scale-95">
                    Voltar
                  </button>
                ) : (
                   <button type="button" onClick={() => setIsNewClientModalOpen(false)} className="flex-1 bg-white border border-brand-primary/10 text-brand-primary py-4 rounded-2xl font-bold hover:bg-brand-primary/5 transition-all active:scale-95">
                    Cancelar
                  </button>
                )}
                
                {activeTab !== 'financeiro' ? (
                  <button type="button" onClick={() => setActiveTab(activeTab === 'pessoal' ? 'saude' : 'financeiro')} className="flex-1 bg-brand-primary text-brand-accent py-4 rounded-2xl font-bold hover:bg-brand-primary/90 transition-all shadow-lg active:scale-95">
                    Próximo Passo
                  </button>
                ) : (
                  <button type="submit" className="flex-1 bg-brand-primary text-brand-accent py-4 rounded-2xl font-bold hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/10 active:scale-95">
                    Finalizar Cadastro
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXPANDED CLIENT PROFILE VIEW */}
      {viewingClient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-primary/60 backdrop-blur-md animate-fade-in">
          <div className="bg-brand-bg w-full max-w-5xl h-[90vh] rounded-[2.5rem] shadow-2xl relative border border-white/50 overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-8 pb-6 flex justify-between items-start bg-white/40 border-b border-brand-primary/5">
              <div className="flex items-center gap-6">
                <img src={viewingClient.avatar} className="w-20 h-20 rounded-3xl object-cover shadow-lg border-4 border-white" alt={viewingClient.name} />
                <div>
                  <h3 className="text-3xl font-bold text-brand-primary">{viewingClient.name}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-xs text-brand-slate font-medium bg-white/60 px-3 py-1.5 rounded-full border border-white/80"><Mail size={14}/> {viewingClient.email}</span>
                    <span className="flex items-center gap-1.5 text-xs text-brand-slate font-medium bg-white/60 px-3 py-1.5 rounded-full border border-white/80"><DollarSign size={14} className="text-brand-accent"/> R$ {viewingClient.consultationFee || 0}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setViewingClient(null)} className="p-3 text-brand-primary/40 hover:text-brand-primary hover:bg-white rounded-full transition-all">
                <X size={28} />
              </button>
            </div>

            {/* Profile Tabs */}
            <div className="flex px-8 py-4 gap-6 bg-white/20 border-b border-brand-primary/5 overflow-x-auto no-scrollbar">
               {[
                 { id: 'info', label: 'Informações Gerais', icon: Info },
                 { id: 'prontuario', label: 'Prontuário Psicológico', icon: ClipboardList },
                 { id: 'financeiro', label: 'Financeiro', icon: DollarSign }
               ].map(tab => (
                 <button 
                   key={tab.id}
                   onClick={() => setProfileTab(tab.id as any)}
                   className={`flex items-center gap-2 pb-2 px-1 text-xs font-bold uppercase tracking-widest transition-all ${profileTab === tab.id ? 'text-brand-primary border-b-2 border-brand-accent' : 'text-brand-primary/30 hover:text-brand-primary'}`}
                 >
                   <tab.icon size={14} /> {tab.label}
                 </button>
               ))}
            </div>

            {/* Modal Content Body */}
            <div className="flex-1 overflow-y-auto p-8 no-scrollbar bg-white/10">
              
              {profileTab === 'info' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                  <ProfileSection title="Dados Pessoais" icon={<User size={16}/>}>
                    <DetailItem label="CPF" value={viewingClient.cpf} />
                    <DetailItem label="Nascimento" value={viewingClient.birthDate} />
                    <DetailItem label="Estado Civil" value={viewingClient.civilStatus} />
                    <DetailItem label="Profissão" value={viewingClient.occupation} />
                  </ProfileSection>

                  <ProfileSection title="Contato" icon={<Phone size={16}/>}>
                    <DetailItem label="Celular" value={viewingClient.phone} />
                    <DetailItem label="Endereço" value={viewingClient.address} />
                    <DetailItem label="Contato de Emergência" value={viewingClient.emergencyContact} />
                  </ProfileSection>

                  <ProfileSection title="Saúde" icon={<HeartPulse size={16}/>}>
                    <DetailItem label="Histórico Médico" value={viewingClient.medicalHistory} />
                    <DetailItem label="Medicamentos" value={viewingClient.medications} />
                    <DetailItem label="Alergias" value={viewingClient.allergies} />
                  </ProfileSection>
                </div>
              )}

              {profileTab === 'prontuario' && (
                <div className="max-w-3xl space-y-8 animate-fade-in">
                  <ProfileSection title="Anamnese Inicial" icon={<Activity size={16}/>}>
                    <DetailItem label="Queixa Principal / Motivo da Busca" value={viewingClient.reasonForTherapy} />
                    <DetailItem label="Expectativas e Objetivos" value={viewingClient.expectationsAndGoals} />
                    <DetailItem label="Histórico Familiar" value={viewingClient.familyHistory} />
                    <DetailItem label="Avaliação Inicial do Terapeuta" value={viewingClient.initialEvaluation} />
                  </ProfileSection>
                </div>
              )}

              {profileTab === 'financeiro' && (
                <div className="max-w-xl space-y-8 animate-fade-in">
                  <ProfileSection title="Faturamento" icon={<DollarSign size={16}/>}>
                    <div className="bg-brand-primary text-brand-accent p-6 rounded-3xl mb-4 shadow-lg">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Valor por Atendimento</p>
                      <h4 className="text-3xl font-bold mt-1">R$ {viewingClient.consultationFee || 0}</h4>
                    </div>
                    <DetailItem label="Convênio / Plano de Saúde" value={viewingClient.insuranceNumber} />
                    <DetailItem label="Detalhes de Faturamento" value={viewingClient.billingDetails} />
                  </ProfileSection>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileSection: React.FC<{ title: string, icon: React.ReactNode, children: React.ReactNode }> = ({ title, icon, children }) => (
  <section className="space-y-4">
    <div className="flex items-center gap-2 pb-2 border-b border-brand-primary/5">
      <span className="text-brand-accent">{icon}</span>
      <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest">{title}</h4>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </section>
);

const DetailItem: React.FC<{ label: string, value?: string | number }> = ({ label, value }) => (
  <div>
    <p className="text-[9px] font-bold text-brand-primary/30 uppercase tracking-[0.15em] mb-1">{label}</p>
    <p className="text-sm text-brand-primary font-medium leading-relaxed">{value || 'Não informado'}</p>
  </div>
);
