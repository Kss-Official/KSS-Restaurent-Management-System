import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { useAppStore } from '../../store/store';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../components/common/Button';
import { 
  Users, 
  Layers, 
  UtensilsCrossed, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  Menu, 
  Send, 
  Bell, 
  Check 
} from 'lucide-react';

export const WaiterPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { tables, kitchenOrders, updateKitchenStatus, menuItems, createTableOrder } = useAppStore();

  const [selectedTable, setSelectedTable] = useState(tables[1]); // Table 2
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([
    { ...menuItems[0], qty: 1 }
  ]);
  const [orderNotes, setOrderNotes] = useState('');

  // Orders that are Ready to be served to tables
  const readyOrders = kitchenOrders.filter(o => o.status === 'Ready');

  const navLinks = [
    { label: 'Waiter Dashboard', icon: Users, path: '#dashboard', onClick: () => setActiveTab('dashboard') },
    { label: 'Assigned Tables', icon: Layers, path: '#tables', onClick: () => setActiveTab('tables'), badge: tables.length },
    { label: 'View Table Orders', icon: UtensilsCrossed, path: '#orders', onClick: () => setActiveTab('orders'), badge: kitchenOrders.length },
    { label: 'Create Orders', icon: PlusCircle, path: '#create', onClick: () => { setOrderModalOpen(true); } },
    { label: 'Serve Ready Orders', icon: Bell, path: '#ready', onClick: () => setActiveTab('ready'), badge: readyOrders.length },
  ];

  const handleCreateOrderSubmit = (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) return;
    createTableOrder(selectedTable.number, selectedItems, orderNotes);
    setOrderModalOpen(false);
    setOrderNotes('');
    alert(`Order dispatched directly to Kitchen Display System for Table ${selectedTable.number}!`);
  };

  const handleServeOrder = (orderId) => {
    updateKitchenStatus(orderId, 'Completed');
    alert(`Order ${orderId} marked as served to guests.`);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex">
      {/* Sidebar with exact Mocha Brown #6F4E37 */}
      <Sidebar
        title="Waiter Portal"
        subtitle="Floor Service & Orders"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={navLinks.map(l => ({
          ...l,
          path: `/waiter#${activeTab}`,
          end: activeTab === l.label.toLowerCase().split(' ')[0] || (activeTab === 'dashboard' && l.label.includes('Dashboard'))
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
                Floor Service & Table Management
              </h2>
              <p className="text-xs text-[#8E5B34]">Section: Floor A (Tables 1 - 8)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              icon={PlusCircle}
              onClick={() => setOrderModalOpen(true)}
            >
              Take New Table Order
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 sm:p-8 flex-1 space-y-8">
          
          {/* Ready to Serve Notification Banner */}
          {readyOrders.length > 0 && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#6F4E37] to-[#8E5B34] text-white shadow-lg flex items-center justify-between gap-4 animate-bounce duration-1000">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-[#E6D7C3]" />
                <div>
                  <p className="font-bold text-sm">Dishes Ready for Pickup!</p>
                  <p className="text-xs text-[#E6D7C3]">{readyOrders.length} order(s) waiting at the pass.</p>
                </div>
              </div>
              <Button
                variant="gold"
                size="sm"
                onClick={() => setActiveTab('ready')}
              >
                View Ready Orders
              </Button>
            </div>
          )}

          {/* Assigned Tables Grid */}
          <div className="bg-white rounded-2xl p-6 border border-[#D5BFA4]/50 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#26160E]">My Assigned Tables</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {tables.map((table) => (
                <div
                  key={table.id}
                  onClick={() => setSelectedTable(table)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedTable.id === table.id
                      ? 'border-[#6F4E37] bg-[#FAF6F0] shadow-md'
                      : 'border-[#D5BFA4]/40 hover:border-[#8E5B34] bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-bold text-lg text-[#26160E]">Table {table.number}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      table.status === 'Occupied' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {table.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#8E5B34] mt-2">Capacity: {table.capacity} Guests</p>
                  <p className="text-xs text-[#563B29] mt-1 truncate">
                    {table.currentOrder ? `Order: ${table.currentOrder}` : 'No active order'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Active Orders List */}
          <div className="bg-white rounded-2xl p-6 border border-[#D5BFA4]/50 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold text-[#26160E]">
                {activeTab === 'ready' ? 'Orders Ready to Serve' : 'Live Table Orders'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === 'ready' ? readyOrders : kitchenOrders).map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl border border-[#D5BFA4]/60 bg-[#FAF6F0] flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#6F4E37]">{order.id}</span>
                        <h4 className="font-serif font-bold text-lg text-[#26160E]">{order.table}</h4>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        order.status === 'Ready' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        order.status === 'Preparing' ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <ul className="mt-3 space-y-1.5 text-xs text-[#26160E]">
                      {order.items.map((it, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span className="font-medium">{it.qty} × {it.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-[#D5BFA4]/40 flex justify-end">
                    {order.status === 'Ready' ? (
                      <Button
                        variant="gold"
                        size="sm"
                        icon={Check}
                        onClick={() => handleServeOrder(order.id)}
                      >
                        Serve to Table
                      </Button>
                    ) : (
                      <span className="text-xs text-[#8E5B34] italic">In Kitchen Production</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

      {/* Create Order Modal */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 border border-[#D5BFA4] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#F4ECE1] pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#8E5B34]">Floor Terminal</span>
                <h3 className="font-serif text-2xl font-bold text-[#26160E]">
                  Create Order for Table {selectedTable.number}
                </h3>
              </div>
              <button
                onClick={() => setOrderModalOpen(false)}
                className="text-xs font-bold px-3 py-1 bg-[#F4ECE1] rounded-lg text-[#6F4E37]"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateOrderSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-[#8E5B34]">Select Dishes to Punch</label>
                <div className="max-h-48 overflow-y-auto space-y-2 divide-y divide-[#F4ECE1] p-3 rounded-xl border border-[#D5BFA4]/40">
                  {menuItems.slice(0, 5).map((item) => (
                    <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-[#26160E]">{item.name}</p>
                        <p className="text-[#8E5B34]">{formatCurrency(item.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedItems(prev => [...prev, { ...item, qty: 1 }]);
                        }}
                        className="px-2.5 py-1 rounded bg-[#6F4E37] text-white font-bold text-[11px]"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected List */}
              <div className="p-3 bg-[#FAF6F0] rounded-xl text-xs space-y-1">
                <p className="font-bold text-[#6F4E37]">Current Ticket Items ({selectedItems.length}):</p>
                {selectedItems.map((si, i) => (
                  <p key={i} className="text-[#26160E]">• 1 × {si.name}</p>
                ))}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-[#8E5B34]">Chef Special Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Medium rare steak, allergy to peanuts, separate sauces..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#D5BFA4]"
                ></textarea>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                icon={Send}
              >
                Send Order to Kitchen
              </Button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default WaiterPortal;
