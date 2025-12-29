
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Message } from '../types';
import { Send, Sparkles, Phone, Video, Search, ChevronLeft, UserCircle, Archive, Trash2, MoreVertical } from 'lucide-react';
import { generateTherapistResponse } from '../services/geminiService';

interface ChatSession {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  status: 'online' | 'offline';
  messages: Message[];
  archived?: boolean;
}

const INITIAL_SESSIONS: ChatSession[] = [
  {
    id: '1',
    name: 'Ana Silva',
    avatar: 'https://picsum.photos/100/100?random=1',
    lastMessage: 'Sessão agendada para hoje...',
    status: 'online',
    messages: [
      { id: '1-1', sender: 'client', text: 'Oi, doutor. Tive uma semana muito difícil, estou me sentindo muito ansiosa sobre a apresentação.', timestamp: new Date(Date.now() - 10000000) },
      { id: '1-2', sender: 'user', text: 'Sinto muito ouvir isso, Ana. Quer compartilhar o que aconteceu especificamente?', timestamp: new Date(Date.now() - 9000000) },
      { id: '1-3', sender: 'client', text: 'Fiquei travada na reunião de ontem. Acho que preciso remarcar nossa sessão para mais cedo se possível.', timestamp: new Date(Date.now() - 5000) },
    ],
    archived: false
  },
  {
    id: '2',
    name: 'Bruno Costa',
    avatar: 'https://picsum.photos/100/100?random=2',
    lastMessage: 'Obrigado pela sessão de ontem!',
    status: 'offline',
    messages: [
      { id: '2-1', sender: 'client', text: 'Bom dia! Só queria agradecer pela conversa de ontem. Me ajudou muito.', timestamp: new Date(Date.now() - 86400000) },
      { id: '2-2', sender: 'user', text: 'Que bom, Bruno! Fico feliz em saber. Nos vemos na próxima semana?', timestamp: new Date(Date.now() - 86000000) },
    ],
    archived: false
  },
  {
    id: '3',
    name: 'Daniel Oliveira',
    avatar: 'https://picsum.photos/100/100?random=3',
    lastMessage: 'Pode me confirmar o horário?',
    status: 'online',
    messages: [
      { id: '3-1', sender: 'client', text: 'Olá! Pode me confirmar se nossa sessão é às 15h ou 16h?', timestamp: new Date(Date.now() - 3600000) },
    ],
    archived: false
  }
];

export const Chat: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string | null>('1');
  const [inputText, setInputText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, sessionId: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter out archived sessions
  const visibleSessions = useMemo(() => 
    sessions.filter(s => !s.archived)
  , [sessions]);

  const activeSession = useMemo(() => 
    sessions.find(s => s.id === activeSessionId) || null
  , [sessions, activeSessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeSession) {
      scrollToBottom();
    }
  }, [activeSession?.messages]);

  // Handle context menu closing
  useEffect(() => {
    const handleCloseMenu = () => setContextMenu(null);
    window.addEventListener('click', handleCloseMenu);
    window.addEventListener('scroll', handleCloseMenu, true);
    return () => {
      window.removeEventListener('click', handleCloseMenu);
      window.removeEventListener('scroll', handleCloseMenu, true);
    };
  }, []);

  const handleSend = () => {
    if (!inputText.trim() || !activeSessionId) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setSessions(prev => prev.map(session => 
      session.id === activeSessionId 
        ? { ...session, messages: [...session.messages, newMessage] }
        : session
    ));
    setInputText('');
  };

  const handleAiAssist = async () => {
    if (!activeSession) return;
    const lastClientMessage = [...activeSession.messages].reverse().find(m => m.sender === 'client');
    if (!lastClientMessage) return;

    setAiLoading(true);
    try {
      const suggestion = await generateTherapistResponse(lastClientMessage.text, 'warm');
      setInputText(suggestion);
    } catch (error) {
      console.error("AI Assist failed:", error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, sessionId: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      sessionId
    });
  };

  const archiveSession = (sessionId: string) => {
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, archived: true } : s));
    if (activeSessionId === sessionId) {
      const nextSession = visibleSessions.find(s => s.id !== sessionId);
      setActiveSessionId(nextSession?.id || null);
    }
  };

  const deleteSession = (sessionId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta conversa? Todos os dados serão perdidos.')) {
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      if (activeSessionId === sessionId) {
        const nextSession = visibleSessions.find(s => s.id !== sessionId);
        setActiveSessionId(nextSession?.id || null);
      }
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex gap-6 animate-fade-in pb-20 md:pb-0 overflow-hidden relative">
      
      {/* Context Menu */}
      {contextMenu && (
        <div 
          className="fixed z-[100] bg-white/90 backdrop-blur-2xl border border-brand-primary/10 rounded-2xl shadow-2xl py-2 min-w-[160px] animate-fade-in"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={() => archiveSession(contextMenu.sessionId)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-brand-primary hover:bg-brand-primary/5 transition-colors font-medium"
          >
            <Archive size={16} className="text-brand-primary/40" />
            Arquivar
          </button>
          <button 
            onClick={() => deleteSession(contextMenu.sessionId)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium border-t border-brand-primary/5"
          >
            <Trash2 size={16} />
            Excluir
          </button>
        </div>
      )}

      {/* Sidebar List */}
      <div className={`
        ${isSidebarOpen ? 'flex' : 'hidden'} lg:flex 
        absolute lg:relative z-20 lg:z-0 inset-0 lg:inset-auto
        w-full lg:w-80 flex-col bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 p-6 h-full shadow-sm transition-all
      `}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-serif text-brand-primary">Conversas</h3>
          <button className="lg:hidden p-2" onClick={() => setIsSidebarOpen(false)}>
            <ChevronLeft size={20} />
          </button>
        </div>

        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary/30" />
          <input 
            type="text" 
            placeholder="Buscar paciente..." 
            className="w-full bg-white/50 border border-brand-primary/5 rounded-2xl pl-10 pr-4 py-2 text-sm outline-none focus:border-brand-accent transition-all font-medium"
          />
        </div>

        <div className="space-y-3 overflow-y-auto flex-1 no-scrollbar">
          {visibleSessions.length === 0 ? (
            <div className="text-center py-10 opacity-30">
              <p className="text-xs font-bold uppercase tracking-widest">Nenhuma conversa</p>
            </div>
          ) : (
            visibleSessions.map((session) => (
              <div 
                key={session.id} 
                onContextMenu={(e) => handleContextMenu(e, session.id)}
                onClick={() => {
                  setActiveSessionId(session.id);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`p-4 rounded-[1.5rem] cursor-pointer transition-all flex items-center gap-3 border group relative ${
                  activeSessionId === session.id 
                    ? 'bg-white shadow-xl shadow-brand-primary/5 border-brand-accent/40 scale-[1.02]' 
                    : 'hover:bg-white/40 border-transparent'
                }`}
              >
                <div className="relative">
                  <img src={session.avatar} className="w-12 h-12 rounded-2xl object-cover" alt={session.name} />
                  {session.status === 'online' && (
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-brand-accent border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-brand-primary truncate">{session.name}</h4>
                    <span className="text-[9px] text-brand-primary/30 font-bold uppercase">10:45</span>
                  </div>
                  <p className="text-xs text-brand-slate truncate">{session.messages[session.messages.length - 1]?.text || 'Nenhuma mensagem'}</p>
                </div>
                
                {/* Visual affordance for menu */}
                <button 
                  className="opacity-0 group-hover:opacity-40 p-1 lg:hidden"
                  onClick={(e) => { e.stopPropagation(); handleContextMenu(e as any, session.id); }}
                >
                  <MoreVertical size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-2xl shadow-brand-primary/5 h-full overflow-hidden relative">
        {activeSession ? (
          <>
            {/* Mobile Sidebar Toggle */}
            <button 
              className="lg:hidden absolute top-7 left-4 z-30 p-2 text-brand-primary/60"
              onClick={() => setIsSidebarOpen(true)}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Chat Header */}
            <div className="h-24 border-b border-brand-primary/5 flex justify-between items-center px-8 pl-14 lg:pl-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={activeSession.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt="Client" />
                  {activeSession.status === 'online' && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-accent border-4 border-white rounded-full"></span>
                  )}
                </div>
                <div>
                  <h2 className="text-brand-primary font-bold text-lg">{activeSession.name}</h2>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${activeSession.status === 'online' ? 'text-brand-accent' : 'text-brand-slate/40'}`}>
                    {activeSession.status === 'online' ? 'Ativo agora' : 'Offline'}
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex gap-4 text-brand-primary/40">
                <button className="hover:text-brand-primary hover:bg-white/80 p-3 rounded-2xl transition-all" title="Chamada de áudio"><Phone size={20} /></button>
                <button className="hover:text-brand-primary hover:bg-white/80 p-3 rounded-2xl transition-all" title="Videochamada"><Video size={20} /></button>
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar bg-white/20">
              {activeSession.messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-brand-slate/30 gap-4">
                   <UserCircle size={48} strokeWidth={1} />
                   <p className="text-sm font-medium">Inicie uma conversa acolhedora com {activeSession.name}.</p>
                </div>
              ) : (
                activeSession.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`max-w-[85%] md:max-w-[70%] lg:max-w-[60%] p-5 rounded-[1.8rem] text-[14px] leading-relaxed relative ${
                      msg.sender === 'user' 
                        ? 'bg-brand-primary text-brand-accent rounded-tr-sm shadow-xl shadow-brand-primary/10' 
                        : 'bg-white border border-brand-primary/5 text-brand-primary font-medium rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.text}
                      <span className={`absolute bottom-2 right-4 text-[8px] font-bold opacity-40 ${msg.sender === 'user' ? 'text-brand-accent' : 'text-brand-primary'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-brand-bg/40 border-t border-brand-primary/5">
              <div className="flex items-center gap-2 mb-4">
                 <button 
                    onClick={handleAiAssist}
                    disabled={aiLoading || activeSession.messages.filter(m => m.sender === 'client').length === 0}
                    className={`
                      text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shadow-lg 
                      ${aiLoading 
                        ? 'bg-brand-primary/5 text-brand-primary/40 cursor-wait' 
                        : 'bg-gradient-to-r from-brand-primary to-brand-primary/90 text-brand-accent hover:scale-105 shadow-brand-primary/20 active:scale-95'
                      }
                      disabled:opacity-40 disabled:hover:scale-100
                    `}
                 >
                   <Sparkles size={14} className={aiLoading ? 'animate-spin' : 'animate-pulse text-brand-accent'} />
                   {aiLoading ? 'Ouvindo o paciente...' : 'IA Sugere Resposta'}
                 </button>
                 {aiLoading && (
                   <span className="text-[10px] text-brand-primary/40 animate-pulse font-medium">Analisando o tom da conversa...</span>
                 )}
              </div>
              
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea 
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Escreva algo acolhedor..." 
                    className="w-full bg-white border border-brand-primary/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-accent transition-all placeholder-brand-primary/20 text-brand-primary font-medium shadow-sm resize-none min-h-[56px] max-h-32"
                  />
                </div>
                <button 
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="bg-brand-primary text-brand-accent w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20 active:scale-95 disabled:opacity-20 disabled:scale-100 flex-shrink-0"
                >
                  <Send size={24} className="ml-1" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-brand-slate/40 gap-4">
            <UserCircle size={64} strokeWidth={1} />
            <p className="text-lg font-serif">Selecione uma conversa para começar</p>
          </div>
        )}
      </div>
    </div>
  );
};
