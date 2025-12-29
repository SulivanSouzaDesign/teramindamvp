
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
import { Auth } from './components/Auth';
import { ArrowRight, Play, CheckCircle, Shield, Zap } from 'lucide-react';

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-brand-bg selection:bg-brand-accent/30 selection:text-brand-primary">
      {/* Background Decor */}
      <OrganicShape className="top-[-10%] left-[-10%] w-[600px] h-[600px]" color="#152C2E" />
      <OrganicShape className="bottom-[-10%] right-[-5%] w-[700px] h-[700px]" color="#A3E635" delay="-2s" />
      
      {/* Top Bar Logo */}
      <header className="absolute top-0 left-0 w-full p-8 md:px-16 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-brand-accent font-serif text-xl font-bold">T</div>
          <span className="text-2xl font-bold text-brand-primary tracking-tighter">TeraMind</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-brand-primary/60 uppercase tracking-widest">
          <a href="#" className="hover:text-brand-primary transition-colors">Funcionalidades</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Preços</a>
          <button onClick={onStart} className="text-brand-primary border-b-2 border-brand-accent pb-0.5">Entrar</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-48 md:pb-32 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          
          {/* Left Column: Copy */}
          <div className="flex-1 space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-brand-primary/5 text-brand-primary text-[11px] tracking-[0.2em] uppercase mb-4 font-black backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
              A evolução da gestão terapêutica
            </div>
            
            <h1 className="text-6xl md:text-8xl font-light text-brand-primary leading-[1.05] tracking-tight">
              Sua clínica em <span className="font-serif italic text-brand-primary/70">harmonia</span>. <br/>
              Seu tempo de <span className="text-brand-primary font-bold">volta</span>.
            </h1>
            
            <p className="text-xl md:text-2xl text-brand-slate font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              A plataforma que organiza sua rotina para que você possa focar no que realmente importa: <span className="font-medium text-brand-primary">a jornada de seus pacientes.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6">
              <button 
                onClick={onStart}
                className="group px-10 py-5 bg-brand-primary text-brand-accent font-bold rounded-[2rem] text-xl hover:scale-105 transition-all shadow-2xl shadow-brand-primary/20 flex items-center justify-center gap-4 active:scale-95"
              >
                Começar Gratuitamente
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              
              <button onClick={onStart} className="group px-10 py-5 bg-white/50 text-brand-primary border border-white/80 rounded-[2rem] text-xl hover:bg-white hover:shadow-xl backdrop-blur-sm transition-all flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={18} fill="currentColor" />
                </div>
                Ver Demo
              </button>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 opacity-60">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-primary">
                <CheckCircle size={16} className="text-brand-accent" /> Gestão Inteligente
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-primary">
                <Shield size={16} className="text-brand-accent" /> Dados Criptografados
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-primary">
                <Zap size={16} className="text-brand-accent" /> Sugestões por IA
              </div>
            </div>
          </div>
          
          {/* Right Column: Visual Composition */}
          <div className="flex-1 w-full max-w-2xl relative mt-10 lg:mt-0">
            <div className="relative aspect-[4/5] md:aspect-square">
              {/* Main Decorative Background */}
              <div className="absolute inset-0 bg-brand-primary rounded-[4rem] transform rotate-3 scale-95 opacity-5 blur-2xl"></div>
              
              {/* Main Professional Image (Placeholder with styled container) */}
              <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden border-[12px] border-white shadow-2xl bg-brand-primary/10">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Professional Therapist"
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Floating Badges inspired by Reference 2 */}
                <div className="absolute top-12 -left-8 bg-brand-accent text-brand-primary px-6 py-3 rounded-2xl shadow-xl shadow-brand-accent/20 font-bold text-sm transform -rotate-6 animate-float">
                  hand-in-hand
                </div>
                
                <div className="absolute top-1/2 -right-8 bg-brand-primary text-brand-accent px-6 py-3 rounded-2xl shadow-xl shadow-brand-primary/20 font-bold text-sm transform rotate-3 animate-float" style={{ animationDelay: '-1.5s' }}>
                  foco no paciente
                </div>

                <div className="absolute bottom-12 left-12 bg-white/90 backdrop-blur-md text-brand-primary px-5 py-4 rounded-[2rem] shadow-2xl border border-white/50 flex items-center gap-3 animate-float" style={{ animationDelay: '-3s' }}>
                  <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Prontuário</p>
                    <p className="text-sm font-bold">Resumo por IA pronto</p>
                  </div>
                </div>
              </div>

              {/* Decorative Geometric Patterns */}
              <div className="absolute -top-10 -right-10 w-32 h-32 opacity-20 hidden md:block">
                <svg viewBox="0 0 100 100" className="w-full h-full text-brand-primary">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer / Trust Badge */}
      <footer className="absolute bottom-10 left-0 w-full px-8 flex justify-center lg:justify-start">
        <p className="text-brand-primary/30 text-xs font-bold uppercase tracking-[0.3em]">
          Utilizado por mais de 500 profissionais em todo o Brasil
        </p>
      </footer>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);

  // Helper para verificar se o usuário está em uma área autenticada
  const isAuthenticatedArea = view !== ViewState.LANDING && view !== ViewState.AUTH;

  const renderContent = () => {
    switch (view) {
      case ViewState.AUTH:
        return <Auth onLogin={() => setView(ViewState.DASHBOARD)} onBack={() => setView(ViewState.LANDING)} />;
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

  // Se estiver na Landing, retorna apenas a Landing (layout limpo)
  if (view === ViewState.LANDING) {
    return <LandingPage onStart={() => setView(ViewState.AUTH)} />;
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-slate font-sans selection:bg-brand-accent/30">
      {/* Decorações só aparecem fora do Login para manter foco */}
      {isAuthenticatedArea && (
        <>
          <OrganicShape className="top-[-20%] right-[-10%] w-[800px] h-[800px] opacity-10" color="#152C2E" />
          <OrganicShape className="bottom-[-20%] left-[-10%] w-[600px] h-[600px] opacity-20" color="#A3E635" delay="-5s" />
          
          {/* O Sistema de Notificação só existe em áreas autenticadas */}
          <NotificationSystem />
        </>
      )}

      {/* Global Notification System (para o site em si, se necessário, mas as de sessão ficam acima) */}
      
      <div className="flex h-screen overflow-hidden">
        {isAuthenticatedArea && (
          <Navigation 
            currentView={view} 
            setView={setView} 
            onLogout={() => setView(ViewState.LANDING)}
          />
        )}
        
        <main className={`flex-1 ${isAuthenticatedArea ? 'md:ml-24 p-6 md:p-10' : ''} h-full overflow-hidden relative z-10`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
