
import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Chrome, Apple, ChevronLeft } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
  onBack: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de cadastro/login
    onLogin();
  };

  return (
    <div className="fixed inset-0 z-[100] flex bg-[#121212] animate-fade-in overflow-hidden font-sans">
      
      {/* Lado Esquerdo - Visual e Logo */}
      <div className="hidden lg:flex flex-[1.2] relative p-12 flex-col justify-between overflow-hidden">
        {/* Background Image com Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2000" 
            alt="Zen Background" 
            className="w-full h-full object-cover opacity-40 grayscale-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
        </div>

        {/* Top Header */}
        <div className="relative z-10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center text-brand-primary font-serif text-xl font-bold shadow-lg shadow-brand-accent/20">
              T
            </div>
            <span className="text-2xl font-bold text-white tracking-tighter">TeraMind</span>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full backdrop-blur-md"
          >
            Voltar ao site <ArrowRight size={14} />
          </button>
        </div>

        {/* Content Section */}
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-light text-white leading-tight mb-4">
            Organizando mentes, <br/>
            <span className="italic font-serif text-brand-accent">curando vidas</span>.
          </h2>
          <div className="flex gap-2 mt-8">
            <div className="h-1 w-12 bg-white rounded-full"></div>
            <div className="h-1 w-4 bg-white/20 rounded-full"></div>
            <div className="h-1 w-4 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 bg-[#1a1a1a] border-l border-white/5">
        <div className="w-full max-w-md space-y-10">
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">Crie sua conta</h1>
            <p className="text-white/40 text-sm">
              Já possui uma conta? <button className="text-brand-accent hover:underline font-medium">Faça login</button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Nome</label>
                <input 
                  type="text" 
                  required
                  placeholder="Seu nome"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 outline-none focus:border-brand-accent/50 focus:bg-white/[0.08] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Sobrenome</label>
                <input 
                  type="text" 
                  required
                  placeholder="Seu sobrenome"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 outline-none focus:border-brand-accent/50 focus:bg-white/[0.08] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">E-mail Profissional</label>
              <input 
                type="email" 
                required
                placeholder="exemplo@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 outline-none focus:border-brand-accent/50 focus:bg-white/[0.08] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Senha</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="Crie uma senha forte"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 outline-none focus:border-brand-accent/50 focus:bg-white/[0.08] transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded bg-white/5 border-white/10 text-brand-accent focus:ring-brand-accent/20" />
              <p className="text-xs text-white/40 leading-relaxed">
                Eu concordo com os <button type="button" className="text-white/60 hover:text-white underline">Termos & Condições</button> e a <button type="button" className="text-white/60 hover:text-white underline">Política de Privacidade</button>.
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-accent text-brand-primary py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-accent/10 mt-4"
            >
              Criar minha conta
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
              <span className="bg-[#1a1a1a] px-4">Ou cadastre-se com</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-2xl text-white font-bold text-sm hover:bg-white/10 transition-all">
              <Chrome size={18} /> Google
            </button>
            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-2xl text-white font-bold text-sm hover:bg-white/10 transition-all">
              <Apple size={18} /> Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
