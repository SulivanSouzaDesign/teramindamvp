
import React, { useState } from 'react';
import { Shield, Rocket, CheckCircle2, AlertCircle, Terminal, Globe, Key, FileJson, Share2, Server } from 'lucide-react';

export const Settings: React.FC = () => {
  const [isProduction, setIsProduction] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<'connected' | 'checking' | 'error'>('connected');

  const deploymentChecklist = [
    { id: 1, task: 'Configurar Variáveis de Ambiente (API_KEY)', completed: true },
    { id: 2, task: 'Configurar Domínio Customizado (teramind.app)', completed: false },
    { id: 3, task: 'Ativar Certificado SSL (HTTPS)', completed: true },
    { id: 4, task: 'Homologação de Termos de Uso e LGPD', completed: false },
    { id: 5, task: 'Remover Dados Mock de Teste', completed: isProduction },
  ];

  const handleExportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      app: "TeraMind MVP",
      version: "1.0.0-rc1"
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `teramind_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="h-full flex flex-col gap-8 animate-fade-in pb-20 md:pb-0 overflow-y-auto no-scrollbar font-sans">
      <header>
        <h2 className="text-3xl font-light text-brand-primary">Centro de Lançamento</h2>
        <p className="text-brand-slate mt-1 font-light">Gerencie o status de produção e configurações do sistema.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Status Card */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/60 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-brand-primary flex items-center gap-2">
                <Rocket size={20} className="text-brand-accent" /> Status de Deploy
              </h3>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${isProduction ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {isProduction ? 'Produção' : 'Ambiente de Teste'}
              </div>
            </div>

            <div className="space-y-4">
              {deploymentChecklist.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-white/40 rounded-2xl border border-brand-primary/5">
                  <span className={`text-sm ${item.completed ? 'text-brand-primary font-medium' : 'text-brand-slate/40'}`}>
                    {item.task}
                  </span>
                  {item.completed ? (
                    <CheckCircle2 size={18} className="text-brand-accent" />
                  ) : (
                    <AlertCircle size={18} className="text-brand-primary/10" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-brand-primary/5 flex flex-col md:flex-row gap-4">
              <button 
                onClick={() => setIsProduction(!isProduction)}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg ${isProduction ? 'bg-white border border-brand-primary/10 text-brand-primary' : 'bg-brand-primary text-brand-accent shadow-brand-primary/20'}`}
              >
                {isProduction ? 'Reverter para Homologação' : 'Mudar para Modo Produção'}
              </button>
              <button 
                onClick={handleExportData}
                className="flex-1 bg-white border border-brand-primary/10 text-brand-primary py-4 rounded-2xl font-bold text-sm hover:bg-brand-primary/5 transition-all flex items-center justify-center gap-2"
              >
                <FileJson size={18} /> Exportar Banco de Dados
              </button>
            </div>
          </div>

          <div className="bg-brand-primary text-brand-accent rounded-[2.5rem] p-8 shadow-2xl shadow-brand-primary/20 relative overflow-hidden group">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
               <Globe size={22} /> Próximos Passos para Lançamento Real
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs">01</div>
                <p className="text-white/80 text-sm leading-relaxed">Conecte seu repositório Git a uma plataforma como <span className="text-white font-bold">Vercel</span> ou <span className="text-white font-bold">Netlify</span>.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs">02</div>
                <p className="text-white/80 text-sm leading-relaxed">Adicione a variável <span className="font-mono bg-white/10 px-1 rounded text-white">API_KEY</span> nas configurações da plataforma escolhida.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs">03</div>
                <p className="text-white/80 text-sm leading-relaxed">Compartilhe o link gerado com sua primeira leva de testadores Beta para aprovação.</p>
              </div>
            </div>
            <button className="mt-8 bg-brand-accent text-brand-primary px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-brand-accent/20">
               Gerar Link de Convite Beta
            </button>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/60">
            <h4 className="text-xs font-bold text-brand-primary/40 uppercase tracking-widest mb-4">Segurança & API</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${apiKeyStatus === 'connected' ? 'bg-green-500' : 'bg-orange-500'} animate-pulse`}></div>
                <div>
                  <p className="text-sm font-bold text-brand-primary">Gemini 3 Flash</p>
                  <p className="text-[10px] text-brand-slate uppercase font-bold tracking-tight">Status: Conectado</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-brand-primary/5">
                <Shield className="text-brand-accent" size={18} />
                <p className="text-xs text-brand-primary font-medium">Criptografia Ponta-a-Ponta</p>
              </div>
              <div className="flex items-center gap-3">
                <Server className="text-brand-accent" size={18} />
                <p className="text-xs text-brand-primary font-medium">Backup Diário Automático</p>
              </div>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-dashed border-brand-primary/10">
            <h4 className="text-xs font-bold text-brand-primary/40 uppercase tracking-widest mb-4">Suporte de Produção</h4>
            <p className="text-[11px] text-brand-slate leading-relaxed mb-4">
              O TeraMind MVP está pronto para testes. Se encontrar bugs durante a fase de aprovação, use o terminal de logs para depuração.
            </p>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-primary/5 text-brand-primary text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-brand-primary/10 transition-all">
              <Terminal size={14} /> Abrir Logs de Sistema
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
