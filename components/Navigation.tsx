
import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Users, Calendar, MessageSquare, LogOut, ClipboardList, Settings } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView, onLogout }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, icon: LayoutDashboard, label: 'Painel' },
    { id: ViewState.CLIENTS, icon: Users, label: 'Clientes' },
    { id: ViewState.MEDICAL_RECORD, icon: ClipboardList, label: 'Prontuário' },
    { id: ViewState.CALENDAR, icon: Calendar, label: 'Agenda' },
    { id: ViewState.CHAT, icon: MessageSquare, label: 'Mensagens' },
    { id: ViewState.SETTINGS, icon: Settings, label: 'Ajustes' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full md:w-24 md:h-screen bg-white/40 backdrop-blur-xl md:border-r border-t md:border-t-0 border-brand-primary/5 flex md:flex-col items-center justify-between py-2 md:py-8 px-6 md:px-0 z-50">
      <div className="hidden md:flex flex-col items-center gap-2 mb-10">
        <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-brand-accent font-serif text-xl font-bold">
          T
        </div>
      </div>

      <div className="flex md:flex-col gap-8 w-full md:w-auto justify-between md:justify-start">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`p-3 rounded-2xl transition-all duration-300 group flex flex-col items-center gap-1 ${
              currentView === item.id 
                ? 'bg-brand-primary text-brand-accent shadow-xl shadow-brand-primary/10' 
                : 'text-brand-primary/40 hover:text-brand-primary hover:bg-white/60'
            }`}
          >
            <item.icon size={24} strokeWidth={1.5} />
            <span className="text-[10px] font-medium md:hidden">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="hidden md:flex mt-auto">
        <button 
          onClick={onLogout}
          className="p-3 text-brand-primary/30 hover:text-red-500 transition-colors"
          title="Sair"
        >
          <LogOut size={20} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
};
