import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, Percent, TrendingUp, AlertTriangle } from 'lucide-react';

const data = [
  { mes: 'Jan', fluxoCaixa: 40000, investimentos: 24000, receitas: 65000 },
  { mes: 'Fev', fluxoCaixa: 30000, investimentos: 13980, receitas: 55000 },
  { mes: 'Mar', fluxoCaixa: 20000, investimentos: 98000, receitas: 78000 },
  { mes: 'Abr', fluxoCaixa: 27800, investimentos: 39080, receitas: 68000 },
  { mes: 'Mai', fluxoCaixa: 18900, investimentos: 48000, receitas: 72000 },
  { mes: 'Jun', fluxoCaixa: 23900, investimentos: 38000, receitas: 84000 },
];

const investimentos = [
  { tipo: 'Renda Fixa', valor: 500000, rentabilidade: 12.5, risco: 'Baixo' },
  { tipo: 'Ações', valor: 300000, rentabilidade: 18.3, risco: 'Alto' },
  { tipo: 'Fundos', valor: 250000, rentabilidade: 15.7, risco: 'Médio' },
  { tipo: 'Imóveis', valor: 800000, rentabilidade: 8.9, risco: 'Baixo' },
];

const alertas = [
  { tipo: 'Contas a Pagar', valor: 45000, vencimento: '15/04/2024', status: 'Urgente' },
  { tipo: 'Impostos', valor: 28000, vencimento: '20/04/2024', status: 'Próximo' },
  { tipo: 'Folha de Pagamento', valor: 120000, vencimento: '05/04/2024', status: 'Pendente' },
];

const Financeiro = () => {
  const [activeTab, setActiveTab] = useState('visao-geral');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestão Financeira</h1>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Novo Lançamento
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* Tabs de Navegação */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'visao-geral', label: 'Visão Geral' },
            { id: 'fluxo-caixa', label: 'Fluxo de Caixa' },
            { id: 'investimentos', label: 'Investimentos' },
            { id: 'contas', label: 'Contas' },
            { id: 'relatorios', label: 'Relatórios' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard 
          title="Fluxo de Caixa" 
          value="R$ 234.567" 
          change="+15,3%"
          icon={DollarSign}
          trend="up"
        />
        <MetricCard 
          title="ROI" 
          value="21,5%" 
          change="+2,3%"
          icon={Percent}
          trend="up"
        />
        <MetricCard 
          title="Investimentos" 
          value="R$ 1.85M" 
          change="+8,7%"
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard 
          title="Contas a Pagar" 
          value="R$ 193.000" 
          change="+5,2%"
          icon={AlertTriangle}
          trend="down"
        />
      </div>

      {/* Conteúdo Principal */}
      {activeTab === 'visao-geral' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Análise Financeira</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="receitas" stroke="#10b981" name="Receitas" />
                  <Line type="monotone" dataKey="fluxoCaixa" stroke="#3b82f6" name="Fluxo de Caixa" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Alertas Financeiros</h3>
            <div className="space-y-4">
              {alertas.map((alerta, index) => (
                <AlertaFinanceiro key={index} {...alerta} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'investimentos' && (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Carteira de Investimentos</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Novo Investimento
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={investimentos}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tipo" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="valor" fill="#3b82f6" name="Valor Investido" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {investimentos.map((inv, index) => (
                  <InvestimentoCard key={index} {...inv} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  trend 
}: { 
  title: string; 
  value: string; 
  change: string;
  icon: any;
  trend: 'up' | 'down';
}) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="mt-2">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className={`flex items-center text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
            {change}
          </div>
        </div>
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
);

const AlertaFinanceiro = ({ tipo, valor, vencimento, status }: { 
  tipo: string; 
  valor: number; 
  vencimento: string; 
  status: string;
}) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div>
      <h4 className="font-medium text-gray-800">{tipo}</h4>
      <p className="text-sm text-gray-500">Vencimento: {vencimento}</p>
    </div>
    <div className="text-right">
      <p className="text-lg font-bold text-gray-900">
        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)}
      </p>
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === 'Urgente' 
          ? 'bg-red-100 text-red-800'
          : status === 'Próximo'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-blue-100 text-blue-800'
      }`}>
        {status}
      </span>
    </div>
  </div>
);

const InvestimentoCard = ({ tipo, valor, rentabilidade, risco }: {
  tipo: string;
  valor: number;
  rentabilidade: number;
  risco: string;
}) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-medium text-gray-800">{tipo}</h4>
        <p className="text-sm text-gray-500">Risco: {risco}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)}
        </p>
        <p className="text-sm text-green-600">+{rentabilidade}% a.a.</p>
      </div>
    </div>
  </div>
);

export default Financeiro;