import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'Jan', receita: 4000, despesas: 2400 },
  { mes: 'Fev', receita: 3000, despesas: 1398 },
  { mes: 'Mar', receita: 2000, despesas: 9800 },
  { mes: 'Abr', receita: 2780, despesas: 3908 },
  { mes: 'Mai', receita: 1890, despesas: 4800 },
  { mes: 'Jun', receita: 2390, despesas: 3800 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Visão Geral</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Receita Mensal" value="R$ 123.456" change="+12,3%" />
        <MetricCard title="Despesas" value="R$ 45.678" change="-5,6%" />
        <MetricCard title="Lucro Líquido" value="R$ 77.778" change="+8,9%" />
        <MetricCard title="ROI" value="23,45%" change="+0,8%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Receitas vs Despesas</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="receita" stroke="#3b82f6" name="Receita" />
                <Line type="monotone" dataKey="despesas" stroke="#ef4444" name="Despesas" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Indicadores Principais</h3>
          <div className="space-y-4">
            <ProgressBar label="Meta de Vendas" value={75} />
            <ProgressBar label="Satisfação do Cliente" value={88} />
            <ProgressBar label="Eficiência Operacional" value={92} />
            <ProgressBar label="Margem de Lucro" value={65} />
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change }: { title: string; value: string; change: string }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <div className="mt-2">
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </div>
    </div>
  </div>
);

const ProgressBar = ({ label, value }: { label: string; value: number }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-medium text-gray-700">{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default Dashboard;