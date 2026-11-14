import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { useAppStore, DEMO_USERS } from '../../store/store';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
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
  Check, 
  History, 
  User, 
  AlertTriangle, 
  Coffee, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  DollarSign, 
  X, 
  ChevronRight,
  Printer,
  CheckCheck
} from 'lucide-react';

export const WaiterPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { 
    tables, 
    sessions, 
    orders, 
    menuItems, 
    placeOrder, 
    updateOrderStatus, 
    updateTableStatus,
    notifications,
    currentUser,
    logout
  } = useAppStore();

  const waiterProfile = currentUser || DEMO_USERS.waiter;

  // Filter tables assigned to Julian Vance or Floor A
  const myTables = tables.filter(t => !t.waiter || t.waiter === waiterProfile.name || t.number <= 8);

  // Ready to serve orders
  const readyOrders = orders.filter(o => o.status === 'Ready to Serve' || o.status === 'Ready');
  const activeOrders = orders.filter(o => o.status !== 'Served' && o.status !== 'Cancelled');
  const servedOrders = orders.filter(o => o.status === 'Served');

  // Order taking state
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedTableNumber, setSelectedTableNumber] = useState(myTables[0]?.number || 1);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [orderNotes, setOrderNotes] = useState('');
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Table details modal
  const [viewSessionModal, setViewSessionModal] = useState(null);

  // Status Filter for Order Management
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // Navigation Links
  const navLinks = [
    { label: 'Waiter Dashboard', icon: Users, path: '#dashboard', onClick: () => setActiveTab('dashboard') },
    { label: 'My Assigned Tables', icon: Layers, path: '#tables', onClick: () => setActiveTab('tables'), badge: myTables.length },
    { label: 'Order Management', icon: UtensilsCrossed, path: '#orders', onClick: () => setActiveTab('orders'), badge: readyOrders.length > 0 ? `${readyOrders.length} Ready` : activeOrders.length },
    { label: 'Order History', icon: History, path: '#history', onClick: () => setActiveTab('history'), badge: servedOrders.length },
    { label: 'Notifications', icon: Bell, path: '#notifications', onClick: () => setActiveTab('notifications'), badge: notifications.filter(n => n.unread).length },
    { label: 'My Profile', icon: User, path: '#profile', onClick: () => setActiveTab('profile') },
  ];

  // Quick dish toggle for new order
  const handleAddDish = (item) => {
    setSelectedMenuItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1, notes: '' }];
    });
  };

  const handleUpdateItemQty = (id, delta) => {
    setSelectedMenuItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  // Submit order to shared store & KDS
  const handleCreateOrderSubmit = (e) => {
    e.preventDefault();
    if (selectedMenuItems.length === 0) {
      alert('Please add at least one dish to the order ticket.');
      return;
    }

    // Find active session for selected table
    const tableObj = tables.find(t => t.number === Number(selectedTableNumber));
    let targetSessionId = tableObj?.activeSessionId;

    if (!targetSessionId) {
      const activeSession = sessions.find(s => s.tableNumber === Number(selectedTableNumber) && s.status === 'Active');
      targetSessionId = activeSession ? activeSession.sessionId : '000001';
    }

    const orderId = placeOrder({
      sessionId: targetSessionId,
      tableNumber: Number(selectedTableNumber),
      items: selectedMenuItems.map(m => ({
        id: m.id,
        name: m.name,
        price: m.price,
        qty: m.qty,
        notes: m.notes || orderNotes
      })),
      placedBy: `Waiter (${waiterProfile.name})`,
      waiter: waiterProfile.name
    });

    // Reset form
    setSelectedMenuItems([]);
    setOrderNotes('');
    setOrderModalOpen(false);
    alert(`Order #${orderId} successfully dispatched to Kitchen Display System for Table ${selectedTableNumber}!`);
  };

  // Serve food action
  const handleMarkServed = (orderId) => {
    updateOrderStatus(orderId, 'Served');
  };

  return (
    <div className="min-h-screen bg-[#F4EDE8] flex">
      {/* Sidebar with exact Mocha Brown #873C50 */}
      <Sidebar
        title="Waiter Portal"
        subtitle="Floor Service & Orders"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={navLinks.map(l => ({
          ...l,
          path: `/waiter#${activeTab}`,
          end: activeTab === l.label.toLowerCase().split(' ')[0] || 
               (activeTab === 'dashboard' && l.label.includes('Dashboard')) ||
               (activeTab === 'tables' && l.label.includes('Tables')) ||
               (activeTab === 'orders' && l.label.includes('Orders')) ||
               (activeTab === 'history' && l.label.includes('History')) ||
               (activeTab === 'notifications' && l.label.includes('Notifications')) ||
               (activeTab === 'profile' && l.label.includes('Profile'))
        }))}
      />

      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-[#E8DDD8]/40 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#2D2528] hover:bg-[#FAF7F5]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl font-bold text-[#2D2528]">
                  Floor Service & Waiter Terminal
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#21845A]/15 text-[#21845A] border border-[#21845A]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1 animate-pulse"></span>
                  Active on Floor
                </span>
              </div>
              <p className="text-xs text-[#873C50]">
                Staff: <span className="font-semibold text-[#2D2528]">{waiterProfile.name}</span> | Assigned: Floor A (Tables 1 - 8)
              </p>
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
            <button 
              onClick={() => setActiveTab('notifications')}
              className="relative p-2.5 rounded-xl border border-[#E8DDD8]/60 bg-[#F4EDE8] text-[#873C50] hover:bg-[#FAF7F5] transition-colors"
            >
              <Bell className="w-5 h-5" />
              {readyOrders.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C8A66B] text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {readyOrders.length}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 sm:p-8 flex-1 space-y-8 max-w-7xl">
          
          {/* Urgent Food Ready Alert Banner */}
          {readyOrders.length > 0 && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#873C50] to-[#873C50] text-white shadow-xl flex flex-wrap items-center justify-between gap-4 border border-[#C8A66B]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4EDE8]/20 flex items-center justify-center animate-pulse">
                  <Bell className="w-6 h-6 text-[#C8A66B]" />
                </div>
                <div>
                  <p className="font-bold text-sm tracking-wide">
                    {readyOrders.length} Order(s) Ready for Table Delivery!
                  </p>
                  <p className="text-xs text-[#F4EDE8]">
                    Kitchen chef has plated the dishes. Please collect at pass immediately.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => {
                    setActiveTab('orders');
                    setOrderStatusFilter('Ready to Serve');
                  }}
                >
                  View & Serve Now ({readyOrders.length})
                </Button>
              </div>
            </div>
          )}

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#E8DDD8]/50 shadow-sm hover:border-[#873C50] transition-all">
                  <div className="flex justify-between items-center text-[#873C50]">
                    <span className="text-xs font-bold uppercase tracking-wider">Assigned Tables</span>
                    <Layers className="w-5 h-5 text-[#873C50]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#2D2528] mt-2">{myTables.length}</p>
                  <p className="text-xs text-[#873C50] mt-1">
                    {myTables.filter(t => t.status === 'Occupied').length} Currently Occupied
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E8DDD8]/50 shadow-sm hover:border-[#873C50] transition-all">
                  <div className="flex justify-between items-center text-[#873C50]">
                    <span className="text-xs font-bold uppercase tracking-wider">Active Orders</span>
                    <UtensilsCrossed className="w-5 h-5 text-[#873C50]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#2D2528] mt-2">{activeOrders.length}</p>
                  <p className="text-xs text-[#873C50] mt-1">In kitchen production</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E8DDD8]/50 shadow-sm hover:border-[#873C50] transition-all">
                  <div className="flex justify-between items-center text-[#873C50]">
                    <span className="text-xs font-bold uppercase tracking-wider">Ready to Serve</span>
                    <Bell className="w-5 h-5 text-[#C8A66B]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#C8A66B] mt-2">{readyOrders.length}</p>
                  <p className="text-xs text-[#873C50] mt-1">Awaiting floor delivery</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E8DDD8]/50 shadow-sm hover:border-[#873C50] transition-all">
                  <div className="flex justify-between items-center text-[#873C50]">
                    <span className="text-xs font-bold uppercase tracking-wider">Served Today</span>
                    <CheckCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-emerald-700 mt-2">{servedOrders.length}</p>
                  <p className="text-xs text-[#873C50] mt-1">Completed orders</p>
                </div>
              </div>

              {/* Quick Actions & Live Floor Map */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Active Floor Tables Snapshot */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#E8DDD8]/50 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#2D2528]">Floor A - My Section Overview</h3>
                      <p className="text-xs text-[#873C50]">Real-time occupancy & active dining sessions</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab('tables')}
                    >
                      View All Tables
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {myTables.map((t) => {
                      const activeSession = sessions.find(s => s.tableNumber === t.number && s.status === 'Active');
                      const tableOrders = orders.filter(o => o.tableNumber === t.number && o.status !== 'Served');
                      const hasReady = tableOrders.some(o => o.status === 'Ready to Serve');

                      let statusBg = 'bg-white border-[#E8DDD8]/50';
                      let statusBadge = 'bg-[#21845A]/15 text-[#21845A] border border-[#21845A]/30';

                      if (t.status === 'Occupied') {
                        statusBg = hasReady ? 'bg-amber-50 border-[#C8A66B]' : 'bg-[#F4EDE8] border-[#873C50]';
                        statusBadge = 'bg-[#873C50] text-white';
                      } else if (t.status === 'Cleaning') {
                        statusBg = 'bg-blue-50 border-blue-200';
                        statusBadge = 'bg-[#3976B8]/15 text-[#3976B8] border border-[#3976B8]/30';
                      } else if (t.status === 'Reserved') {
                        statusBg = 'bg-purple-50 border-purple-200';
                        statusBadge = 'bg-[#873C50]/15 text-[#873C50] border border-[#873C50]/30';
                      }

                      return (
                        <div
                          key={t.id}
                          className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${statusBg}`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-serif font-bold text-base text-[#2D2528]">Table {t.number}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBadge}`}>
                                {t.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#873C50]">Cap: {t.capacity} Guests</p>
                            {activeSession ? (
                              <div className="mt-2 text-[11px] space-y-0.5">
                                <p className="font-semibold text-[#2D2528] truncate">{activeSession.guestName}</p>
                                <p className="font-mono text-[#873C50] text-[10px]">Session #{activeSession.sessionId}</p>
                              </div>
                            ) : (
                              <p className="text-[11px] text-[#873C50]/70 italic mt-2">No active party</p>
                            )}
                          </div>

                          <div className="mt-3 pt-2 border-t border-[#E8DDD8]/30 flex justify-between items-center">
                            {t.status === 'Occupied' ? (
                              <button
                                onClick={() => {
                                  setSelectedTableNumber(t.number);
                                  setOrderModalOpen(true);
                                }}
                                className="text-[11px] font-bold text-[#873C50] hover:underline flex items-center gap-1"
                              >
                                <PlusCircle className="w-3.5 h-3.5" /> Order
                              </button>
                            ) : t.status === 'Cleaning' ? (
                              <button
                                onClick={() => updateTableStatus(t.number, 'Available')}
                                className="text-[11px] font-bold text-blue-700 hover:underline"
                              >
                                Done Cleaning
                              </button>
                            ) : (
                              <span className="text-[10px] text-emerald-700 font-bold">Ready to Seat</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Floor Task Checklist & Service Requests */}
                <div className="bg-white rounded-3xl p-6 border border-[#E8DDD8]/50 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-bold text-[#2D2528]">Waiter Floor Tasks</h3>
                    <Coffee className="w-5 h-5 text-[#873C50]" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-[#F4EDE8] border border-[#E8DDD8]/40 flex items-start gap-3">
                      <input type="checkbox" className="mt-1 accent-[#873C50] rounded" defaultChecked />
                      <div className="text-xs">
                        <p className="font-bold text-[#2D2528]">Pre-shift Station Prep</p>
                        <p className="text-[#873C50]">Sanitize tables 1-8, check salt & pepper grinders.</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F4EDE8] border border-[#E8DDD8]/40 flex items-start gap-3">
                      <input type="checkbox" className="mt-1 accent-[#873C50] rounded" />
                      <div className="text-xs">
                        <p className="font-bold text-[#2D2528]">Table 2 Wine Presentation</p>
                        <p className="text-[#873C50]">Deliver 2018 Bordeaux Chateau Margaux to Sophia M.</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F4EDE8] border border-[#E8DDD8]/40 flex items-start gap-3">
                      <input type="checkbox" className="mt-1 accent-[#873C50] rounded" />
                      <div className="text-xs">
                        <p className="font-bold text-[#2D2528]">Check on Table 7</p>
                        <p className="text-[#873C50]">Lamb cutlets served 10 mins ago. Ensure guest satisfaction.</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F4EDE8] border border-[#E8DDD8]/40 flex items-start gap-3">
                      <input type="checkbox" className="mt-1 accent-[#873C50] rounded" />
                      <div className="text-xs">
                        <p className="font-bold text-[#2D2528]">Reset Table 4</p>
                        <p className="text-[#873C50]">Table 4 marked Cleaning. Prepare linen for incoming reservation.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => setOrderModalOpen(true)}
                      icon={PlusCircle}
                    >
                      Take New Order
                    </Button>
                  </div>
                </div>

              </div>

              {/* Ready Orders Urgent Section */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8DDD8]/50 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#2D2528]">
                      Live Kitchen Pass – Ready to Serve ({readyOrders.length})
                    </h3>
                    <p className="text-xs text-[#873C50]">Dishes waiting for waiter pickup and presentation</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setActiveTab('orders')}
                  >
                    View Order Details
                  </Button>
                </div>

                {readyOrders.length === 0 ? (
                  <div className="text-center py-8 text-[#873C50] text-xs">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2 opacity-50" />
                    All prepared dishes have been served to guests. No orders currently waiting at the pass.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {readyOrders.map(order => (
                      <div 
                        key={order.id} 
                        className="p-5 rounded-2xl border-2 border-[#C8A66B] bg-[#F4EDE8] shadow-md flex flex-col justify-between space-y-4 animate-pulse"
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-mono font-bold bg-[#873C50] text-white px-2 py-0.5 rounded">
                                {order.id}
                              </span>
                              <h4 className="font-serif font-bold text-lg text-[#2D2528] mt-1">
                                Table {order.tableNumber}
                              </h4>
                            </div>
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#21845A]/15 text-[#21845A] border border-[#21845A]/30 border border-emerald-300">
                              READY FOR PICKUP
                            </span>
                          </div>

                          <div className="mt-3 text-xs space-y-1">
                            <p className="font-mono text-[#873C50]">Session: #{order.sessionId}</p>
                            <p className="text-[#2D2528] font-medium">Items to Serve:</p>
                            <ul className="space-y-1 pl-2">
                              {order.items.map((it, idx) => (
                                <li key={idx} className="font-semibold text-[#2D2528]">
                                  • {it.qty} × {it.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <Button
                          variant="gold"
                          size="sm"
                          icon={Check}
                          onClick={() => handleMarkServed(order.id)}
                          className="w-full shadow-md"
                        >
                          Confirm Pickup & Mark Served
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: MY ASSIGNED TABLES */}
          {activeTab === 'tables' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#E8DDD8]/50 shadow-sm">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2D2528]">My Assigned Tables (Floor A)</h3>
                  <p className="text-xs text-[#873C50]">
                    Monitor real-time table statuses, dining duration, and 6-digit session links
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    icon={PlusCircle}
                    onClick={() => setOrderModalOpen(true)}
                  >
                    Take Order for Table
                  </Button>
                </div>
              </div>

              {/* Grid of Tables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myTables.map((table) => {
                  const activeSession = sessions.find(s => s.tableNumber === table.number && s.status === 'Active');
                  const tableOrders = orders.filter(o => o.tableNumber === table.number && o.status !== 'Served');

                  return (
                    <div 
                      key={table.id}
                      className="bg-white rounded-3xl p-6 border border-[#E8DDD8]/50 shadow-sm flex flex-col justify-between hover:border-[#873C50] transition-all"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-mono font-bold text-[#873C50]">T-0{table.number}</span>
                            <h4 className="font-serif text-2xl font-bold text-[#2D2528]">
                              Table {table.number}
                            </h4>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            table.status === 'Occupied' ? 'bg-[#873C50] text-white' :
                            table.status === 'Reserved' ? 'bg-[#873C50]/15 text-[#873C50] border border-[#873C50]/30' :
                            table.status === 'Cleaning' ? 'bg-[#3976B8]/15 text-[#3976B8] border border-[#3976B8]/30' :
                            'bg-[#21845A]/15 text-[#21845A] border border-[#21845A]/30'
                          }`}>
                            {table.status}
                          </span>
                        </div>

                        {/* Specs */}
                        <div className="mt-4 pt-3 border-t border-[#FAF7F5] space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-[#873C50]">Capacity:</span>
                            <span className="font-bold text-[#2D2528]">{table.capacity} Guests</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#873C50]">Assigned Waiter:</span>
                            <span className="font-semibold text-[#873C50]">{table.waiter || waiterProfile.name}</span>
                          </div>

                          {activeSession ? (
                            <div className="p-3 rounded-xl bg-[#F4EDE8] border border-[#E8DDD8]/40 space-y-1.5 mt-2">
                              <div className="flex justify-between items-center">
                                <span className="text-[#873C50] text-[11px]">Daily Session:</span>
                                <span className="font-mono font-bold text-[#873C50] bg-white px-1.5 py-0.5 rounded border border-[#E8DDD8]/40 text-[11px]">
                                  #{activeSession.sessionId}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#873C50] text-[11px]">Guest:</span>
                                <span className="font-bold text-[#2D2528] truncate max-w-[120px]">{activeSession.guestName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#873C50] text-[11px]">Seated At:</span>
                                <span className="font-medium text-[#2D2528]">{activeSession.checkInTime || '19:15'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#873C50] text-[11px]">Current Total:</span>
                                <span className="font-bold text-[#873C50]">{formatCurrency(activeSession.total || 0)}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 rounded-xl bg-[#F4EDE8]/50 text-center text-[#873C50] text-xs mt-2">
                              No active dining session
                            </div>
                          )}

                          {tableOrders.length > 0 && (
                            <div className="text-[11px] text-[#C8A66B] font-bold flex items-center gap-1 mt-1">
                              <Clock className="w-3.5 h-3.5" /> {tableOrders.length} active order(s) in kitchen
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 pt-3 border-t border-[#FAF7F5] flex gap-2">
                        {table.status === 'Occupied' ? (
                          <>
                            <Button
                              variant="primary"
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                setSelectedTableNumber(table.number);
                                setOrderModalOpen(true);
                              }}
                            >
                              + Punch Order
                            </Button>
                            {activeSession && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setViewSessionModal(activeSession)}
                              >
                                View Bill
                              </Button>
                            )}
                          </>
                        ) : table.status === 'Cleaning' ? (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full"
                            onClick={() => updateTableStatus(table.number, 'Available')}
                          >
                            Mark Cleaning Complete
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-emerald-800 border-emerald-300"
                            onClick={() => {
                              setSelectedTableNumber(table.number);
                              setOrderModalOpen(true);
                            }}
                          >
                            Seat & Take Order
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ORDER MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#E8DDD8]/50 shadow-sm">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2D2528]">Order Management & Kitchen Status</h3>
                  <p className="text-xs text-[#873C50]">
                    Real-time status tracking: New → Accepted → Preparing → Ready to Serve → Served
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {['All', 'Ready to Serve', 'Preparing', 'Accepted', 'New'].map(st => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        orderStatusFilter === st
                          ? 'bg-[#873C50] text-white shadow-sm'
                          : 'bg-[#FAF7F5] text-[#2D2528] hover:bg-[#E8DDD8]/50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                  <Button
                    variant="primary"
                    size="sm"
                    icon={PlusCircle}
                    onClick={() => setOrderModalOpen(true)}
                  >
                    Take New Order
                  </Button>
                </div>
              </div>

              {/* Filtered Orders List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders
                  .filter(o => orderStatusFilter === 'All' ? true : o.status === orderStatusFilter)
                  .map((order) => {
                    const isReady = order.status === 'Ready to Serve' || order.status === 'Ready';
                    const isServed = order.status === 'Served';

                    return (
                      <div
                        key={order.id}
                        className={`rounded-3xl p-6 border-2 flex flex-col justify-between space-y-4 shadow-sm transition-all ${
                          isReady ? 'bg-amber-50/60 border-[#C8A66B]' :
                          isServed ? 'bg-white border-[#E8DDD8]/40 opacity-80' :
                          'bg-white border-[#E8DDD8]/60'
                        }`}
                      >
                        <div>
                          {/* Order Card Header */}
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-[#873C50] bg-[#F4EDE8] px-2 py-0.5 rounded border border-[#E8DDD8]/50">
                                  {order.id}
                                </span>
                                <span className="font-mono text-[10px] text-[#873C50]">
                                  {order.kotId}
                                </span>
                              </div>
                              <h4 className="font-serif font-bold text-xl text-[#2D2528] mt-1">
                                Table {order.tableNumber}
                              </h4>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              isReady ? 'bg-[#21845A]/15 text-[#21845A] border border-[#21845A]/30 border border-emerald-300 animate-pulse' :
                              order.status === 'Preparing' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                              order.status === 'Accepted' ? 'bg-[#3976B8]/15 text-[#3976B8] border border-[#3976B8]/30' :
                              isServed ? 'bg-gray-100 text-gray-700' :
                              'bg-[#B7791F]/15 text-[#B7791F] border border-[#B7791F]/30'
                            }`}>
                              {order.status}
                            </span>
                          </div>

                          {/* Metadata */}
                          <div className="mt-3 flex items-center justify-between text-xs text-[#873C50] border-b border-[#FAF7F5] pb-2">
                            <span>Session: <strong className="text-[#2D2528]">#{order.sessionId}</strong></span>
                            <span>Time: <strong className="text-[#2D2528]">{order.time || '10 mins ago'}</strong></span>
                          </div>

                          {/* Order Items */}
                          <div className="mt-3 space-y-2 text-xs">
                            <p className="font-bold text-[#873C50] uppercase tracking-wider text-[10px]">Ordered Items:</p>
                            <ul className="space-y-1.5 divide-y divide-[#FAF7F5]">
                              {order.items.map((item, idx) => (
                                <li key={idx} className="pt-1.5 first:pt-0 flex justify-between items-center">
                                  <div>
                                    <span className="font-bold text-[#2D2528]">{item.qty} × {item.name}</span>
                                    {item.notes && (
                                      <p className="text-[10px] text-[#873C50] italic">Note: {item.notes}</p>
                                    )}
                                  </div>
                                  <span className="font-mono text-[#873C50]">{formatCurrency(item.price * item.qty)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Order Actions */}
                        <div className="pt-4 border-t border-[#FAF7F5]">
                          {isReady ? (
                            <Button
                              variant="gold"
                              size="md"
                              className="w-full shadow-lg"
                              icon={Check}
                              onClick={() => handleMarkServed(order.id)}
                            >
                              Confirm Pickup & Serve
                            </Button>
                          ) : isServed ? (
                            <div className="flex items-center justify-center gap-1 text-xs font-bold text-emerald-700 py-1">
                              <CheckCheck className="w-4 h-4" /> Served to Table
                            </div>
                          ) : (
                            <div className="flex items-center justify-between text-xs text-[#873C50]">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-orange-600 animate-spin" /> In Preparation
                              </span>
                              <span className="font-medium text-[#2D2528]">{order.placedBy || 'Julian Vance'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB 4: ORDER HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#E8DDD8]/50 shadow-sm">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2D2528]">Order History & Table Logs</h3>
                  <p className="text-xs text-[#873C50]">Past served orders, table-wise and session-wise historical logs</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 bg-[#F4EDE8] rounded-xl border border-[#E8DDD8] text-[#873C50]">
                    Total Orders: {orders.length}
                  </span>
                </div>
              </div>

              {/* Table of Orders */}
              <div className="bg-white rounded-3xl border border-[#E8DDD8]/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#2D2528]">
                    <thead className="bg-[#F4EDE8] text-[#873C50] font-bold uppercase tracking-wider border-b border-[#E8DDD8]/50">
                      <tr>
                        <th className="py-4 px-6">Order / KOT</th>
                        <th className="py-4 px-6">Table & Session</th>
                        <th className="py-4 px-6">Items Summary</th>
                        <th className="py-4 px-6">Timestamp</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#FAF7F5]">
                      {orders.map((ord) => {
                        const total = ord.items.reduce((s, it) => s + (it.price * it.qty), 0);
                        return (
                          <tr key={ord.id} className="hover:bg-[#F4EDE8]/60 transition-colors">
                            <td className="py-4 px-6 font-mono font-bold text-[#873C50]">
                              <div>{ord.id}</div>
                              <span className="text-[10px] text-[#873C50]">{ord.kotId}</span>
                            </td>
                            <td className="py-4 px-6">
                              <p className="font-bold text-[#2D2528]">Table {ord.tableNumber}</p>
                              <p className="font-mono text-[10px] text-[#873C50]">Session #{ord.sessionId}</p>
                            </td>
                            <td className="py-4 px-6">
                              <p className="font-semibold text-[#2D2528]">
                                {ord.items.map(i => `${i.qty}× ${i.name}`).join(', ')}
                              </p>
                              <p className="text-[10px] text-[#873C50]">Punched by {ord.placedBy}</p>
                            </td>
                            <td className="py-4 px-6 text-[#75696B]">
                              {ord.time || 'Today'}
                            </td>
                            <td className="py-4 px-6">
                              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                ord.status === 'Served' ? 'bg-[#21845A]/15 text-[#21845A] border border-[#21845A]/30' :
                                ord.status === 'Ready to Serve' ? 'bg-[#B7791F]/15 text-[#B7791F] border border-[#B7791F]/30' :
                                'bg-[#3976B8]/15 text-[#3976B8] border border-[#3976B8]/30'
                              }`}>
                                {ord.status}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right font-mono font-bold text-[#2D2528]">
                              {formatCurrency(total)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-[#E8DDD8]/50 shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2D2528]">Floor Alerts & Service Requests</h3>
                  <p className="text-xs text-[#873C50]">Real-time table calls, ready dish pings, and kitchen updates</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => alert('All alerts marked as viewed.')}>
                  Mark All Read
                </Button>
              </div>

              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                      notif.unread
                        ? 'bg-white border-[#873C50] shadow-md'
                        : 'bg-[#F4EDE8] border-[#E8DDD8]/40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF7F5] text-[#873C50] flex items-center justify-center shrink-0">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#2D2528]">{notif.title}</h4>
                          {notif.unread && (
                            <span className="w-2 h-2 rounded-full bg-[#873C50]"></span>
                          )}
                        </div>
                        <p className="text-xs text-[#75696B] mt-1">{notif.message}</p>
                        <p className="text-[10px] text-[#873C50] mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {notif.time}
                        </p>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm">
                      Dismiss
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MY PROFILE */}
          {activeTab === 'profile' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-[#E8DDD8]/50 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#FAF7F5]">
                  <img
                    src={waiterProfile.avatar}
                    alt={waiterProfile.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#873C50] shadow-lg"
                  />
                  <div className="text-center sm:text-left space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#873C50]">Floor Service Specialist</span>
                    <h3 className="font-serif text-3xl font-bold text-[#2D2528]">{waiterProfile.name}</h3>
                    <p className="text-sm text-[#75696B]">{waiterProfile.email} | {waiterProfile.phone}</p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF7F5] text-[#873C50]">
                        Section: Floor A (Tables 1 - 8)
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#21845A]/15 text-[#21845A] border border-[#21845A]/30">
                        Shift: Evening Service (16:00 - 00:00)
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B7791F]/15 text-[#B7791F] border border-[#B7791F]/30">
                        Rating: ★ 4.95 / 5.0
                      </span>
                    </div>
                  </div>
                </div>

                {/* Account Details & Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-4">
                    <h4 className="font-serif text-lg font-bold text-[#2D2528]">Service Information</h4>
                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-xl bg-[#F4EDE8] flex justify-between">
                        <span className="text-[#873C50]">Employee ID:</span>
                        <span className="font-mono font-bold text-[#2D2528]">EMP-WTR-8921</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F4EDE8] flex justify-between">
                        <span className="text-[#873C50]">Joined Aura Mocha:</span>
                        <span className="font-bold text-[#2D2528]">March 2023</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F4EDE8] flex justify-between">
                        <span className="text-[#873C50]">POS Terminal Privileges:</span>
                        <span className="font-bold text-emerald-700">Full Table Dispatch</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-serif text-lg font-bold text-[#2D2528]">Security & Credentials</h4>
                    <form onSubmit={(e) => { e.preventDefault(); alert('Password updated successfully.'); }} className="space-y-3">
                      <Input
                        label="New Password"
                        type="password"
                        placeholder="••••••••"
                      />
                      <Button variant="primary" size="sm" type="submit" className="w-full">
                        Update Password
                      </Button>
                    </form>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#FAF7F5] flex justify-between items-center">
                  <p className="text-xs text-[#873C50]">Logged in with authorized staff credentials</p>
                  <Button variant="ghost" className="text-red-700" onClick={logout}>
                    Sign Out of Terminal
                  </Button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* TAKE NEW ORDER MODAL */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#E8DDD8] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-[#FAF7F5] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#873C50]">Floor POS Terminal</span>
                <h3 className="font-serif text-2xl font-bold text-[#2D2528]">
                  Punch Order for Table {selectedTableNumber}
                </h3>
              </div>
              <button
                onClick={() => setOrderModalOpen(false)}
                className="p-2 rounded-xl bg-[#FAF7F5] text-[#873C50] hover:bg-[#E8DDD8]/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrderSubmit} className="space-y-6">
              
              {/* Select Table Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-[#873C50] block mb-1">Target Table</label>
                  <select
                    value={selectedTableNumber}
                    onChange={(e) => setSelectedTableNumber(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-[#E8DDD8] bg-white text-xs font-bold text-[#2D2528] focus:ring-2 focus:ring-[#873C50]"
                  >
                    {tables.map(t => (
                      <option key={t.id} value={t.number}>
                        Table {t.number} ({t.status}) {t.activeSessionId ? `[Session #${t.activeSessionId}]` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[#873C50] block mb-1">Search Dishes</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3.5 text-[#873C50]" />
                    <input
                      type="text"
                      placeholder="Search menu catalog..."
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      className="w-full pl-9 p-2.5 rounded-xl border border-[#E8DDD8] text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Dish Selection Grid */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-[#873C50] block">Available Menu Dishes</label>
                <div className="max-h-56 overflow-y-auto space-y-2 divide-y divide-[#FAF7F5] p-3 rounded-2xl border border-[#E8DDD8]/40 bg-[#F4EDE8]/50">
                  {menuItems
                    .filter(m => m.name.toLowerCase().includes(menuSearch.toLowerCase()))
                    .slice(0, 10)
                    .map((item) => (
                      <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-bold text-[#2D2528]">{item.name}</p>
                            <p className="text-[#873C50]">{formatCurrency(item.price)} • {item.category}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddDish(item)}
                          className="px-3 py-1.5 rounded-xl bg-[#873C50] text-white font-bold text-xs hover:bg-[#75696B] transition-colors"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Selected Items Ticket */}
              <div className="p-4 bg-[#F4EDE8] rounded-2xl border border-[#E8DDD8]/60 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-[#873C50] uppercase tracking-wider">
                    Current Order Ticket ({selectedMenuItems.length} dishes)
                  </span>
                  <span className="font-mono font-bold text-sm text-[#2D2528]">
                    Ticket Subtotal: {formatCurrency(
                      selectedMenuItems.reduce((s, it) => s + (it.price * it.qty), 0)
                    )}
                  </span>
                </div>

                {selectedMenuItems.length === 0 ? (
                  <p className="text-xs text-[#873C50] italic">No dishes added yet. Click "+ Add" above.</p>
                ) : (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedMenuItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-xs bg-white p-2.5 rounded-xl border border-[#E8DDD8]/40">
                        <span className="font-bold text-[#2D2528]">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateItemQty(item.id, -1)}
                            className="w-6 h-6 rounded bg-[#FAF7F5] font-bold text-[#873C50] flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="font-mono font-bold w-4 text-center">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateItemQty(item.id, 1)}
                            className="w-6 h-6 rounded bg-[#FAF7F5] font-bold text-[#873C50] flex items-center justify-center"
                          >
                            +
                          </button>
                          <span className="font-mono font-bold text-[#873C50] ml-2">
                            {formatCurrency(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Chef Notes / Allergies */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-[#873C50]">Chef Preparation Notes / Allergies</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Medium rare, nut allergy, dressing on the side..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#E8DDD8] focus:ring-2 focus:ring-[#873C50]"
                ></textarea>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full shadow-xl"
                icon={Send}
              >
                Send Ticket Directly to Kitchen (KDS)
              </Button>
            </form>

          </div>
        </div>
      )}

      {/* VIEW SESSION BILL MODAL */}
      {viewSessionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 border border-[#E8DDD8] shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#FAF7F5] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#873C50]">Dining Session Bill</span>
                <h3 className="font-serif text-2xl font-bold text-[#2D2528]">
                  Table {viewSessionModal.tableNumber}
                </h3>
              </div>
              <button
                onClick={() => setViewSessionModal(null)}
                className="p-2 rounded-xl bg-[#FAF7F5] text-[#873C50]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#873C50]">Daily 6-Digit Session:</span>
                <span className="font-mono font-bold text-[#873C50]">#{viewSessionModal.sessionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#873C50]">Guest Name:</span>
                <span className="font-bold text-[#2D2528]">{viewSessionModal.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#873C50]">Seated At:</span>
                <span className="text-[#2D2528]">{viewSessionModal.checkInTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#873C50]">Assigned Waiter:</span>
                <span className="text-[#2D2528]">{viewSessionModal.waiter}</span>
              </div>

              <div className="pt-3 border-t border-[#FAF7F5] space-y-1.5">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold">{formatCurrency(viewSessionModal.subtotal || 0)}</span>
                </div>
                <div className="flex justify-between text-[#873C50]">
                  <span>Tax (9%):</span>
                  <span className="font-mono">{formatCurrency(viewSessionModal.tax || 0)}</span>
                </div>
                <div className="flex justify-between text-[#873C50]">
                  <span>Service Charge (10%):</span>
                  <span className="font-mono">{formatCurrency(viewSessionModal.serviceCharge || 0)}</span>
                </div>
                {viewSessionModal.advancePayment > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Advance Booking Deposit:</span>
                    <span className="font-mono">-{formatCurrency(viewSessionModal.advancePayment)}</span>
                  </div>
                )}
                <div className="flex justify-between font-serif text-base font-bold text-[#2D2528] pt-2 border-t border-[#FAF7F5]">
                  <span>Total Due:</span>
                  <span className="text-[#873C50]">{formatCurrency(viewSessionModal.total || 0)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                icon={Printer}
                onClick={() => alert(`Printing table bill for Table ${viewSessionModal.tableNumber}...`)}
              >
                Print Check
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => setViewSessionModal(null)}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default WaiterPortal;