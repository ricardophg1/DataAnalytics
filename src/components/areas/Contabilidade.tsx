import React from 'react';

const Contabilidade = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Gestão Contábil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Faturamento Mensal" 
          value="R$ 1.234.567" 
          change="+8,9%" 
        />
        <MetricCard 
          title="Impostos a Recolher" 
          value="R$ 234.567" 
          change="+2,3%" 
        />
        <MetricCard 
          title="Contas a Receber" 
          value="R$ 345.678" 
          change="-4,5%" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Demonstrativos Contábeis</h3>
          <div className="space-y-4">
            <FinancialItem 
              label="Receita Bruta" 
              value="R$ 1.500.000" 
              change="+12,3%" 
            />
            <FinancialItem 
              label="Custos Operacionais" 
              value="R$ 800.000" 
              change="+5,6%" 
            />
            <FinancialItem 
              label="Lucro Operacional" 
              value="R$ 700.000" 
              change="+15,8%" 
            />
            <FinancialItem 
              label="Margem Líquida" 
              value="32%" 
              change="+2,5%" 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Obrigações Fiscais</h3>
          <div className="space-y-4">
            <TaxItem 
              name="ICMS" 
              value="R$ 45.678" 
              dueDate="15/04/2024" 
              status="pendente" 
            />
            <TaxItem 
              name="PIS/COFINS" 
              value="R$ 23.456" 
              dueDate="20/04/2024" 
              status="pago" 
            />
            <TaxItem 
              name="ISS" 
              value="R$ 12.345" 
              dueDate="10/04/2024" 
              status="pendente" 
            />
            <TaxItem 
              name="IRPJ" 
              value="R$ 78.901" 
              dueDate="30/04/2024" 
              status="atrasado" 
            />
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

const FinancialItem = ({ 
  label, 
  value, 
  change 
}: { 
  label: string; 
  value: string; 
  change: string;
}) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <div className="text-right">
      <span className="block text-sm font-bold text-gray-900">{value}</span>
      <span className={`text-xs ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </span>
    </div>
  </div>
);

const TaxItem = ({ 
  name, 
  value, 
  dueDate, 
  status 
}: { 
  name: string; 
  value: string; 
  dueDate: string; 
  status: 'pendente' | 'pago' | 'atrasado';
}) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div>
      <h4 className="font-medium text-gray-800">{name}</h4>
      <p className="text-sm text-gray-500">Vencimento: {dueDate}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-gray-800">{value}</p>
      <span className={`text-xs px-2 py-1 rounded-full ${
        status === 'pago' 
          ? 'bg-green-100 text-green-800'
          : status === 'pendente'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-red-100 text-red-800'
      }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  </div>
);

export default Contabilidade;