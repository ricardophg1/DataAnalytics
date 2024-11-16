import { useState, useEffect } from 'react';
import { 
  FinancialService,
  OperationalService,
  AdministrativeService,
  AccountingService
} from '../services/api/dataService';

// Hook genérico para streaming de dados
export function useDataStream<T>(
  fetchFunction: () => Promise<T>,
  interval: number = 5000 // Atualiza a cada 5 segundos por padrão
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        if (mounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
          setLoading(false);
        }
      }
    };

    fetchData();
    const timer = setInterval(fetchData, interval);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [fetchFunction, interval]);

  return { data, loading, error };
}

// Hooks específicos para cada área
export function useFinancialStream() {
  const revenue = useDataStream(FinancialService.getRevenueData);
  const investments = useDataStream(FinancialService.getInvestments);
  const metrics = useDataStream(FinancialService.getFinancialMetrics);

  return { revenue, investments, metrics };
}

export function useOperationalStream() {
  const production = useDataStream(OperationalService.getProductionData);
  const equipment = useDataStream(OperationalService.getEquipmentStatus);
  const metrics = useDataStream(OperationalService.getOperationalMetrics);

  return { production, equipment, metrics };
}

export function useAdministrativeStream() {
  const employees = useDataStream(AdministrativeService.getEmployeeData);
  const departments = useDataStream(AdministrativeService.getDepartmentData);
  const metrics = useDataStream(AdministrativeService.getAdminMetrics);

  return { employees, departments, metrics };
}

export function useAccountingStream() {
  const transactions = useDataStream(AccountingService.getTransactions);
  const taxes = useDataStream(AccountingService.getTaxes);
  const metrics = useDataStream(AccountingService.getAccountingMetrics);

  return { transactions, taxes, metrics };
}