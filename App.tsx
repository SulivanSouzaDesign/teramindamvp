
import React, { useState } from 'react';
import { ViewState } from './types';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Clients } from './components/Clients';
import { Chat } from './components/Chat';
import { MedicalRecord } from './components/MedicalRecord';
import { Calendar } from './components/Calendar';
import { OrganicShape } from './components/OrganicShape';
import { NotificationSystem } from './components/NotificationSystem';
import { Settings } from './components/Settings';

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-brand-bg flex items-center justify-center p-6">
      <OrganicShape className="top-[-10%] left-[-10%] w-[500px] h-[500px]" color="#152C2E" />
      <OrganicShape className="bottom-[-10%] right-[-10%] w-[600px] h-[600px]" color="#A3E635" delay="-2s" />
      
      <div className="max-w-4xl w-full z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/50 border border-white/20 text-brand-primary text-xs tracking-widest uppercase mb-4 font-bold backdrop-blur-sm">
            Para Terapeutas e Psicólogos
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-brand-primary leading-[1.1]">
            A forma mais <span className="italic text-brand-primary/80">leve</span> de gerenciar seu consultório.
          </h1>
          <p className="text-xl text-brand-slate font-light leading-relaxed max-w-lg mx-auto md:mx-0">
            Organize agenda, prontuários e pacientes em um único lugar. 
            Menos planilhas, mais tempo para cuidar de pessoas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-brand-accent text-brand-primary font-bold rounded-full text-lg hover:scale-105 transition-all shadow-xl shadow-brand-accent/20 flex items-center justify-center gap-3"
            >
              Começar Gratuitamente
            </button>
            <button className="px-8 py-4 bg-white/40 text-brand-primary border border-white/40 rounded-full text-lg hover:bg-white/60 backdrop-blur-sm transition-all flex items-center justify-center">
              Ver Demo
            </button>
          </div>
        </div>
        
        <div className="flex-1 w-full max-w-md relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent rounded-[3rem] transform rotate-3 opacity-50 blur-lg"></div>
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-[3rem] shadow-2xl shadow-brand-primary/5">
             <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-brand-primary/5 pb-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-full"></div>
                  <div className="space-y-2 w-full">
                    <div className="h-3 bg-brand-primary/20 rounded w-1/2"></div>
                    <div className="h-2 bg-brand-primary/10 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="space-y-3">
                   <div className="h-16 bg-brand-bg/50 rounded-2xl w-full"></div>
                   <div className="h-16 bg-brand-bg/50 rounded-2xl w-full"></div>
                </div>
                <div className="pt-2 flex justify-end">
                   <div className="px-4 py-2 bg-brand-accent/20 rounded-lg text-brand-primary text-sm font-medium">Próxima Sessão: 14:00</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);

  const renderContent = () => {
    switch (view) {
      case ViewState.DASHBOARD:
        return <Dashboard setView={setView} />;
      case ViewState.CLIENTS:
        return <Clients />;
      case ViewState.MEDICAL_RECORD:
        return <MedicalRecord />;
      case ViewState.CHAT:
        return <Chat />;
      case ViewState.CALENDAR:
        return <Calendar />;
      case ViewState.SETTINGS:
        return <Settings />;
      default:
        return <Dashboard setView={setView} />;
    }
  };

  if (view === ViewState.LANDING) {
    return <LandingPage onStart={() => setView(ViewState.DASHBOARD)} />;
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-slate font-sans selection:bg-brand-accent/30">
      <OrganicShape className="top-[-20%] right-[-10%] w-[800px] h-[800px] opacity-10" color="#152C2E" />
      <OrganicShape className="bottom-[-20%] left-[-10%] w-[600px] h-[600px] opacity-20" color="#A3E635" delay="-5s" />

      {/* Global Notification System */}
      <NotificationSystem />

      <div className="flex h-screen overflow-hidden">
        <Navigation 
          currentView={view} 
          setView={setView} 
          onLogout={() => setView(ViewState.LANDING)}
        />
        
        <main className="flex-1 md:ml-24 p-6 md:p-10 h-full overflow-hidden relative z-10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
