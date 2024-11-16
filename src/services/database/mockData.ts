// Mock databases for different areas
export const financialDB = {
  revenue: Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleString('pt-BR', { month: 'short' }),
    revenue: Math.random() * 1000000 + 500000,
    expenses: Math.random() * 500000 + 200000,
    profit: Math.random() * 300000 + 100000,
    cashFlow: Math.random() * 200000 + 50000,
    investments: Math.random() * 400000 + 100000
  })),
  
  investments: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    type: ['Ações', 'Títulos', 'Imóveis', 'Fundos', 'Startups'][Math.floor(Math.random() * 5)],
    value: Math.random() * 1000000 + 100000,
    return: Math.random() * 20 - 5,
    risk: ['Baixo', 'Médio', 'Alto'][Math.floor(Math.random() * 3)]
  }))
};

export const operationalDB = {
  production: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString(),
    efficiency: Math.random() * 30 + 70,
    defectRate: Math.random() * 5,
    outputUnits: Math.floor(Math.random() * 1000 + 500),
    downtime: Math.random() * 60,
    maintenanceCost: Math.random() * 10000 + 1000
  })),
  
  equipment: Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Equipamento ${i + 1}`,
    status: Math.random() > 0.2 ? 'Operacional' : 'Manutenção',
    lastMaintenance: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString(),
    efficiency: Math.random() * 20 + 80,
    nextMaintenance: new Date(2024, 1, Math.floor(Math.random() * 28) + 1).toISOString()
  }))
};

export const administrativeDB = {
  employees: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    department: ['RH', 'Marketing', 'Financeiro', 'Operações', 'TI'][Math.floor(Math.random() * 5)],
    salary: Math.random() * 8000 + 2000,
    performance: Math.random() * 40 + 60,
    training: Math.floor(Math.random() * 5),
    satisfaction: Math.random() * 40 + 60
  })),
  
  departments: [
    { name: 'RH', budget: 450000, employees: 25, projects: 4 },
    { name: 'Marketing', budget: 350000, employees: 15, projects: 6 },
    { name: 'Financeiro', budget: 300000, employees: 12, projects: 3 },
    { name: 'Operações', budget: 550000, employees: 35, projects: 5 },
    { name: 'TI', budget: 400000, employees: 20, projects: 7 }
  ]
};

export const accountingDB = {
  transactions: Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    date: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString(),
    type: ['Receita', 'Despesa'][Math.floor(Math.random() * 2)],
    category: ['Operacional', 'Financeiro', 'Administrativo', 'Marketing', 'Vendas'][Math.floor(Math.random() * 5)],
    value: Math.random() * 10000 + 1000,
    description: `Transação ${i + 1}`
  })),
  
  taxes: [
    { name: 'ICMS', value: 45678, dueDate: '2024-04-15', status: 'Pendente' },
    { name: 'PIS/COFINS', value: 23456, dueDate: '2024-04-20', status: 'Pago' },
    { name: 'ISS', value: 12345, dueDate: '2024-04-10', status: 'Pendente' },
    { name: 'IRPJ', value: 78901, dueDate: '2024-04-30', status: 'Atrasado' }
  ]
};