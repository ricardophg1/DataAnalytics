import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Download } from 'lucide-react';
import { useFinancialStream, useOperationalStream, useAdministrativeStream, useAccountingStream } from '../hooks/useDataStream';
import { formatCurrency, formatPercent } from '../utils/formatters';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'report';
  reportData?: any;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Olá! Sou seu assistente de análise de dados. Posso ajudar você com:\n\n' +
        '- Geração de relatórios detalhados\n' +
        '- Análise de indicadores\n' +
        '- Insights sobre tendências\n' +
        '- Recomendações estratégicas\n\n' +
        'Como posso ajudar você hoje?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Data streams
  const financial = useFinancialStream();
  const operational = useOperationalStream();
  const administrative = useAdministrativeStream();
  const accounting = useAccountingStream();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateReport = async (area: string) => {
    let reportData;
    let reportContent = '';

    switch (area.toLowerCase()) {
      case 'financeiro':
        if (financial.metrics.data) {
          const { monthlyRevenue, expenses, profit } = financial.metrics.data;
          reportContent = `📊 Relatório Financeiro\n\n` +
            `Receita Mensal: ${formatCurrency(monthlyRevenue)}\n` +
            `Despesas: ${formatCurrency(expenses)}\n` +
            `Lucro: ${formatCurrency(profit)}\n\n` +
            `Análise:\n` +
            `- Margem de lucro atual: ${formatPercent(profit/monthlyRevenue)}\n` +
            `- Tendência de crescimento: ${monthlyRevenue > expenses ? 'Positiva' : 'Negativa'}\n\n` +
            `Recomendações:\n` +
            `1. ${profit > 0 ? 'Aumentar investimentos em áreas de crescimento' : 'Revisar estrutura de custos'}\n` +
            `2. ${expenses/monthlyRevenue > 0.7 ? 'Implementar medidas de redução de custos' : 'Manter controle de despesas'}`;
        }
        break;

      case 'operacional':
        if (operational.metrics.data) {
          const { efficiency, defectRate, outputUnits } = operational.metrics.data;
          reportContent = `⚙️ Relatório Operacional\n\n` +
            `Eficiência: ${formatPercent(efficiency)}\n` +
            `Taxa de Defeitos: ${formatPercent(defectRate)}\n` +
            `Unidades Produzidas: ${outputUnits}\n\n` +
            `Análise:\n` +
            `- Desempenho geral: ${efficiency > 85 ? 'Excelente' : 'Necessita melhorias'}\n` +
            `- Qualidade: ${defectRate < 2 ? 'Dentro do esperado' : 'Acima do limite aceitável'}\n\n` +
            `Recomendações:\n` +
            `1. ${efficiency < 90 ? 'Otimizar processos produtivos' : 'Manter padrões atuais'}\n` +
            `2. ${defectRate > 1 ? 'Implementar controle de qualidade adicional' : 'Continuar monitoramento'}`;
        }
        break;

      // Adicione casos para outras áreas...
    }

    return { content: reportContent, data: reportData };
  };

  const analyzeIntent = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('relatório') || lowercaseInput.includes('report')) {
      const areas = ['financeiro', 'operacional', 'administrativo', 'contábil'];
      for (const area of areas) {
        if (lowercaseInput.includes(area)) {
          return { type: 'report', area };
        }
      }
    }
    
    return { type: 'conversation' };
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    const intent = analyzeIntent(input);
    let response: Message;

    if (intent.type === 'report') {
      const report = await generateReport(intent.area);
      response = {
        role: 'assistant',
        content: report.content,
        type: 'report',
        reportData: report.data
      };
    } else {
      // Simular resposta contextual
      const contextualResponse = `Baseado nos dados atuais, posso ajudar você a analisar ${input}. ` +
        'Que tipo de informação específica você precisa?';
      response = { role: 'assistant', content: contextualResponse };
    }

    setMessages(prev => [...prev, response]);
    setIsGenerating(false);
  };

  const downloadReport = (content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Assistente IA</h2>
        <p className="text-sm text-gray-500">
          Peça relatórios, análises ou tire suas dúvidas
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.type === 'report' ? (
                <div className="space-y-2">
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <button
                    onClick={() => downloadReport(message.content)}
                    className="flex items-center text-sm mt-2 text-blue-600 hover:text-blue-700"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Baixar Relatório
                  </button>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{message.content}</div>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ex: Gerar relatório financeiro..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isGenerating}
          />
          <button
            onClick={handleSend}
            disabled={isGenerating}
            className={`p-2 ${
              isGenerating
                ? 'bg-gray-400'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white rounded-lg transition-colors`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {isGenerating ? 'Gerando resposta...' : 'Digite sua mensagem ou peça um relatório'}
        </div>
      </div>
    </div>
  );
};

export default AIChat;