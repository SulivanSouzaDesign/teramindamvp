import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, ChevronRight, Plus, Link, Calendar as CalendarIcon, 
  Clock, MapPin, Check, X, User
} from 'lucide-react';

interface Session {
  id: string;
  patient: string;
  time: string;
  dateString: string; // Formato YYYY-MM-DD
  type: 'Online' | 'Presencial';
}

// Mock inicial com datas dinâmicas para aparecerem no mês atual
const getTodayString = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

const INITIAL_SESSIONS: Session[] = [
  { id: '1', patient: 'Ana Silva', time: '14:00', dateString: getTodayString(0), type: 'Online' },
  { id: '2', patient: 'Bruno Costa', time: '10:00', dateString: getTodayString(1), type: 'Online' },
  { id: '3', patient: 'Carla Dias', time: '16:00', dateString: getTodayString(0), type: 'Presencial' },
];

export const Calendar: React.FC = () => {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSession, setNewSession] = useState<Partial<Session>>({
    patient: '',
    time: '08:00',
    dateString: getTodayString(0),
    type: 'Online'
  });

  // Calendar Logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const firstDayOfMonth = useMemo(() => new Date(year, month, 1).getDay(), [year, month]);
  
  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long' });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleCopyLink = () => {
    const link = "https://teramind.app/agendar/dr-silva";
    navigator.clipboard.writeText(link);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const openScheduleModal = (day?: number, time?: string) => {
    const selectedDate = day 
      ? new Date(year, month, day).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    setNewSession({
      patient: '',
      dateString: selectedDate,
      time: time || '08:00',
      type: 'Online'
    });
    setIsModalOpen(true);
  };

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSession.patient || !newSession.dateString) return;

    const session: Session = {
      id: Math.random().toString(36).substr(2, 9),
      patient: newSession.patient as string,
      time: newSession.time as string,
      dateString: newSession.dateString as string,
      type: newSession.type as 'Online' | 'Presencial'
    };

    setSessions([...sessions, session]);
    setIsModalOpen(false);
  };

  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const renderMonthView = () => {
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="grid grid-cols-7 gap-2 animate-fade-in">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-[10px] font-bold text-brand-primary/40 uppercase tracking-widest py-2">
            {day}
          </div>
        ))}
        {blanks.map(i => <div key={`blank-${i}`} className="h-24 md:h-32 bg-transparent"></div>)}
        {days.map(day => {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const daySessions = sessions.filter(s => s.dateString === dateStr);
          const isToday = new Date().toISOString().split('T')[0] === dateStr;

          return (
            <div 
              key={day} 
              onClick={() => openScheduleModal(day)}
              className={`h-24 md:h-32 p-2 rounded-2xl border transition-all cursor-pointer group flex flex-col ${
                isToday ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-primary/5 bg-white/20 hover:bg-white/40'
              } ${daySessions.length > 0 ? 'shadow-sm' : ''}`}
            >
              <span className={`text-sm font-bold ${isToday ? 'text-brand-primary' : 'text-brand-primary/40'}`}>
                {day}
              </span>
              <div className="mt-1 space-y-1 overflow-y-auto no-scrollbar flex-1">
                {daySessions.map(s => (
                  <div key={s.id} className="text-[9px] bg-brand-primary text-brand-accent p-1 rounded-md truncate font-medium">
                    {s.time} {s.patient}
                  </div>
                ))}
                {daySessions.length === 0 && (
                  <div className="flex-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={16} className="text-brand-accent" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    // Lógica simplificada para a semana da currentDate
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    return (
      <div className="flex flex-col h-full animate-fade-in">
        <div className="flex border-b border-brand-primary/5">
          <div className="w-20"></div>
          {daysOfWeek.map((day, i) => {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            return (
              <div key={day} className="flex-1 text-center py-4">
                <p className="text-[10px] font-bold text-brand-primary/40 uppercase tracking-widest">{day}</p>
                <p className="text-lg font-serif text-brand-primary">{d.getDate()}</p>
              </div>
            );
          })}
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {hours.map(hour => (
            <div key={hour} className="flex border-b border-brand-primary/5 min-h-[80px]">
              <div className="w-20 text-[10px] text-brand-primary/40 flex items-center justify-center font-bold">
                {hour}
              </div>
              {daysOfWeek.map((_, i) => {
                const d = new Date(startOfWeek);
                d.setDate(startOfWeek.getDate() + i);
                const dateStr = d.toISOString().split('T')[0];
                const session = sessions.find(s => s.time === hour && s.dateString === dateStr);
                
                return (
                  <div 
                    key={i} 
                    onClick={() => !session && openScheduleModal(d.getDate(), hour)}
                    className="flex-1 border-l border-brand-primary/5 p-1 group relative cursor-pointer hover:bg-brand-accent/5 transition-colors"
                  >
                    {session && (
                      <div className="absolute inset-1 bg-brand-primary text-brand-accent p-2 rounded-xl shadow-lg z-10 flex flex-col justify-between">
                        <p className="text-[10px] font-bold truncate">{session.patient}</p>
                        <div className="flex items-center gap-1 text-[8px] opacity-80">
                          <Clock size={8} /> {session.time}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in pb-20 md:pb-0">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-light text-brand-primary font-serif">Sua Agenda</h2>
          <p className="text-brand-slate mt-1 font-light">Navegue e organize seus atendimentos.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-primary/10 rounded-full text-xs font-bold text-brand-primary hover:border-brand-accent transition-all shadow-sm active:scale-95"
          >
            {copyFeedback ? <Check size={14} className="text-brand-accent" /> : <Link size={14} />}
            {copyFeedback ? "Copiado!" : "Link de Agendamento"}
          </button>

          <div className="bg-white/60 p-1 rounded-full border border-brand-primary/5 flex">
            <button onClick={() => setViewMode('month')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === 'month' ? 'bg-brand-primary text-brand-accent' : 'text-brand-primary/40 hover:text-brand-primary'}`}>Mês</button>
            <button onClick={() => setViewMode('week')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === 'week' ? 'bg-brand-primary text-brand-accent' : 'text-brand-primary/40 hover:text-brand-primary'}`}>Semana</button>
          </div>

          <button onClick={() => openScheduleModal()} className="bg-brand-primary text-brand-accent px-6 py-2.5 rounded-full flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-brand-primary/10 text-xs font-bold active:scale-95">
            <Plus size={16} /> Novo Horário
          </button>
        </div>
      </header>

      {/* Navegador de Data */}
      <div className="flex items-center justify-between bg-white/40 backdrop-blur-sm p-4 rounded-3xl border border-white/60">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-serif text-brand-primary capitalize">
            {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-1">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-white rounded-full transition-all text-brand-primary/40 hover:text-brand-primary"><ChevronLeft size={20}/></button>
            <button onClick={handleNextMonth} className="p-2 hover:bg-white rounded-full transition-all text-brand-primary/40 hover:text-brand-primary"><ChevronRight size={20}/></button>
          </div>
        </div>
        <button onClick={handleToday} className="text-xs font-bold text-brand-primary/40 hover:text-brand-primary underline underline-offset-4 decoration-brand-accent decoration-2">Hoje</button>
      </div>

      <div className="flex-1 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-2xl shadow-brand-primary/5 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          {viewMode === 'month' ? renderMonthView() : renderWeekView()}
        </div>
      </div>

      {/* SCHEDULE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-primary/30 backdrop-blur-sm animate-fade-in">
          <div className="bg-brand-bg w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative border border-white/50">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-brand-primary/40 hover:text-brand-primary hover:bg-white/50 rounded-full transition-all">
              <X size={24} />
            </button>
            
            <div className="mb-6">
              <h3 className="text-2xl font-serif text-brand-primary">Agendar Sessão</h3>
              <p className="text-brand-slate text-sm font-light capitalize">Referente a {monthName} de {year}</p>
            </div>

            <form onSubmit={handleSaveSession} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Paciente</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary/30" size={18} />
                  <input type="text" required autoFocus value={newSession.patient} onChange={(e) => setNewSession({...newSession, patient: e.target.value})} placeholder="Nome do paciente..." className="w-full bg-white border border-brand-primary/10 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Data</label>
                  <input type="date" required value={newSession.dateString} onChange={(e) => setNewSession({...newSession, dateString: e.target.value})} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3.5 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Horário</label>
                  <select value={newSession.time} onChange={(e) => setNewSession({...newSession, time: e.target.value})} className="w-full bg-white border border-brand-primary/10 rounded-2xl px-4 py-3.5 outline-none focus:border-brand-accent transition-all text-brand-primary font-medium appearance-none">
                    {hours.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-primary/50 uppercase tracking-widest ml-1">Tipo</label>
                <div className="flex gap-3">
                  {['Online', 'Presencial'].map((t) => (
                    <button key={t} type="button" onClick={() => setNewSession({...newSession, type: t as any})} className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all border ${newSession.type === t ? 'bg-brand-primary text-brand-accent border-brand-primary' : 'bg-white text-brand-primary border-brand-primary/10 hover:border-brand-accent'}`}>{t}</button>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-brand-primary text-brand-accent py-4 rounded-2xl font-bold hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/10 active:scale-95 mt-4">Confirmar Agendamento</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};