import { 
  financialDB, 
  operationalDB, 
  administrativeDB, 
  accountingDB 
} from '../database/mockData';

// Simula delay de rede
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

// Serviço Financeiro
export const FinancialService = {
  async getRevenueData() {
    await simulateDelay();
    return financialDB.revenue;
  },

  async getInvestments() {
    await simulateDelay();
    return financialDB.investments;
  },

  async getFinancialMetrics() {
    await simulateDelay();
    const revenue = financialDB.revenue;
    const lastMonth = revenue[revenue.length - 1];
    
    return {
      monthlyRevenue: lastMonth.revenue,
      expenses: lastMonth.expenses,
      profit: lastMonth.profit,
      cashFlow: lastMonth.cashFlow
    };
  }
};

// Serviço Operacional
export const OperationalService = {
  async getProductionData() {
    await simulateDelay();
    return operationalDB.production;
  },

  async getEquipmentStatus() {
    await simulateDelay();
    return operationalDB.equipment;
  },

  async getOperationalMetrics() {
    await simulateDelay();
    const production = operationalDB.production;
    const lastDay = production[production.length - 1];
    
    return {
      efficiency: lastDay.efficiency,
      defectRate: lastDay.defectRate,
      outputUnits: lastDay.outputUnits,
      downtime: lastDay.downtime
    };
  }
};

// Serviço Administrativo
export const AdministrativeService = {
  async getEmployeeData() {
    await simulateDelay();
    return administrativeDB.employees;
  },

  async getDepartmentData() {
    await simulateDelay();
    return administrativeDB.departments;
  },

  async getAdminMetrics() {
    await simulateDelay();
    const employees = administrativeDB.employees;
    
    return {
      totalEmployees: employees.length,
      averageSatisfaction: employees.reduce((acc, emp) => acc + emp.satisfaction, 0) / employees.length,
      trainingCompleted: employees.reduce((acc, emp) => acc + emp.training, 0),
      totalBudget: administrativeDB.departments.reduce((acc, dep) => acc + dep.budget, 0)
    };
  }
};

// Serviço Contábil
export const AccountingService = {
  async getTransactions() {
    await simulateDelay();
    return accountingDB.transactions;
  },

  async getTaxes() {
    await simulateDelay();
    return accountingDB.taxes;
  },

  async getAccountingMetrics() {
    await simulateDelay();
    const transactions = accountingDB.transactions;
    
    const revenue = transactions
      .filter(t => t.type === 'Receita')
      .reduce((acc, t) => acc + t.value, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'Despesa')
      .reduce((acc, t) => acc + t.value, 0);
    
    return {
      totalRevenue: revenue,
      totalExpenses: expenses,
      profit: revenue - expenses,
      pendingTaxes: accountingDB.taxes.filter(t => t.status === 'Pendente').length
    };
  }
};