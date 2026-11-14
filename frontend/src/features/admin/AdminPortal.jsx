import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { useAppStore } from '../../store/store';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { ROLE_PERMISSIONS, ROLES, ROLE_LABELS } from '../../utils/constants';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  BookOpen, 
  Users, 
  Boxes, 
  CreditCard, 
  Tag, 
  Star, 
  BarChart3, 
  ShieldCheck, 
  User, 
  Plus, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Menu, 
  DollarSign, 
  Clock, 
  Layers, 
  AlertTriangle, 
  Filter, 
  Download, 
  FileText, 
  Edit3, 
  Eye, 
  X, 
  Check, 
  TrendingUp, 
  UserPlus 
} from 'lucide-react';

export const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Centralized Store Data
  const { 
    currentUser, 
    tables, 
    sessions, 
    bookings, 
    orders, 
    menuItems, 
    setMenuItems, 
    inventory, 
    updateInventoryStock, 
    offers, 
    setOffers, 
    reviews, 
    complaints, 
    resolveComplaint 
  } = useAppStore();

  // Local state for modals and forms
  const [selectedSubTab, setSelectedSubTab] = useState('orders'); // for Order & Restaurant Mgmt
  const [staffSubTab, setStaffSubTab] = useState('all');
  const [reportMetric, setReportMetric] = useState('sales');

  // Staff State
  const [staffList, setStaffList] = useState([
    { id: 1, name: "Arthur Pendelton", role: ROLES.ADMIN, email: "admin@auramocha.com", phone: "+1 555-800-4499", shift: "Executive", status: "Active" },
    { id: 2, name: "Harrison Blake", role: ROLES.MANAGER, email: "manager@auramocha.com", phone: "+1 555-300-8800", shift: "Day/Evening", status: "Active" },
    { id: 3, name: "Marco Pierre", role: ROLES.KITCHEN, email: "kitchen@auramocha.com", phone: "+1 555-777-2211", shift: "Evening Shift", status: "Active" },
    { id: 4, name: "Elena Rostova", role: ROLES.RECEPTIONIST, email: "reception@auramocha.com", phone: "+1 555-444-1234", shift: "Dinner Shift", status: "Active" },
    { id: 5, name: "Julian Vance", role: ROLES.WAITER, email: "waiter@auramocha.com", phone: "+1 555-666-8921", shift: "Floor A Shift", status: "Active" },
    { id: 6, name: "Lucas Vance", role: ROLES.WAITER, email: "lucas@auramocha.com", phone: "+1 555-666-8922", shift: "Floor B Shift", status: "Active" },
  ]);

  // Modals
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '', category: 'Mains', price: '', description: '', signature: false, allergens: ''
  });

  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    code: '', title: '', discountPercent: 15, validUntil: '2026-12-31', minSpend: 100
  });

  const [staffModalOpen, setStaffModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '', email: '', phone: '', role: ROLES.WAITER, shift: 'Morning Shift'
  });

  // Calculate High-level Dashboard KPIs
  const totalRevenue = sessions.reduce((acc, s) => acc + (s.total || 0), 0) + 14850; // shift baseline
  const activeDiningSessions = sessions.filter(s => s.status === 'Active').length;
  const occupiedTables = tables.filter(t => t.status === 'Occupied').length;
  const lowStockCount = inventory.filter(i => i.status === 'Low Stock').length;
  const pendingOrders = orders.filter(o => o.status === 'New' || o.status === 'Preparing').length;

  // Sidebar Links Structure according to Specification
  const navLinks = [
    { label: '1. Dashboard', icon: LayoutDashboard, tabId: 'dashboard' },
    { label: '2. Order & Restaurant', icon: UtensilsCrossed, tabId: 'orders-mgmt', badge: orders.length },
    { label: '3. Menu Management', icon: BookOpen, tabId: 'menu-mgmt', badge: menuItems.length },
    { label: '4. Staff Management', icon: Users, tabId: 'staff-mgmt', badge: staffList.length },
    { label: '5. Inventory & Stock', icon: Boxes, tabId: 'inventory-mgmt', badge: lowStockCount },
    { label: '6. Payments & Billing', icon: CreditCard, tabId: 'billing-mgmt' },
    { label: '7. Offers & Discounts', icon: Tag, tabId: 'offers-mgmt', badge: offers.length },
    { label: '8. Reviews & Feedback', icon: Star, tabId: 'reviews-mgmt', badge: complaints.filter(c => c.status === 'Open').length },
    { label: '9. Reports & Analytics', icon: BarChart3, tabId: 'reports-mgmt' },
    { label: '10. Roles & Permissions', icon: ShieldCheck, tabId: 'roles-mgmt' },
    { label: '11. My Profile', icon: User, tabId: 'profile-mgmt' },
  ];

  // Handlers
  const handleAddMenuItem = (e) => {
    e.preventDefault();
    if (!newMenuItem.name || !newMenuItem.price) return;
    const item = {
      id: Date.now(),
      name: newMenuItem.name,
      category: newMenuItem.category,
      price: parseFloat(newMenuItem.price),
      description: newMenuItem.description,
      signature: newMenuItem.signature,
      available: true,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      allergens: newMenuItem.allergens.split(',').map(s => s.trim()).filter(Boolean),
      tags: [newMenuItem.category]
    };
    setMenuItems(prev => [item, ...prev]);
    setMenuModalOpen(false);
    setNewMenuItem({ name: '', category: 'Mains', price: '', description: '', signature: false, allergens: '' });
  };

  const handleAddOffer = (e) => {
    e.preventDefault();
    if (!newOffer.code) return;
    const offer = {
      id: "OFF-" + Date.now(),
      code: newOffer.code.toUpperCase(),
      title: newOffer.title,
      discountPercent: Number(newOffer.discountPercent),
      validUntil: newOffer.validUntil,
      minSpend: Number(newOffer.minSpend),
      usageCount: 0,
      active: true
    };
    setOffers(prev => [offer, ...prev]);
    setOfferModalOpen(false);
    setNewOffer({ code: '', title: '', discountPercent: 15, validUntil: '2026-12-31', minSpend: 100 });
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) return;
    const staff = {
      id: Date.now(),
      ...newStaff,
      status: "Active"
    };
    setStaffList(prev => [...prev, staff]);
    setStaffModalOpen(false);
    setNewStaff({ name: '', email: '', phone: '', role: ROLES.WAITER, shift: 'Morning Shift' });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex">
      {/* Sidebar with Mocha Brown #6F4E37 */}
      <Sidebar
        title="Admin Portal"
        subtitle="Executive Control"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={navLinks}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-[#D5BFA4]/40 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#3E271A] hover:bg-[#F4ECE1]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#26160E] capitalize">
                Admin: {navLinks.find(l => l.tabId === activeTab)?.label.replace(/^\d+\.\s*/, '')}
              </h2>
              <p className="text-xs text-[#8E5B34]">Centralized Multi-Portal Administration & Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[#FAF6F0] px-3 py-1.5 rounded-xl border border-[#D5BFA4]/50 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-semibold text-[#6F4E37]">Live Sync Active</span>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <main className="p-6 sm:p-8 flex-1 space-y-8">
          
          {/* ========================================================
              1. DASHBOARD
             ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Primary Stat Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <div className="flex justify-between items-center text-[#8E5B34] text-xs uppercase font-bold">
                    <span>Total Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#26160E] mt-2">{formatCurrency(totalRevenue)}</p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">↑ +14.2% vs last week</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <div className="flex justify-between items-center text-[#8E5B34] text-xs uppercase font-bold">
                    <span>Active Dining Sessions</span>
                    <Layers className="w-4 h-4 text-[#6F4E37]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#6F4E37] mt-2">{activeDiningSessions}</p>
                  <p className="text-xs text-[#563B29] mt-1">{occupiedTables} tables currently occupied</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <div className="flex justify-between items-center text-[#8E5B34] text-xs uppercase font-bold">
                    <span>Active Orders / KOT</span>
                    <UtensilsCrossed className="w-4 h-4 text-[#C89B4A]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#26160E] mt-2">{orders.length}</p>
                  <p className="text-xs text-amber-700 font-semibold mt-1">{pendingOrders} pending in kitchen</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <div className="flex justify-between items-center text-[#8E5B34] text-xs uppercase font-bold">
                    <span>Table Occupancy</span>
                    <Clock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#26160E] mt-2">
                    {Math.round((occupiedTables / tables.length) * 100)}%
                  </p>
                  <p className="text-xs text-[#563B29] mt-1">{tables.length - occupiedTables} tables available/cleaning</p>
                </div>
              </div>

              {/* Secondary Operational Quick Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#D5BFA4]/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#8E5B34] uppercase font-bold">Confirmed Reservations</p>
                    <p className="font-serif text-2xl font-bold text-[#26160E] mt-1">{bookings.length}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('orders-mgmt')}>View</Button>
                </div>

                <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#D5BFA4]/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#8E5B34] uppercase font-bold">Low-Stock Alerts</p>
                    <p className="font-serif text-2xl font-bold text-red-700 mt-1">{lowStockCount} items</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('inventory-mgmt')}>Audit</Button>
                </div>

                <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#D5BFA4]/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#8E5B34] uppercase font-bold">Customer Complaints</p>
                    <p className="font-serif text-2xl font-bold text-amber-700 mt-1">
                      {complaints.filter(c => c.status === 'Open').length} open
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('reviews-mgmt')}>Resolve</Button>
                </div>
              </div>

              {/* Active Dining Sessions Table */}
              <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#26160E]">Active Dining Sessions Overview</h3>
                    <p className="text-xs text-[#563B29]">Daily 6-digit session IDs, live table links, and pending payments.</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                    {sessions.length} Registered Sessions
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                        <th className="py-3 px-2">Session ID</th>
                        <th className="py-3 px-2">Table</th>
                        <th className="py-3 px-2">Guest Name</th>
                        <th className="py-3 px-2">Party</th>
                        <th className="py-3 px-2">Check-In</th>
                        <th className="py-3 px-2">Orders Bill</th>
                        <th className="py-3 px-2">Advance</th>
                        <th className="py-3 px-2">Payment</th>
                        <th className="py-3 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4ECE1]">
                      {sessions.map((s) => (
                        <tr key={s.sessionId} className="hover:bg-[#FAF6F0]">
                          <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">{s.sessionId}</td>
                          <td className="py-3 px-2 font-bold text-[#26160E]">Table {s.tableNumber}</td>
                          <td className="py-3 px-2">{s.guestName}</td>
                          <td className="py-3 px-2">{s.partySize}p</td>
                          <td className="py-3 px-2 text-xs text-[#563B29]">{s.checkInTime}</td>
                          <td className="py-3 px-2 font-mono font-bold text-[#26160E]">{formatCurrency(s.subtotal)}</td>
                          <td className="py-3 px-2 font-mono text-emerald-700">-{formatCurrency(s.advancePayment)}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              s.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {s.paymentStatus}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F4ECE1] text-[#6F4E37]">
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              2. ORDER & RESTAURANT MANAGEMENT
             ======================================================== */}
          {activeTab === 'orders-mgmt' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#F4ECE1] pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Order & Restaurant Operations</h3>
                  <p className="text-xs text-[#563B29]">Master management across all orders, physical tables, and reservations.</p>
                </div>
                {/* Sub tabs */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedSubTab('orders')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedSubTab === 'orders' ? 'bg-[#6F4E37] text-white' : 'bg-[#FAF6F0] text-[#563B29]'
                    }`}
                  >
                    All Orders ({orders.length})
                  </button>
                  <button
                    onClick={() => setSelectedSubTab('tables')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedSubTab === 'tables' ? 'bg-[#6F4E37] text-white' : 'bg-[#FAF6F0] text-[#563B29]'
                    }`}
                  >
                    Tables ({tables.length})
                  </button>
                  <button
                    onClick={() => setSelectedSubTab('reservations')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedSubTab === 'reservations' ? 'bg-[#6F4E37] text-white' : 'bg-[#FAF6F0] text-[#563B29]'
                    }`}
                  >
                    Reservations ({bookings.length})
                  </button>
                </div>
              </div>

              {/* Subtab 1: Orders */}
              {selectedSubTab === 'orders' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                        <th className="py-3 px-2">Order ID</th>
                        <th className="py-3 px-2">Session ID</th>
                        <th className="py-3 px-2">Table</th>
                        <th className="py-3 px-2">Items</th>
                        <th className="py-3 px-2">Placed By</th>
                        <th className="py-3 px-2">Time</th>
                        <th className="py-3 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4ECE1]">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#FAF6F0]">
                          <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">{ord.id}</td>
                          <td className="py-3 px-2 font-mono font-bold text-[#26160E]">{ord.sessionId}</td>
                          <td className="py-3 px-2 font-bold text-[#26160E]">Table {ord.tableNumber}</td>
                          <td className="py-3 px-2">
                            <span className="text-xs text-[#563B29]">
                              {ord.items.map(it => `${it.qty}x ${it.name}`).join(', ')}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-xs text-[#8E5B34]">{ord.placedBy}</td>
                          <td className="py-3 px-2 text-xs">{ord.time}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              ord.status === 'Ready to Serve' ? 'bg-emerald-100 text-emerald-800' :
                              ord.status === 'Preparing' ? 'bg-orange-100 text-orange-800' :
                              ord.status === 'Served' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Subtab 2: Tables */}
              {selectedSubTab === 'tables' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tables.map((t) => (
                    <div key={t.id} className="p-4 rounded-xl border border-[#D5BFA4]/60 bg-[#FAF6F0] space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-bold text-base text-[#26160E]">Table {t.number}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          t.status === 'Occupied' ? 'bg-red-100 text-red-800' :
                          t.status === 'Reserved' ? 'bg-amber-100 text-amber-800' :
                          t.status === 'Cleaning' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#8E5B34]">Section: {t.section} • Capacity: {t.capacity}p</p>
                      <p className="text-xs text-[#563B29]">Session: {t.activeSessionId ? `#${t.activeSessionId}` : 'None'}</p>
                      <p className="text-xs text-[#563B29]">Server: {t.waiter}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Subtab 3: Reservations */}
              {selectedSubTab === 'reservations' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                        <th className="py-3 px-2">Booking ID</th>
                        <th className="py-3 px-2">Guest</th>
                        <th className="py-3 px-2">Contact</th>
                        <th className="py-3 px-2">Date & Time</th>
                        <th className="py-3 px-2">Party</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2">Advance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4ECE1]">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-[#FAF6F0]">
                          <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">{b.id}</td>
                          <td className="py-3 px-2 font-bold text-[#26160E]">{b.customerName}</td>
                          <td className="py-3 px-2 text-[#563B29]">{b.contactNumber}</td>
                          <td className="py-3 px-2">{formatDate(b.date)} at {b.time}</td>
                          <td className="py-3 px-2">{b.guests}</td>
                          <td className="py-3 px-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                              {b.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 font-mono text-emerald-700">{formatCurrency(b.advancePaid || 50)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              3. MENU MANAGEMENT
             ======================================================== */}
          {activeTab === 'menu-mgmt' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Master Menu & Recipe Catalog</h3>
                  <p className="text-xs text-[#563B29]">Manage categories, prices, food availability status, and add-on options.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus} onClick={() => setMenuModalOpen(true)}>
                  Add New Food Item
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl border border-[#D5BFA4]/50 bg-[#FAF6F0] flex flex-col justify-between space-y-3">
                    <div className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-bold text-sm text-[#26160E]">{item.name}</h4>
                        </div>
                        <p className="font-mono font-bold text-sm text-[#6F4E37]">{formatCurrency(item.price)}</p>
                        <span className="inline-block text-[10px] uppercase font-bold text-[#8E5B34] bg-white px-2 py-0.5 rounded border border-[#D5BFA4]/40">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[#563B29] line-clamp-2">{item.description}</p>
                    
                    {/* Controls */}
                    <div className="pt-2 border-t border-[#D5BFA4]/30 flex justify-between items-center text-xs">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        item.available ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.available ? 'Available' : 'Out of Stock'}
                      </span>
                      <button
                        onClick={() => {
                          setMenuItems(prev => prev.map(m => m.id === item.id ? { ...m, available: !m.available } : m));
                        }}
                        className="font-bold text-[#6F4E37] hover:underline"
                      >
                        Toggle Availability
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              4. STAFF MANAGEMENT
             ======================================================== */}
          {activeTab === 'staff-mgmt' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Staff & Human Resources</h3>
                  <p className="text-xs text-[#563B29]">Manage Waiters, Receptionists, Kitchen Staff, and Customers.</p>
                </div>
                <Button variant="primary" size="sm" icon={UserPlus} onClick={() => setStaffModalOpen(true)}>
                  Invite / Add Staff
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Name & Email</th>
                      <th className="py-3 px-2">Role</th>
                      <th className="py-3 px-2">Phone</th>
                      <th className="py-3 px-2">Shift Window</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {staffList.map((s) => (
                      <tr key={s.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2">
                          <p className="font-bold text-[#26160E]">{s.name}</p>
                          <p className="text-xs text-[#8E5B34]">{s.email}</p>
                        </td>
                        <td className="py-3 px-2">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F4ECE1] text-[#6F4E37]">
                            {ROLE_LABELS[s.role] || s.role}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-[#563B29]">{s.phone}</td>
                        <td className="py-3 px-2 text-xs">{s.shift}</td>
                        <td className="py-3 px-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => alert(`Permissions modal opened for ${s.name}`)}
                            className="text-xs font-bold text-[#6F4E37] hover:underline"
                          >
                            Edit Permissions
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              5. INVENTORY & STOCK
             ======================================================== */}
          {activeTab === 'inventory-mgmt' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Inventory & Stock Control</h3>
                  <p className="text-xs text-[#563B29]">Stock in/out, low-stock threshold triggers, and supplier management.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus} onClick={() => alert("Purchase Order modal opened.")}>
                  Log Purchase Order
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Code</th>
                      <th className="py-3 px-2">Ingredient / Vintage</th>
                      <th className="py-3 px-2">Category</th>
                      <th className="py-3 px-2">Current Stock</th>
                      <th className="py-3 px-2">Threshold</th>
                      <th className="py-3 px-2">Supplier</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Stock Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {inventory.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-mono text-xs font-bold text-[#6F4E37]">{inv.id}</td>
                        <td className="py-3 px-2 font-bold text-[#26160E]">{inv.item}</td>
                        <td className="py-3 px-2 text-xs text-[#8E5B34]">{inv.category}</td>
                        <td className="py-3 px-2 font-mono font-bold text-[#26160E]">{inv.stock} {inv.unit}</td>
                        <td className="py-3 px-2 text-xs text-[#563B29]">{inv.minStock} {inv.unit}</td>
                        <td className="py-3 px-2 text-xs text-[#563B29]">{inv.supplier}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            inv.status === 'Low Stock' ? 'bg-red-100 text-red-800 animate-pulse' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateInventoryStock(inv.id, 5)}
                              className="px-2 py-0.5 bg-[#6F4E37] text-white rounded text-xs font-bold"
                              title="Stock In (+5)"
                            >
                              +5
                            </button>
                            <button
                              onClick={() => updateInventoryStock(inv.id, -2)}
                              className="px-2 py-0.5 bg-[#FAF6F0] border border-[#D5BFA4] text-[#26160E] rounded text-xs font-bold"
                              title="Stock Out (-2)"
                            >
                              -2
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              6. PAYMENTS & BILLING
             ======================================================== */}
          {activeTab === 'billing-mgmt' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Payments, Invoices & Financial Settlement</h3>
                <p className="text-xs text-[#563B29]">Payment transaction audit, booking advance adjustments, and invoice generation.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#D5BFA4]/50">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Advance Payments Held</p>
                  <p className="font-serif text-2xl font-bold text-[#26160E] mt-1">$450.00</p>
                  <p className="text-xs text-[#563B29]">9 Upcoming reservations with deposits</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#D5BFA4]/50">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Pending Session Bills</p>
                  <p className="font-serif text-2xl font-bold text-amber-700 mt-1">
                    {formatCurrency(sessions.filter(s => s.paymentStatus === 'Pending').reduce((a, b) => a + b.total, 0))}
                  </p>
                  <p className="text-xs text-[#563B29]">Across active dining sessions</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#D5BFA4]/50">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Total Refunds Processed</p>
                  <p className="font-serif text-2xl font-bold text-emerald-800 mt-1">$0.00</p>
                  <p className="text-xs text-[#563B29]">100% policy compliance</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Invoice / Session</th>
                      <th className="py-3 px-2">Guest Name</th>
                      <th className="py-3 px-2">Table</th>
                      <th className="py-3 px-2">Subtotal</th>
                      <th className="py-3 px-2">Advance Offset</th>
                      <th className="py-3 px-2">Net Total</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {sessions.map((s) => (
                      <tr key={s.sessionId} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">INV-#{s.sessionId}</td>
                        <td className="py-3 px-2 font-bold text-[#26160E]">{s.guestName}</td>
                        <td className="py-3 px-2">Table {s.tableNumber}</td>
                        <td className="py-3 px-2 font-mono">{formatCurrency(s.subtotal)}</td>
                        <td className="py-3 px-2 font-mono text-emerald-700">-{formatCurrency(s.advancePayment)}</td>
                        <td className="py-3 px-2 font-mono font-bold text-[#26160E]">{formatCurrency(s.total)}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            s.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {s.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => alert(`Invoice PDF preview generated for Session #${s.sessionId}`)}
                            className="text-xs font-bold text-[#6F4E37] hover:underline"
                          >
                            View Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              7. OFFERS & DISCOUNTS
             ======================================================== */}
          {activeTab === 'offers-mgmt' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Promotional Campaigns & Coupons</h3>
                  <p className="text-xs text-[#563B29]">Manage promotional discount codes, validity dates, and usage caps.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus} onClick={() => setOfferModalOpen(true)}>
                  Create Coupon Code
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((off) => (
                  <div key={off.id} className="p-5 rounded-2xl border border-[#D5BFA4]/50 bg-[#FAF6F0] space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-base font-bold bg-[#6F4E37] text-white px-3 py-1 rounded-lg">
                        {off.code}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        off.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {off.active ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#26160E]">{off.title}</h4>
                    <p className="text-xs text-[#563B29]">
                      {off.discountPercent ? `${off.discountPercent}% OFF entire bill` : `$${off.discountAmount} Flat Discount`}
                    </p>
                    <div className="pt-2 border-t border-[#D5BFA4]/30 flex justify-between items-center text-xs text-[#8E5B34]">
                      <span>Valid until: {off.validUntil}</span>
                      <span>{off.usageCount} used</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              8. REVIEWS & FEEDBACK
             ======================================================== */}
          {activeTab === 'reviews-mgmt' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Guest Reviews & Complaints Overview</h3>
                <p className="text-xs text-[#563B29]">Patron ratings, published feedback, and guest complaint resolutions.</p>
              </div>

              {/* Complaints section */}
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-[#26160E]">Active Complaint Log</h4>
                {complaints.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl border border-[#D5BFA4]/50 bg-[#FAF6F0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#6F4E37]">{c.id}</span>
                        <span className="font-bold text-sm text-[#26160E]">{c.guest} ({c.table})</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {c.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#563B29] mt-1 italic">"{c.issue}"</p>
                      {c.resolution && (
                        <p className="text-xs text-emerald-700 mt-0.5 font-medium">Resolution: {c.resolution}</p>
                      )}
                    </div>
                    {c.status !== 'Resolved' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => resolveComplaint(c.id, "Manager compensated guest with complimentary tasting dessert.")}
                      >
                        Resolve Complaint
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Reviews section */}
              <div className="space-y-3 pt-4 border-t border-[#F4ECE1]">
                <h4 className="font-serif text-lg font-bold text-[#26160E]">Published Patron Reviews</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((r) => (
                    <div key={r.id} className="p-4 rounded-xl border border-[#D5BFA4]/50 bg-[#FAF6F0] space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-[#26160E]">{r.guest}</span>
                        <div className="flex items-center gap-1 text-[#C89B4A]">
                          {[...Array(r.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#563B29] italic">"{r.comment}"</p>
                      <p className="text-[11px] text-[#8E5B34]">{r.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              9. REPORTS & ANALYTICS
             ======================================================== */}
          {activeTab === 'reports-mgmt' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Executive Reports & Business Intelligence</h3>
                  <p className="text-xs text-[#563B29]">Daily, weekly, and monthly performance across revenue, staff, and inventory.</p>
                </div>
                <Button variant="outline" size="sm" icon={Download} onClick={() => alert("Exporting report to CSV...")}>
                  Export Report
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D5BFA4]/40 text-center">
                  <p className="text-[11px] font-bold text-[#8E5B34] uppercase">Average Table Ticket</p>
                  <p className="font-serif text-2xl font-bold text-[#6F4E37] mt-1">$142.50</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D5BFA4]/40 text-center">
                  <p className="text-[11px] font-bold text-[#8E5B34] uppercase">Customer Return Rate</p>
                  <p className="font-serif text-2xl font-bold text-emerald-800 mt-1">78.4%</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D5BFA4]/40 text-center">
                  <p className="text-[11px] font-bold text-[#8E5B34] uppercase">Average Table Turn Time</p>
                  <p className="font-serif text-2xl font-bold text-[#26160E] mt-1">84 mins</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D5BFA4]/40 text-center">
                  <p className="text-[11px] font-bold text-[#8E5B34] uppercase">Beverage to Food Ratio</p>
                  <p className="font-serif text-2xl font-bold text-[#6F4E37] mt-1">38 : 62</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              10. ROLES & PERMISSIONS
             ======================================================== */}
          {activeTab === 'roles-mgmt' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Role-Based Access Control (RBAC)</h3>
                <p className="text-xs text-[#563B29]">Enterprise access matrix configured across all six portals.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(ROLE_PERMISSIONS).map((roleKey) => (
                  <div key={roleKey} className="p-5 rounded-2xl border border-[#D5BFA4]/50 bg-[#FAF6F0] space-y-3">
                    <div className="flex justify-between items-center border-b border-[#D5BFA4]/30 pb-2">
                      <span className="font-serif font-bold text-base text-[#26160E]">
                        {ROLE_LABELS[roleKey] || roleKey}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-[#6F4E37] text-white rounded-full">
                        Portal Authorized
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#563B29]">
                      {ROLE_PERMISSIONS[roleKey].map((perm, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{perm}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              11. MY PROFILE
             ======================================================== */}
          {activeTab === 'profile-mgmt' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-8 space-y-6 max-w-2xl">
              <div className="flex items-center gap-6 border-b border-[#F4ECE1] pb-6">
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"}
                  alt={currentUser?.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#6F4E37]"
                />
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#26160E]">{currentUser?.name}</h3>
                  <p className="text-xs text-[#6F4E37] font-semibold">{ROLE_LABELS[currentUser?.role] || 'Administrator'}</p>
                  <p className="text-xs text-[#8E5B34]">{currentUser?.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input label="Display Name" id="adm-name" defaultValue={currentUser?.name} />
                <Input label="Email Address" id="adm-email" defaultValue={currentUser?.email} />
                <Input label="Telephone Contact" id="adm-phone" defaultValue={currentUser?.phone || "+1 555-800-4499"} />
                <Input label="Change Master Password" id="adm-pass" type="password" placeholder="Enter new password" />
                <Button variant="primary" size="md" onClick={() => alert("Admin profile details saved.")}>
                  Save Profile Settings
                </Button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Modal: Add Menu Item */}
      {menuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 border border-[#D5BFA4] shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-[#F4ECE1] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#26160E]">Add Food Item to Catalog</h3>
              <button onClick={() => setMenuModalOpen(false)}><X className="w-5 h-5 text-[#8E5B34]" /></button>
            </div>
            <form onSubmit={handleAddMenuItem} className="space-y-4 text-xs">
              <Input label="Dish Name" id="dish-name" value={newMenuItem.name} onChange={e => setNewMenuItem({ ...newMenuItem, name: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#3E271A]">Category</label>
                  <select value={newMenuItem.category} onChange={e => setNewMenuItem({ ...newMenuItem, category: e.target.value })} className="w-full p-2.5 rounded-lg border border-[#D5BFA4]">
                    <option>Mains</option>
                    <option>Appetizers</option>
                    <option>Desserts</option>
                    <option>Beverages</option>
                  </select>
                </div>
                <Input label="Price ($)" id="dish-price" type="number" step="0.5" value={newMenuItem.price} onChange={e => setNewMenuItem({ ...newMenuItem, price: e.target.value })} required />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-[#3E271A]">Description & Recipe Notes</label>
                <textarea rows={2} value={newMenuItem.description} onChange={e => setNewMenuItem({ ...newMenuItem, description: e.target.value })} className="w-full p-2 rounded-lg border border-[#D5BFA4]" required />
              </div>
              <Input label="Allergens (comma separated)" id="dish-all" placeholder="Dairy, Gluten, Nuts" value={newMenuItem.allergens} onChange={e => setNewMenuItem({ ...newMenuItem, allergens: e.target.value })} />
              <Button type="submit" variant="primary" size="md" className="w-full">Save Dish</Button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Coupon */}
      {offerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 border border-[#D5BFA4] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#F4ECE1] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#26160E]">Create Promotional Coupon</h3>
              <button onClick={() => setOfferModalOpen(false)}><X className="w-5 h-5 text-[#8E5B34]" /></button>
            </div>
            <form onSubmit={handleAddOffer} className="space-y-4 text-xs">
              <Input label="Coupon Code" id="off-code" placeholder="e.g. MOCHA20" value={newOffer.code} onChange={e => setNewOffer({ ...newOffer, code: e.target.value })} required />
              <Input label="Title" id="off-title" placeholder="20% Chef Autumn Special" value={newOffer.title} onChange={e => setNewOffer({ ...newOffer, title: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Discount %" id="off-pct" type="number" value={newOffer.discountPercent} onChange={e => setNewOffer({ ...newOffer, discountPercent: e.target.value })} required />
                <Input label="Min Spend ($)" id="off-spend" type="number" value={newOffer.minSpend} onChange={e => setNewOffer({ ...newOffer, minSpend: e.target.value })} required />
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full">Create Offer</Button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Invite Staff */}
      {staffModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 border border-[#D5BFA4] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#F4ECE1] pb-3">
              <h3 className="font-serif text-xl font-bold text-[#26160E]">Add / Invite Staff Member</h3>
              <button onClick={() => setStaffModalOpen(false)}><X className="w-5 h-5 text-[#8E5B34]" /></button>
            </div>
            <form onSubmit={handleAddStaff} className="space-y-4 text-xs">
              <Input label="Full Name" id="stf-name" value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })} required />
              <Input label="Email Address" id="stf-email" type="email" value={newStaff.email} onChange={e => setNewStaff({ ...newStaff, email: e.target.value })} required />
              <Input label="Mobile Phone" id="stf-phone" value={newStaff.phone} onChange={e => setNewStaff({ ...newStaff, phone: e.target.value })} required />
              <div className="space-y-1">
                <label className="font-bold text-[#3E271A]">Assigned Role</label>
                <select value={newStaff.role} onChange={e => setNewStaff({ ...newStaff, role: e.target.value })} className="w-full p-2.5 rounded-lg border border-[#D5BFA4]">
                  <option value={ROLES.WAITER}>Waiter Staff</option>
                  <option value={ROLES.KITCHEN}>Kitchen Staff</option>
                  <option value={ROLES.RECEPTIONIST}>Receptionist</option>
                  <option value={ROLES.MANAGER}>Restaurant Manager</option>
                  <option value={ROLES.ADMIN}>Executive Admin</option>
                </select>
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full">Add Staff Member</Button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPortal;
