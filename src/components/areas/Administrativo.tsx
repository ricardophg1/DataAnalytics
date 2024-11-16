import React from 'react';

const Administrativo = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Gestão Administrativa</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Total de Funcionários" 
          value="234" 
          change="+12" 
        />
        <MetricCard 
          title="Satisfação da Equipe" 
          value="87%" 
          change="+5,2%" 
        />
        <MetricCard 
          title="Custos Administrativos" 
          value="R$ 45.678" 
          change="-3,4%" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Indicadores de RH</h3>
          <div className="space-y-4">
            <ProgressBar label="Retenção de Talentos" value={92} />
            <ProgressBar label="Treinamentos Concluídos" value={78} />
            <ProgressBar label="Avaliações de Desempenho" value={85} />
            <ProgressBar label="Clima Organizacional" value={88} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Departamentos</h3>
          <div className="space-y-4">
            <DepartmentItem name="Recursos Humanos" employees={25} budget="R$ 45.000" />
            <DepartmentItem name="Marketing" employees={15} budget="R$ 35.000" />
            <DepartmentItem name="Jurídico" employees={8} budget="R$ 30.000" />
            <DepartmentItem name="Compras" employees={12} budget="R$ 25.000" />
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

const DepartmentItem = ({ 
  name, 
  employees, 
  budget 
}: { 
  name: string; 
  employees: number; 
  budget: string;
}) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div>
      <h4 className="font-medium text-gray-800">{name}</h4>
      <p className="text-sm text-gray-500">{employees} funcionários</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium text-gray-600">Orçamento</p>
      <p className="text-sm font-bold text-gray-800">{budget}</p>
    </div>
  </div>
);

export default Administrativo;