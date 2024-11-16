import React from 'react';
import { 
  BarChart3, 
  Brain, 
  Wallet, 
  Factory, 
  Building2, 
  Calculator,
  Settings 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'financeiro', icon: Wallet, label: 'Financeiro' },
    { id: 'operacional', icon: Factory, label: 'Operacional' },
    { id: 'administrativo', icon: Building2, label: 'Administrativo' },
    { id: 'contabilidade', icon: Calculator, label: 'Contabilidade' },
    { id: 'ai-chat', icon: Brain, label: 'Assistente IA' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestão Empresarial</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
        <button className="flex items-center text-gray-600 hover:text-gray-900">
          <Settings className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Configurações</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;