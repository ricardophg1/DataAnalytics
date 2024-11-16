import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import AIChat from './components/AIChat';
import Sidebar from './components/Sidebar';
import Financeiro from './components/areas/Financeiro';
import Operacional from './components/areas/Operacional';
import Administrativo from './components/areas/Administrativo';
import Contabilidade from './components/areas/Contabilidade';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'financeiro' && <Financeiro />}
        {activeTab === 'operacional' && <Operacional />}
        {activeTab === 'administrativo' && <Administrativo />}
        {activeTab === 'contabilidade' && <Contabilidade />}
        {activeTab === 'ai-chat' && <AIChat />}
      </main>
    </div>
  );
}

export default App;