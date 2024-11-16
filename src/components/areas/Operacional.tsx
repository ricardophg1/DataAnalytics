import React from 'react';

const Operacional = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Gestão Operacional</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Eficiência Produtiva" 
          value="87,5%" 
          change="+2,3%" 
        />
        <MetricCard 
          title="Tempo Médio de Produção" 
          value="45 min" 
          change="-5,6%" 
        />
        <MetricCard 
          title="Taxa de Defeitos" 
          value="0,8%" 
          change="-0,3%" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Indicadores de Produção</h3>
          <div className="space-y-4">
            <ProgressBar label="Capacidade Utilizada" value={82} />
            <ProgressBar label="Manutenção Preventiva" value={95} />
            <ProgressBar label="Qualidade" value={98} />
            <ProgressBar label="Entrega no Prazo" value={88} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Status de Equipamentos</h3>
          <div className="space-y-4">
            {['Linha 1', 'Linha 2', 'Linha 3', 'Linha 4'].map((linha) => (
              <StatusItem 
                key={linha} 
                label={linha} 
                status={Math.random() > 0.2 ? 'operacional' : 'manutenção'} 
              />
            ))}
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

const StatusItem = ({ label, status }: { label: string; status: 'operacional' | 'manutenção' }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      status === 'operacional' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-yellow-100 text-yellow-800'
    }`}>
      {status === 'operacional' ? 'Operacional' : 'Em Manutenção'}
    </span>
  </div>
);

export default Operacional;