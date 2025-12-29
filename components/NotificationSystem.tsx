
import React, { useState, useEffect } from 'react';
import { Clock, Video, X, ArrowRight, BellRing } from 'lucide-react';

interface UpcomingSession {
  id: string;
  patient: string;
  time: string;
  type: 'Online' | 'Presencial';
  startTime: Date;
}

export const NotificationSystem: React.FC = () => {
  const [activeNotifications, setActiveNotifications] = useState<UpcomingSession[]>([]);
  const [notifiedIds, setNotifiedIds] = useState<Set<string>>(new Set());

  // Mock de sessões para monitoramento
  const getMockUpcoming = (): UpcomingSession[] => {
    // Simulamos que as notificações só existem se houver pacientes no sistema.
    // Em um app real, buscaríamos do estado global de sessões.
    const now = new Date();
    const fiveMinsLater = new Date(now.getTime() + 5 * 60000);
    const hour = String(fiveMinsLater.getHours()).padStart(2, '0');
    const min = String(fiveMinsLater.getMinutes()).padStart(2, '0');

    return [
      {
        id: 'notify-demo-1',
        patient: 'Ana Silva',
        time: `${hour}:${min}`,
        type: 'Online',
        startTime: fiveMinsLater
      }
    ];
  };

  useEffect(() => {
    const checkSessions = () => {
      const upcoming = getMockUpcoming();
      const now = new Date();
      
      upcoming.forEach(session => {
        const diffMinutes = (session.startTime.getTime() - now.getTime()) / 60000;
        
        // Notifica se faltar entre 0 e 10 minutos e ainda não foi notificado
        if (diffMinutes > 0 && diffMinutes <= 10 && !notifiedIds.has(session.id)) {
          setActiveNotifications(prev => [...prev, session]);
          setNotifiedIds(prev => new Set(prev).add(session.id));
          
          // Auto-remove após 15 segundos
          setTimeout(() => {
            closeNotification(session.id);
          }, 15000);
        }
      });
    };

    // Intervalo de checagem
    const interval = setInterval(checkSessions, 30000);
    
    // Pequeno delay inicial para não assustar o usuário assim que ele entra no dashboard
    const initialTimeout = setTimeout(checkSessions, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [notifiedIds]);

  const closeNotification = (id: string) => {
    setActiveNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (activeNotifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-4 max-w-sm w-full pointer-events-none">
      {activeNotifications.map((session) => (
        <div 
          key={session.id}
          className="pointer-events-auto bg-brand-primary text-white rounded-[2rem] p-5 shadow-2xl border border-white/10 animate-fade-in flex flex-col gap-4 relative overflow-hidden group"
        >
          {/* Background Decor */}
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl group-hover:bg-brand-accent/20 transition-all"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-brand-accent p-2.5 rounded-2xl text-brand-primary animate-breathe">
                <BellRing size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent/80">Sessão em instantes</p>
                <h4 className="text-lg font-bold leading-tight">{session.patient}</h4>
              </div>
            </div>
            <button 
              onClick={() => closeNotification(session.id)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors opacity-40 hover:opacity-100"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium text-white/60 relative z-10">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-brand-accent" />
              <span>Início às {session.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Video size={14} className="text-brand-accent" />
              <span>Modalidade {session.type}</span>
            </div>
          </div>

          <div className="flex gap-2 relative z-10">
            <button className="flex-1 bg-brand-accent text-brand-primary py-3 rounded-xl font-bold text-xs hover:scale-[1.02] transition-all active:scale-95 shadow-lg shadow-brand-accent/10 flex items-center justify-center gap-2">
              Entrar na Sala <ArrowRight size={14} />
            </button>
            <button className="px-4 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
              <Clock size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
