import { 
  FinancialService, 
  OperationalService, 
  AdministrativeService, 
  AccountingService 
} from '../api/dataService';
import { formatCurrency, formatPercent, formatDate } from '../../utils/formatters';

export interface ReportConfig {
  area: string;
  period?: string;
  type?: string;
  metrics?: string[];
}

export async function generateReport(config: ReportConfig) {
  const data = await fetchReportData(config);
  return formatReport(data, config);
}

async function fetchReportData(config: ReportConfig) {
  switch (config.area.toLowerCase()) {
    case 'financeiro':
      return {
        metrics: await FinancialService.getFinancialMetrics(),
        revenue: await FinancialService.getRevenueData(),
        investments: await FinancialService.getInvestments()
      };

    case 'operacional':
      return {
        metrics: await OperationalService.getOperationalMetrics(),
        production: await OperationalService.getProductionData(),
        equipment: await OperationalService.getEquipmentStatus()
      };

    case 'administrativo':
      return {
        metrics: await AdministrativeService.getAdminMetrics(),
        employees: await AdministrativeService.getEmployeeData(),
        departments: await AdministrativeService.getDepartmentData()
      };

    case 'contabil':
      return {
        metrics: await AccountingService.getAccountingMetrics(),
        transactions: await AccountingService.getTransactions(),
        taxes: await AccountingService.getTaxes()
      };

    default:
      throw new Error('Área não suportada');
  }
}

function formatReport(data: any, config: ReportConfig): string {
  let report = `📊 Relatório ${config.area}\n`;
  report += `Data: ${formatDate(new Date().toISOString())}\n\n`;

  // Adicionar métricas principais
  report += '📈 Métricas Principais:\n';
  Object.entries(data.metrics).forEach(([key, value]: [string, any]) => {
    if (typeof value === 'number') {
      report += `${formatMetricName(key)}: ${formatMetricValue(key, value)}\n`;
    }
  });

  // Adicionar análise
  report += '\n📋 Análise:\n';
  const analysis = generateAnalysis(data, config);
  report += analysis;

  // Adicionar recomendações
  report += '\n💡 Recomendações:\n';
  const recommendations = generateRecommendations(data, config);
  report += recommendations;

  return report;
}

function formatMetricName(key: string): string {
  return key
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatMetricValue(key: string, value: number): string {
  if (key.toLowerCase().includes('revenue') || 
      key.toLowerCase().includes('cost') || 
      key.toLowerCase().includes('value')) {
    return formatCurrency(value);
  }
  if (key.toLowerCase().includes('rate') || 
      key.toLowerCase().includes('percentage')) {
    return formatPercent(value);
  }
  return formatNumber(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

function generateAnalysis(data: any, config: ReportConfig): string {
  let analysis = '';
  
  switch (config.area.toLowerCase()) {
    case 'financeiro':
      const { monthlyRevenue, expenses, profit } = data.metrics;
      analysis += `- Margem de lucro: ${formatPercent(profit/monthlyRevenue)}\n`;
      analysis += `- Tendência: ${monthlyRevenue > expenses ? 'Positiva' : 'Negativa'}\n`;
      break;

    case 'operacional':
      const { efficiency, defectRate } = data.metrics;
      analysis += `- Eficiência: ${formatPercent(efficiency)} (${efficiency > 85 ? 'Ótima' : 'Necessita atenção'})\n`;
      analysis += `- Qualidade: Taxa de defeitos em ${formatPercent(defectRate)}\n`;
      break;

    // Adicione outros casos conforme necessário
  }

  return analysis;
}

function generateRecommendations(data: any, config: ReportConfig): string {
  let recommendations = '';
  
  switch (config.area.toLowerCase()) {
    case 'financeiro':
      const { profit, expenses, monthlyRevenue } = data.metrics;
      if (profit > 0) {
        recommendations += '1. Investir em expansão\n';
        recommendations += '2. Diversificar portfolio\n';
      } else {
        recommendations += '1. Reduzir custos operacionais\n';
        recommendations += '2. Renegociar contratos\n';
      }
      break;

    case 'operacional':
      const { efficiency, defectRate } = data.metrics;
      if (efficiency < 85) {
        recommendations += '1. Otimizar processos produtivos\n';
        recommendations += '2. Treinar equipe operacional\n';
      }
      if (defectRate > 2) {
        recommendations += '3. Implementar controle de qualidade adicional\n';
      }
      break;

    // Adicione outros casos conforme necessário
  }

  return recommendations;
}

export default generateReport;