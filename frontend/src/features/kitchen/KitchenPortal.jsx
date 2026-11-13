import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { useAppStore } from '../../store/store';
import Button from '../../components/common/Button';
import { 
  ChefHat, 
  Flame, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Menu, 
  ArrowRight,
  ListOrdered
} from 'lucide-react';

export const KitchenPortal = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { kitchenOrders, updateKitchenStatus } = useAppStore();

  const filteredOrders = activeTab === 'all'
    ? kitchenOrders
    : kitchenOrders.filter(o => o.status.toLowerCase() === activeTab.toLowerCase());

  const newCount = kitchenOrders.filter(o => o.status === 'New').length;
  const preparingCount = kitchenOrders.filter(o => o.status === 'Preparing').length;
  const readyCount = kitchenOrders.filter(o => o.status === 'Ready').length;
  const completedCount = kitchenOrders.filter(o => o.status === 'Completed').length;

  const navLinks = [
    { label: 'Kitchen Dashboard', icon: ChefHat, path: '#all', onClick: () => setActiveTab('all'), badge: kitchenOrders.length },
    { label: 'New Orders / KOT', icon: AlertCircle, path: '#new', onClick: () => setActiveTab('new'), badge: newCount },
    { label: 'Preparing Orders', icon: Flame, path: '#preparing', onClick: () => setActiveTab('preparing'), badge: preparingCount },
    { label: 'Ready Orders', icon: Clock, path: '#ready', onClick: () => setActiveTab('ready'), badge: readyCount },
    { label: 'Completed Orders', icon: CheckCircle2, path: '#completed', onClick: () => setActiveTab('completed'), badge: completedCount },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Preparing': return 'bg-orange-100 text-orange-900 border-orange-300 animate-pulse';
      case 'Ready': return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
      case 'Completed': return 'bg-stone-100 text-stone-700 border-stone-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex">
      {/* Sidebar with exact Mocha Brown #6F4E37 */}
      <Sidebar
        title="Kitchen Portal"
        subtitle="Culinary Ops & KOT"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={navLinks.map(l => ({
          ...l,
          path: `/kitchen#${activeTab}`,
          end: (activeTab === 'all' && l.label === 'Kitchen Dashboard') ||
               (activeTab === 'new' && l.label.includes('New')) ||
               (activeTab === 'preparing' && l.label.includes('Preparing')) ||
               (activeTab === 'ready' && l.label.includes('Ready')) ||
               (activeTab === 'completed' && l.label.includes('Completed'))
        }))}
      />

      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-[#D5BFA4]/40 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#3E271A] hover:bg-[#F4ECE1]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#26160E]">
                Kitchen Display System (KDS)
              </h2>
              <p className="text-xs text-[#8E5B34]">Live Chef Stations & Table Tickets</p>
            </div>
          </div>

          {/* Quick tab switcher */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'all' ? 'bg-[#6F4E37] text-white' : 'bg-[#FAF6F0] text-[#563B29]'
              }`}
            >
              All ({kitchenOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'new' ? 'bg-amber-600 text-white' : 'bg-[#FAF6F0] text-amber-800'
              }`}
            >
              New ({newCount})
            </button>
            <button
              onClick={() => setActiveTab('preparing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'preparing' ? 'bg-orange-600 text-white' : 'bg-[#FAF6F0] text-orange-800'
              }`}
            >
              Preparing ({preparingCount})
            </button>
            <button
              onClick={() => setActiveTab('ready')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ready' ? 'bg-emerald-700 text-white' : 'bg-[#FAF6F0] text-emerald-800'
              }`}
            >
              Ready ({readyCount})
            </button>
          </div>
        </header>

        {/* Orders Board */}
        <main className="p-6 sm:p-8 flex-1 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border-2 border-[#D5BFA4]/60 shadow-md flex flex-col justify-between overflow-hidden"
              >
                {/* Header */}
                <div className="bg-[#FAF6F0] p-4 border-b border-[#D5BFA4]/40 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#6F4E37] bg-white px-2 py-0.5 rounded border border-[#D5BFA4]/40">
                      {order.id}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#26160E] mt-1">{order.table}</h3>
                  </div>
                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="text-[11px] text-[#8E5B34] mt-1">{order.time}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="p-5 flex-1 space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#8E5B34]">Ordered Dishes</p>
                  <ul className="space-y-2.5 divide-y divide-[#F4ECE1]">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="pt-2 first:pt-0">
                        <div className="flex justify-between items-start text-sm">
                          <span className="font-bold text-[#26160E]">{item.qty} × {item.name}</span>
                        </div>
                        {item.notes && (
                          <p className="text-xs text-[#8E5B34] italic mt-0.5 bg-[#FAF6F0] p-1.5 rounded">
                            Note: {item.notes}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Controls for Kitchen Workflow */}
                <div className="p-4 bg-[#F4ECE1]/40 border-t border-[#D5BFA4]/40 flex items-center justify-between gap-2">
                  <span className="text-xs text-[#563B29]">Server: {order.waiter}</span>
                  <div>
                    {order.status === 'New' && (
                      <Button
                        variant="primary"
                        size="sm"
                        icon={Flame}
                        onClick={() => updateKitchenStatus(order.id, 'Preparing')}
                      >
                        Start Preparing
                      </Button>
                    )}
                    {order.status === 'Preparing' && (
                      <Button
                        variant="gold"
                        size="sm"
                        icon={CheckCircle2}
                        onClick={() => updateKitchenStatus(order.id, 'Ready')}
                      >
                        Mark as Ready
                      </Button>
                    )}
                    {order.status === 'Ready' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateKitchenStatus(order.id, 'Completed')}
                      >
                        Dispatched
                      </Button>
                    )}
                    {order.status === 'Completed' && (
                      <span className="text-xs font-bold text-emerald-800">Order Completed</span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
};

export default KitchenPortal;
