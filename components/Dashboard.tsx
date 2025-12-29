import React, { useState } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Calendar as CalendarIcon, Users, Clock, ArrowRight, DollarSign, TrendingUp } from 'lucide-react';
import { ViewState } from '../types';

const monthlyData = [
  { name: 'Jan', valor: 4200 },
  { name: 'Fev', valor: 3800 },
  { name: 'Mar', valor: 5100 },
  { name: 'Abr', valor: 4900 },
  { name: 'Mai', valor: 6200 },
  { name: 'Jun', valor: 5800 },
  { name: 'Jul', valor: 6500 },
  { name: 'Ago', valor: 7100 },
  { name: 'Set', valor: 6900 },
  { name: 'Out', valor: 8200 },
  { name: 'Nov', valor: 7800 },
  { name: 'Dez', valor: 9500 },
];

const weeklyData = [
  { name: 'Seg', valor: 450 },
  { name: 'Ter', valor: 750 },
  { name: 'Qua', valor: 600 },
  { name: 'Qui', valor: 900 },
  { name: 'Sex', valor: 600 },
  { name: 'Sab', valor: 300 },
  { name: 'Dom', valor: 0 },
];

const annualData = [
  { name: '2021', valor: 48000 },
  { name: '2022', valor: 56000 },
  { name: '2023', valor: 72000 },
  { name: '2024', valor: 89400 },
];

interface DashboardProps {
  setView: (view: ViewState) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const [chartView, setChartView] = useState<'weekly' | 'monthly' | 'annual'>('monthly');

  const currentData = chartView === 'weekly' ? weeklyData : chartView === 'monthly' ? monthlyData : annualData;

  return (
    <div className="h-full flex flex-col gap-8 animate-fade-in pb-20 md:pb-0 overflow-y-auto no-scrollbar font-sans">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-light text-brand-primary">Bom dia, Dr. Silva</h2>
          <p className="text-brand-slate mt-1 font-light">Sua clínica está crescendo. Veja o desempenho financeiro total.</p>
        </div>
        <div className="bg-brand-accent/20 px-4 py-2 rounded-2xl flex items-center gap-2 border border-brand-accent/40">
           <TrendingUp size={18} className="text-brand-primary" />
           <span className="text-sm font-bold text-brand-primary">+12% este mês</span>
        </div>
      </header>

      {/* Stats Cards - Valores Totais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => setView(ViewState.CLIENTS)}
          className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white/60 shadow-sm flex items-start justify-between group hover:border-brand-primary/10 transition-all text-left hover:bg-white/80"
        >
          <div>
            <span className="text-brand-primary/40 text-[10px] font-bold uppercase tracking-wider">Faturamento Anual (2024)</span>
            <h3 className="text-3xl font-bold text-brand-primary mt-2">R$ 89.400</h3>
          </div>
          <div className="p-3 bg-brand-bg rounded-2xl text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-accent transition-colors">
            <DollarSign size={24} strokeWidth={1.5} />
          </div>
        </button>
        
        <button 
          onClick={() => setView(ViewState.CALENDAR)}
          className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white/60 shadow-sm flex items-start justify-between group hover:border-brand-primary/10 transition-all text-left hover:bg-white/80"
        >
          <div>
            <span className="text-brand-primary/40 text-[10px] font-bold uppercase tracking-wider">Média Mensal</span>
            <h3 className="text-3xl font-bold text-brand-primary mt-2">R$ 7.450</h3>
          </div>
          <div className="p-3 bg-brand-bg rounded-2xl text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-accent transition-colors">
            <CalendarIcon size={24} strokeWidth={1.5} />
          </div>
        </button>

        <div className="bg-brand-primary text-brand-bg p-6 rounded-3xl shadow-xl shadow-brand-primary/10 flex items-start justify-between group transition-all">
          <div>
            <span className="text-brand-accent text-[10px] font-bold uppercase tracking-wider">Previsto Dezembro</span>
            <h3 className="text-2xl font-bold text-white mt-2">R$ 10.200</h3>
            <p className="text-brand-bg/70 text-xs mt-1 flex items-center gap-1"><TrendingUp size={14}/> Superando a meta</p>
          </div>
          <button className="p-3 bg-brand-accent rounded-2xl text-brand-primary shadow-sm hover:scale-110 transition-transform">
            <ArrowRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-[450px]">
        {/* Main Chart - Valores Totais */}
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-md rounded-3xl border border-white/60 p-8 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-brand-primary">Evolução Financeira Total (R$)</h3>
            <div className="flex bg-brand-bg/50 p-1 rounded-xl border border-brand-primary/5">
               <button 
                 onClick={() => setChartView('weekly')}
                 className={`px-3 py-1 text-[10px] font-bold uppercase rounded-lg transition-all ${chartView === 'weekly' ? 'bg-brand-primary text-brand-accent' : 'text-brand-primary/40 hover:text-brand-primary'}`}
               >
                 Semana
               </button>
               <button 
                 onClick={() => setChartView('monthly')}
                 className={`px-3 py-1 text-[10px] font-bold uppercase rounded-lg transition-all ${chartView === 'monthly' ? 'bg-brand-primary text-brand-accent' : 'text-brand-primary/40 hover:text-brand-primary'}`}
               >
                 Mês
               </button>
               <button 
                 onClick={() => setChartView('annual')}
                 className={`px-3 py-1 text-[10px] font-bold uppercase rounded-lg transition-all ${chartView === 'annual' ? 'bg-brand-primary text-brand-accent' : 'text-brand-primary/40 hover:text-brand-primary'}`}
               >
                 Ano
               </button>
            </div>
          </div>
          <div className="flex-1 w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A3E635" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#A3E635" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE8E0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#152C2E', fontSize: 10, opacity: 0.5, fontWeight: 'bold'}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(val) => `R$ ${val}`}
                  tick={{fill: '#152C2E', fontSize: 10, opacity: 0.5}} 
                />
                <Tooltip 
                  formatter={(value) => [`R$ ${value}`, 'Faturamento Total']}
                  contentStyle={{backgroundColor: '#FFF', borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(21, 44, 46, 0.05)'}}
                  cursor={{stroke: '#152C2E', strokeWidth: 1, opacity: 0.1}}
                />
                <Area 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="#152C2E" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Panel */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-brand-primary mb-6">Resumo de Receita</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-brand-slate">Consultas Particulares</span>
              <span className="text-sm font-bold text-brand-primary">R$ 6.200</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-brand-slate">Reembolsos/Convênios</span>
              <span className="text-sm font-bold text-brand-primary">R$ 2.000</span>
            </div>
            <div className="pt-4 border-t border-brand-primary/5 flex justify-between items-center">
              <span className="text-base font-bold text-brand-primary">Total Este Mês</span>
              <span className="text-lg font-bold text-brand-accent bg-brand-primary px-3 py-1 rounded-xl">R$ 8.200</span>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-brand-primary/5">
            <h4 className="text-[10px] font-bold text-brand-primary/40 mb-4 uppercase tracking-wider">Lembretes Financeiros</h4>
            <ul className="space-y-3">
               <li className="flex items-center gap-3 bg-white/50 p-3 rounded-xl border border-white/60">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                     <Clock size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-brand-primary">Ana Silva</p>
                    <p className="text-[10px] text-brand-slate">Fatura vence amanhã</p>
                  </div>
                  <span className="text-xs font-bold">R$ 180</span>
               </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};