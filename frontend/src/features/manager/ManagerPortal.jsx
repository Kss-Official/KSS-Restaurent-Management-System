import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { useAppStore } from '../../store/store';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { 
  Briefcase, 
  LayoutDashboard, 
  Layers, 
  UserCheck, 
  Wine, 
  HeartHandshake, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Menu, 
  Plus, 
  Search, 
  TrendingUp, 
  Percent, 
  ShieldCheck 
} from 'lucide-react';

export const ManagerPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { tables, updateTableStatus, bookings, kitchenOrders } = useAppStore();

  // Shift & Attendance State
  const [shiftRoster, setShiftRoster] = useState([
    { id: 1, name: "Julian Vance", role: "Head Waiter", section: "Floor A (Tables 1-8)", shift: "11:00 AM - 08:00 PM", status: "On Duty", tips: "$185.00" },
    { id: 2, name: "Marco Pierre", role: "Executive Chef", section: "Hot Kitchen & Pass", shift: "02:00 PM - 11:00 PM", status: "On Duty", tips: "N/A" },
    { id: 3, name: "Elena Rostova", role: "Front Desk Concierge", section: "Reception & Reservations", shift: "04:00 PM - 11:30 PM", status: "On Duty", tips: "$60.00" },
    { id: 4, name: "Clara Higgins", role: "Pastry & Dessert Chef", section: "Patisserie Station", shift: "03:00 PM - 10:30 PM", status: "On Duty", tips: "N/A" },
    { id: 5, name: "Lucas Vance", role: "Junior Waiter", section: "Floor B (Terrace)", shift: "05:00 PM - 11:00 PM", status: "Break", tips: "$95.00" },
    { id: 6, name: "Amelia Thorne", role: "Sommelier", section: "Subterranean Cellar", shift: "05:30 PM - 12:00 AM", status: "Scheduled", tips: "$140.00" },
  ]);

  // Inventory & High-Value Cellar Stock
  const [inventoryList, setInventoryList] = useState([
    { id: 'INV-01', item: 'Dry-Aged Prime Ribeye (USDA Prime)', category: 'Butchery', stock: 18, minStock: 25, unit: 'Cuts (14oz)', status: 'Low Stock', unitCost: 28.50 },
    { id: 'INV-02', item: 'Perigord Black Truffles', category: 'Specialty', stock: 6, minStock: 5, unit: 'Ounces', status: 'Optimal', unitCost: 95.00 },
    { id: 'INV-03', item: 'Reserve Cabernet Sauvignon 2018', category: 'Cellar', stock: 14, minStock: 12, unit: 'Bottles', status: 'Optimal', unitCost: 52.00 },
    { id: 'INV-04', item: 'Valrhona 70% Dark Cocoa', category: 'Patisserie', stock: 4, minStock: 10, unit: 'Kilograms', status: 'Low Stock', unitCost: 34.00 },
    { id: 'INV-05', item: 'Single-Origin Ethiopian Espresso Beans', category: 'Barista', stock: 22, minStock: 15, unit: 'Bags (2lb)', status: 'Optimal', unitCost: 18.00 },
    { id: 'INV-06', item: 'Hokkaido Sea Scallops (U-10)', category: 'Seafood', stock: 28, minStock: 30, unit: 'Portions', status: 'Optimal', unitCost: 19.50 },
  ]);

  // Manager Approvals & VIP Requests
  const [approvalsList, setApprovalsList] = useState([
    { id: 'APR-201', table: 'Table 4', waiter: 'Julian Vance', request: '15% Loyalty Courtesy Discount', reason: 'VIP Guest celebration', amount: '$42.50', status: 'Pending' },
    { id: 'APR-202', table: 'Table 7', waiter: 'Julian Vance', request: 'Complimentary Glass of Vintage Port', reason: 'Guest wait time over 20 mins', amount: '$24.00', status: 'Pending' },
    { id: 'APR-203', table: 'Table 2', waiter: 'Lucas Vance', request: 'Void Incorrect Dish (Mushroom Pappardelle)', reason: 'Customer ordered Gluten-Free Lamb instead', amount: '$34.00', status: 'Approved' },
  ]);

  const navLinks = [
    { label: 'Manager Dashboard', icon: LayoutDashboard, path: '#dashboard', onClick: () => setActiveTab('dashboard') },
    { label: 'Floor & Table Oversight', icon: Layers, path: '#floor', onClick: () => setActiveTab('floor'), badge: tables.filter(t => t.status === 'Occupied').length },
    { label: 'Staff Shift & Roster', icon: UserCheck, path: '#roster', onClick: () => setActiveTab('roster'), badge: shiftRoster.filter(s => s.status === 'On Duty').length },
    { label: 'Inventory & Cellar Stock', icon: Wine, path: '#inventory', onClick: () => setActiveTab('inventory'), badge: inventoryList.filter(i => i.status === 'Low Stock').length },
    { label: 'VIP Care & Approvals', icon: HeartHandshake, path: '#approvals', onClick: () => setActiveTab('approvals'), badge: approvalsList.filter(a => a.status === 'Pending').length },
    { label: 'Shift Settlement & Audit', icon: DollarSign, path: '#settlement', onClick: () => setActiveTab('settlement') },
  ];

  const handleApprove = (id) => {
    setApprovalsList(prev => prev.map(a => a.id === id ? { ...a, status: 'Approved' } : a));
  };

  const handleReject = (id) => {
    setApprovalsList(prev => prev.map(a => a.id === id ? { ...a, status: 'Rejected' } : a));
  };

  const handleRestockOrder = (itemId) => {
    setInventoryList(prev => prev.map(i => i.id === itemId ? { ...i, stock: i.stock + 20, status: 'Optimal' } : i));
    alert("Purchase requisition dispatched to vendor. Inventory quantity updated.");
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex">
      {/* Sidebar with exact Mocha Brown #6F4E37 */}
      <Sidebar
        title="Manager Portal"
        subtitle="Operations & Floor Control"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={navLinks.map(l => ({
          ...l,
          path: `/manager#${activeTab}`,
          end: activeTab === l.label.toLowerCase().split(' ')[0] || (activeTab === 'dashboard' && l.label.includes('Dashboard'))
        }))}
      />

      {/* Main Content Area */}
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
              <h2 className="font-serif text-xl font-bold text-[#26160E] capitalize">
                Floor Manager Control: {activeTab.replace('-', ' ')}
              </h2>
              <p className="text-xs text-[#8E5B34]">Live Service Supervision • Shift Manager: Harrison Blake</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Dinner Service In Progress
            </span>
          </div>
        </header>

        {/* Tab Content */}
        <main className="p-6 sm:p-8 flex-1 space-y-8">
          
          {/* 1. MANAGER DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Top Operational Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <div className="flex justify-between items-start">
                    <p className="text-xs uppercase font-bold text-[#8E5B34]">Current Shift Sales</p>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#26160E] mt-2">$8,740.00</p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">Target: $11,000 (79% Met)</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <div className="flex justify-between items-start">
                    <p className="text-xs uppercase font-bold text-[#8E5B34]">Table Occupancy</p>
                    <Layers className="w-4 h-4 text-[#6F4E37]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#6F4E37] mt-2">
                    {tables.filter(t => t.status === 'Occupied').length} / {tables.length}
                  </p>
                  <p className="text-xs text-[#563B29] mt-1">3 tables reserved for next turn</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <div className="flex justify-between items-start">
                    <p className="text-xs uppercase font-bold text-[#8E5B34]">Kitchen Avg Ticket Time</p>
                    <Clock className="w-4 h-4 text-[#C89B4A]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#26160E] mt-2">18 mins</p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">Within optimal Michelin target</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <div className="flex justify-between items-start">
                    <p className="text-xs uppercase font-bold text-[#8E5B34]">Pending Approvals</p>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-amber-700 mt-2">
                    {approvalsList.filter(a => a.status === 'Pending').length}
                  </p>
                  <p className="text-xs text-[#8E5B34] mt-1">Discounts & comp requests</p>
                </div>
              </div>

              {/* Action Required: Manager Approvals Banner */}
              {approvalsList.filter(a => a.status === 'Pending').length > 0 && (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-amber-900">Waitstaff Approval Needed</p>
                      <p className="text-xs text-amber-800">
                        There are {approvalsList.filter(a => a.status === 'Pending').length} pending comp/discount requests awaiting manager sign-off.
                      </p>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => setActiveTab('approvals')}>
                    Review Approvals
                  </Button>
                </div>
              )}

              {/* Live Floor Overview Cards */}
              <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#26160E]">Live Shift Tables & Section Coverage</h3>
                    <p className="text-xs text-[#563B29]">Real-time supervision of active guest dining times and assigned waiters.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('floor')}>
                    Full Floor Map
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tables.slice(0, 4).map((table) => (
                    <div key={table.id} className="p-4 rounded-xl border border-[#D5BFA4]/50 bg-[#FAF6F0] space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-bold text-base text-[#26160E]">Table {table.number}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          table.status === 'Occupied' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {table.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#8E5B34]">Capacity: {table.capacity} Guests • {table.waiter}</p>
                      <div className="pt-2 border-t border-[#D5BFA4]/30 flex justify-between items-center text-xs">
                        <span className="text-[#563B29] font-medium">{table.currentOrder || 'No current KOT'}</span>
                        <button
                          onClick={() => {
                            const next = table.status === 'Occupied' ? 'Available' : 'Occupied';
                            updateTableStatus(table.id, next);
                          }}
                          className="font-bold text-[#6F4E37] hover:underline"
                        >
                          Toggle Status
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff On Duty Quick Summary */}
              <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg font-bold text-[#26160E]">Staff Currently On Floor</h3>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('roster')}>
                    Manage Shift Roster
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-[11px]">
                        <th className="py-2.5 px-2">Staff Member</th>
                        <th className="py-2.5 px-2">Role</th>
                        <th className="py-2.5 px-2">Station / Section</th>
                        <th className="py-2.5 px-2">Shift Window</th>
                        <th className="py-2.5 px-2">Duty Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4ECE1]">
                      {shiftRoster.slice(0, 4).map((s) => (
                        <tr key={s.id} className="hover:bg-[#FAF6F0]">
                          <td className="py-2.5 px-2 font-bold text-[#26160E]">{s.name}</td>
                          <td className="py-2.5 px-2 text-[#6F4E37] font-semibold">{s.role}</td>
                          <td className="py-2.5 px-2 text-[#563B29]">{s.section}</td>
                          <td className="py-2.5 px-2 text-[#8E5B34]">{s.shift}</td>
                          <td className="py-2.5 px-2">
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
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

          {/* 2. FLOOR & TABLE OVERSIGHT */}
          {activeTab === 'floor' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Floor Plan Oversight & Table Control</h3>
                  <p className="text-xs text-[#563B29]">Reassign tables, clear completed tables, or flag VIP seating.</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" onClick={() => alert("All available tables refreshed.")}>
                    Refresh Floor Status
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tables.map((table) => (
                  <div
                    key={table.id}
                    className={`p-5 rounded-2xl border-2 transition-all ${
                      table.status === 'Occupied'
                        ? 'border-red-300 bg-red-50/50'
                        : table.status === 'Reserved'
                        ? 'border-amber-300 bg-amber-50/50'
                        : 'border-emerald-300 bg-emerald-50/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-serif font-bold text-lg text-[#26160E]">Table {table.number}</span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        table.status === 'Occupied' ? 'bg-red-100 text-red-800' :
                        table.status === 'Reserved' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {table.status}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1 text-xs">
                      <p className="text-[#563B29]"><span className="font-semibold text-[#8E5B34]">Capacity:</span> {table.capacity} Persons</p>
                      <p className="text-[#563B29]"><span className="font-semibold text-[#8E5B34]">Assigned Waiter:</span> {table.waiter}</p>
                      <p className="text-[#563B29]"><span className="font-semibold text-[#8E5B34]">Current KOT:</span> {table.currentOrder || 'None'}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#D5BFA4]/30 flex justify-between items-center text-xs">
                      <button
                        onClick={() => {
                          const next = table.status === 'Occupied' ? 'Available' : 'Occupied';
                          updateTableStatus(table.id, next);
                        }}
                        className="font-bold text-[#6F4E37] hover:underline"
                      >
                        {table.status === 'Occupied' ? 'Clear Table' : 'Mark Occupied'}
                      </button>
                      <button
                        onClick={() => alert(`Table ${table.number} flagged for VIP complimentary champagne.`)}
                        className="font-bold text-[#C89B4A] hover:underline"
                      >
                        Flag VIP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. STAFF SHIFT & ROSTER */}
          {activeTab === 'roster' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Daily Shift Roster & Floor Allocations</h3>
                  <p className="text-xs text-[#563B29]">Monitor shift check-in, breaks, tips earned, and section assignments.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus} onClick={() => alert("Add shift member modal opened.")}>
                  Assign Staff Shift
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Staff Member</th>
                      <th className="py-3 px-2">Role</th>
                      <th className="py-3 px-2">Section Assigned</th>
                      <th className="py-3 px-2">Shift Window</th>
                      <th className="py-3 px-2">Shift Tips</th>
                      <th className="py-3 px-2">Duty Status</th>
                      <th className="py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {shiftRoster.map((s) => (
                      <tr key={s.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-bold text-[#26160E]">{s.name}</td>
                        <td className="py-3 px-2 font-semibold text-[#6F4E37]">{s.role}</td>
                        <td className="py-3 px-2 text-[#563B29]">{s.section}</td>
                        <td className="py-3 px-2 text-[#8E5B34] text-xs">{s.shift}</td>
                        <td className="py-3 px-2 font-mono font-bold text-[#26160E]">{s.tips}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            s.status === 'On Duty' ? 'bg-emerald-100 text-emerald-800' :
                            s.status === 'Break' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => {
                              const nextStatus = s.status === 'On Duty' ? 'Break' : 'On Duty';
                              setShiftRoster(prev => prev.map(item => item.id === s.id ? { ...item, status: nextStatus } : item));
                            }}
                            className="text-xs font-bold text-[#6F4E37] hover:underline"
                          >
                            Toggle Break
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. INVENTORY & CELLAR STOCK */}
          {activeTab === 'inventory' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">High-Value Ingredients & Cellar Stock</h3>
                  <p className="text-xs text-[#563B29]">Real-time stock audit for prime steaks, reserve wines, and specialty truffles.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus}>Log Stock Delivery</Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Item Code</th>
                      <th className="py-3 px-2">Ingredient / Vintage</th>
                      <th className="py-3 px-2">Category</th>
                      <th className="py-3 px-2">Current Stock</th>
                      <th className="py-3 px-2">Min Threshold</th>
                      <th className="py-3 px-2">Unit Cost</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {inventoryList.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-mono text-xs font-bold text-[#6F4E37]">{inv.id}</td>
                        <td className="py-3 px-2 font-bold text-[#26160E]">{inv.item}</td>
                        <td className="py-3 px-2 text-xs text-[#8E5B34]">{inv.category}</td>
                        <td className="py-3 px-2 font-mono font-bold text-[#26160E]">{inv.stock} {inv.unit}</td>
                        <td className="py-3 px-2 text-xs text-[#563B29]">{inv.minStock} {inv.unit}</td>
                        <td className="py-3 px-2 font-mono text-xs text-[#26160E]">{formatCurrency(inv.unitCost)}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            inv.status === 'Low Stock' ? 'bg-red-100 text-red-800 animate-pulse' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          {inv.status === 'Low Stock' ? (
                            <Button
                              variant="gold"
                              size="sm"
                              onClick={() => handleRestockOrder(inv.id)}
                            >
                              Order Restock
                            </Button>
                          ) : (
                            <span className="text-xs text-emerald-700 font-semibold">Stock Good</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. VIP CARE & APPROVALS */}
          {activeTab === 'approvals' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Manager Discount & Comp Approvals</h3>
                <p className="text-xs text-[#563B29]">Review waitstaff requests for guest comps, dish voids, and VIP loyalty discounts.</p>
              </div>

              <div className="space-y-4">
                {approvalsList.map((appr) => (
                  <div key={appr.id} className="p-5 rounded-2xl border border-[#D5BFA4]/60 bg-[#FAF6F0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#6F4E37] bg-white px-2 py-0.5 rounded border border-[#D5BFA4]/40">
                          {appr.id}
                        </span>
                        <span className="font-bold text-sm text-[#26160E]">{appr.table} • Requested by {appr.waiter}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          appr.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          appr.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {appr.status}
                        </span>
                      </div>
                      <p className="font-semibold text-sm text-[#6F4E37]">{appr.request} ({appr.amount})</p>
                      <p className="text-xs text-[#563B29] italic">Reason: "{appr.reason}"</p>
                    </div>

                    {appr.status === 'Pending' ? (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={CheckCircle2}
                          onClick={() => handleApprove(appr.id)}
                        >
                          Approve Comp
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-700 hover:bg-red-50"
                          icon={XCircle}
                          onClick={() => handleReject(appr.id)}
                        >
                          Decline
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-[#8E5B34]">Decision Logged</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. SHIFT SETTLEMENT & AUDIT */}
          {activeTab === 'settlement' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">End-of-Shift Reconciliation & Financial Audit</h3>
                <p className="text-xs text-[#563B29]">Daily terminal balance verification across credit cards, cash registers, and tips distribution.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D5BFA4]/40 text-center space-y-2">
                  <p className="text-xs font-bold uppercase text-[#8E5B34]">Gross Sales Today</p>
                  <p className="font-serif text-3xl font-bold text-[#26160E]">$8,740.00</p>
                  <p className="text-xs text-emerald-700">62 Orders Settled</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D5BFA4]/40 text-center space-y-2">
                  <p className="text-xs font-bold uppercase text-[#8E5B34]">Card Terminal Batches</p>
                  <p className="font-serif text-3xl font-bold text-[#6F4E37]">$7,620.00</p>
                  <p className="text-xs text-emerald-700">Batch #904-A Balanced</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D5BFA4]/40 text-center space-y-2">
                  <p className="text-xs font-bold uppercase text-[#8E5B34]">Cash Drawer Balance</p>
                  <p className="font-serif text-3xl font-bold text-[#26160E]">$1,120.00</p>
                  <p className="text-xs text-emerald-700">Exact match, no variance</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F4ECE1] flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs text-[#8E5B34]">
                  Audited by Manager Harrison Blake at {new Date().toLocaleTimeString()}
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => alert("Shift Z-Report generated and sent to Admin executive office.")}
                >
                  Generate Shift Z-Report
                </Button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default ManagerPortal;
