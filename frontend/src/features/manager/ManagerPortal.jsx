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
  UtensilsCrossed, 
  Users, 
  AlertCircle, 
  Crown, 
  CalendarClock, 
  ChefHat, 
  Boxes, 
  MessageSquareWarning, 
  Check, 
  RefreshCw, 
  User, 
  ShieldCheck 
} from 'lucide-react';

export const ManagerPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Centralized Store
  const { 
    currentUser, 
    tables, 
    updateTableStatus, 
    assignTableWaiter, 
    sessions, 
    bookings, 
    orders, 
    updateOrderStatus, 
    waitingList, 
    inventory, 
    updateInventoryStock, 
    reviews, 
    complaints, 
    resolveComplaint 
  } = useAppStore();

  // Local State for Management & Monitoring
  const [staffRoster, setStaffRoster] = useState([
    { id: 1, name: "Julian Vance", role: "Head Waiter", section: "Floor A (Window & Booths)", shift: "11:00 AM - 08:00 PM", status: "On Duty", assignedTables: [1, 2, 3, 4], tips: "$185.00" },
    { id: 2, name: "Lucas Vance", role: "Junior Waiter", section: "Floor B (Terrace)", shift: "04:00 PM - 11:30 PM", status: "On Duty", assignedTables: [5, 6, 7, 8], tips: "$110.00" },
    { id: 3, name: "Amelia Thorne", role: "Sommelier & Floor Captain", section: "Cellar & Lounge", shift: "05:00 PM - 12:00 AM", status: "On Duty", assignedTables: [9, 10, 11, 12], tips: "$220.00" },
    { id: 4, name: "Marco Pierre", role: "Executive Chef", section: "Hot Kitchen & Pass", shift: "02:00 PM - 11:00 PM", status: "On Duty", assignedTables: [], tips: "N/A" },
    { id: 5, name: "Elena Rostova", role: "Front Desk Concierge", section: "Reception Entrance", shift: "04:00 PM - 11:30 PM", status: "On Duty", assignedTables: [], tips: "$60.00" },
  ]);

  // VIP Profiles
  const [vipList, setVipList] = useState([
    { id: "VIP-01", name: "Sophia Montgomery", tier: "Black Gold", visits: 18, favoriteWine: "Reserve Cabernet 2018", seatingPref: "Booth by window", allergies: "None", notes: "Prefers table-side decanting." },
    { id: "VIP-02", name: "Lord Alistair Sterling", tier: "Platinum Connoisseur", visits: 12, favoriteWine: "Château Margaux 2015", seatingPref: "Quiet corner Table 4", allergies: "Pecan/Walnut allergy", notes: "Prefers mineral water at room temperature." },
    { id: "VIP-03", name: "Victoria Kensington", tier: "Gold Member", visits: 9, favoriteWine: "Dom Pérignon Vintage", seatingPref: "Terrace heating booth", allergies: "Gluten sensitive", notes: "Birthday celebration on next visit." },
  ]);

  // Active Delayed Orders (>20 mins)
  const delayedOrders = orders.filter(o => o.isDelayed || o.status === 'Preparing');
  const lowStockItems = inventory.filter(i => i.status === 'Low Stock');

  // Sidebar Links with Grouping as explicitly requested
  const navLinks = [
    { label: '1. Dashboard', icon: LayoutDashboard, tabId: 'dashboard' },
    { 
      isGroup: true, 
      groupTitle: '2. Management', 
      children: [
        { label: 'A. Staff Management', icon: Users, tabId: 'mgmt-staff' },
        { label: 'B. Table Management', icon: Layers, tabId: 'mgmt-tables', badge: tables.filter(t => t.status === 'Occupied').length },
        { label: 'C. Waiter Assignment', icon: UserCheck, tabId: 'mgmt-waiter' },
        { label: 'D. Order Supervision', icon: UtensilsCrossed, tabId: 'mgmt-orders', badge: orders.length },
        { label: 'E. VIP Guest Profiles', icon: Crown, tabId: 'mgmt-vip', badge: vipList.length },
      ]
    },
    {
      isGroup: true,
      groupTitle: '3. Monitoring',
      children: [
        { label: 'A. Reservation Monitor', icon: CalendarClock, tabId: 'mon-reservations', badge: bookings.length },
        { label: 'B. Kitchen Monitoring', icon: ChefHat, tabId: 'mon-kitchen', badge: delayedOrders.length },
        { label: 'C. Inventory Monitoring', icon: Boxes, tabId: 'mon-inventory', badge: lowStockItems.length },
      ]
    },
    { label: '4. Complaints & Reviews', icon: MessageSquareWarning, tabId: 'complaints-mgmt', badge: complaints.filter(c => c.status === 'Open').length },
    { label: '5. Payment Management', icon: DollarSign, tabId: 'payments-mgmt' },
    { label: '6. My Profile', icon: User, tabId: 'profile-mgmt' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex">
      {/* Sidebar with exact Mocha Brown #6F4E37 */}
      <Sidebar
        title="Manager Portal"
        subtitle="Operations & Floor Control"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={navLinks}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
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
              <h2 className="font-serif text-xl font-bold text-[#26160E] capitalize">
                Manager: {activeTab.replace(/^(mgmt-|mon-)/, '').replace(/-/g, ' ')}
              </h2>
              <p className="text-xs text-[#8E5B34]">Floor Supervision • Shift Operations Supervisor</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Live Dining Service Active
            </span>
          </div>
        </header>

        {/* Tab Content */}
        <main className="p-6 sm:p-8 flex-1 space-y-8">
          
          {/* ========================================================
              1. DASHBOARD
             ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Operational Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Today's Reservations</p>
                  <p className="font-serif text-3xl font-bold text-[#26160E] mt-2">{bookings.length}</p>
                  <p className="text-xs text-[#563B29] mt-1">{bookings.filter(b => b.status === 'Checked-In').length} guests currently seated</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Table Breakdown</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-serif text-3xl font-bold text-[#6F4E37]">
                      {tables.filter(t => t.status === 'Occupied').length}
                    </span>
                    <span className="text-xs text-[#8E5B34]">
                      / {tables.length} Total ({tables.filter(t => t.status === 'Available').length} Available)
                    </span>
                  </div>
                  <p className="text-xs text-purple-700 font-semibold mt-1">
                    {tables.filter(t => t.status === 'Cleaning').length} tables currently cleaning
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Waiting List Queue</p>
                  <p className="font-serif text-3xl font-bold text-amber-700 mt-2">{waitingList.length}</p>
                  <p className="text-xs text-[#563B29] mt-1">Avg wait time ~15 mins</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Active Shift Sales</p>
                  <p className="font-serif text-3xl font-bold text-emerald-800 mt-2">
                    {formatCurrency(sessions.reduce((a, b) => a + (b.total || 0), 0) + 8500)}
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">79% of shift target met</p>
                </div>
              </div>

              {/* Delayed Kitchen Orders Alert */}
              {delayedOrders.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-amber-900">Delayed / Priority Orders Detected</p>
                      <p className="text-xs text-amber-800">
                        {delayedOrders.length} order(s) currently being prepared in the kitchen. Monitor pass dispatch.
                      </p>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => setActiveTab('mon-kitchen')}>
                    Open Kitchen Monitor
                  </Button>
                </div>
              )}

              {/* Live Tables Floor Overview */}
              <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#26160E]">Floor Dining Sessions & Table Grid</h3>
                    <p className="text-xs text-[#563B29]">Real-time status: Available, Reserved, Occupied, Cleaning.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('mgmt-tables')}>
                    Manage All Tables
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {tables.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        const cycle = t.status === 'Available' ? 'Reserved' : t.status === 'Reserved' ? 'Occupied' : t.status === 'Occupied' ? 'Cleaning' : 'Available';
                        updateTableStatus(t.id, cycle);
                      }}
                      className={`p-3.5 rounded-xl border-2 text-center cursor-pointer transition-all hover:scale-105 ${
                        t.status === 'Occupied' ? 'bg-red-50 border-red-300 text-red-900' :
                        t.status === 'Reserved' ? 'bg-amber-50 border-amber-300 text-amber-900' :
                        t.status === 'Cleaning' ? 'bg-purple-50 border-purple-300 text-purple-900' :
                        'bg-emerald-50 border-emerald-300 text-emerald-900'
                      }`}
                    >
                      <p className="font-serif font-bold text-base">Table {t.number}</p>
                      <p className="text-[11px] font-semibold mt-0.5">{t.capacity}p • {t.waiter.split(' ')[0]}</p>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-white mt-1 shadow-xs">
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              2. MANAGEMENT - A. STAFF MANAGEMENT
             ======================================================== */}
          {activeTab === 'mgmt-staff' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Shift & Staff Attendance Supervision</h3>
                  <p className="text-xs text-[#563B29]">Daily staff deployment, shift check-in/out, and break management.</p>
                </div>
                <Button variant="primary" size="sm" onClick={() => alert("Shift schedule updated.")}>
                  Save Deployment
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Staff Member</th>
                      <th className="py-3 px-2">Role</th>
                      <th className="py-3 px-2">Assigned Section</th>
                      <th className="py-3 px-2">Shift Schedule</th>
                      <th className="py-3 px-2">Tips Earned</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {staffRoster.map((s) => (
                      <tr key={s.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-bold text-[#26160E]">{s.name}</td>
                        <td className="py-3 px-2 font-semibold text-[#6F4E37]">{s.role}</td>
                        <td className="py-3 px-2 text-[#563B29]">{s.section}</td>
                        <td className="py-3 px-2 text-xs">{s.shift}</td>
                        <td className="py-3 px-2 font-mono font-bold text-emerald-800">{s.tips}</td>
                        <td className="py-3 px-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => {
                              const newStatus = s.status === 'On Duty' ? 'On Break' : 'On Duty';
                              setStaffRoster(prev => prev.map(item => item.id === s.id ? { ...item, status: newStatus } : item));
                            }}
                            className="text-xs font-bold text-[#6F4E37] hover:underline"
                          >
                            Toggle Duty
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
              2. MANAGEMENT - B. TABLE MANAGEMENT
             ======================================================== */}
          {activeTab === 'mgmt-tables' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Table Lifecycle & Reassignment Control</h3>
                <p className="text-xs text-[#563B29]">Reassign tables, transition from Cleaning to Available, and monitor Session IDs.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {tables.map((t) => (
                  <div key={t.id} className="p-5 rounded-2xl border border-[#D5BFA4]/50 bg-[#FAF6F0] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-serif font-bold text-lg text-[#26160E]">Table {t.number}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        t.status === 'Occupied' ? 'bg-red-100 text-red-800' :
                        t.status === 'Reserved' ? 'bg-amber-100 text-amber-800' :
                        t.status === 'Cleaning' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {t.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1 text-[#563B29]">
                      <p><span className="font-bold text-[#8E5B34]">Section:</span> {t.section}</p>
                      <p><span className="font-bold text-[#8E5B34]">Capacity:</span> {t.capacity} Persons</p>
                      <p><span className="font-bold text-[#8E5B34]">Assigned Waiter:</span> {t.waiter}</p>
                      <p><span className="font-bold text-[#8E5B34]">Table Session ID:</span> {t.activeSessionId ? `#${t.activeSessionId}` : 'None'}</p>
                    </div>

                    <div className="pt-2 border-t border-[#D5BFA4]/30 flex gap-2">
                      {t.status === 'Cleaning' ? (
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-full"
                          onClick={() => updateTableStatus(t.id, 'Available')}
                        >
                          Mark Clean & Ready
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            const next = t.status === 'Available' ? 'Reserved' : t.status === 'Reserved' ? 'Occupied' : 'Cleaning';
                            updateTableStatus(t.id, next);
                          }}
                        >
                          Cycle Table Status
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              2. MANAGEMENT - C. WAITER & SERVICE ASSIGNMENT
             ======================================================== */}
          {activeTab === 'mgmt-waiter' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Waitstaff Section & Table Workload Assignment</h3>
                <p className="text-xs text-[#563B29]">Distribute table assignments across waitstaff to balance workload.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Julian Vance", section: "Floor A (Window & Booths)", tables: [1, 2, 3, 4], activeGuests: 12 },
                  { name: "Lucas Vance", section: "Floor B (Terrace)", tables: [5, 6, 7, 8], activeGuests: 8 },
                  { name: "Amelia Thorne", section: "Cellar & Lounge", tables: [9, 10, 11, 12], activeGuests: 6 }
                ].map((w, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-[#D5BFA4]/50 bg-[#FAF6F0] space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#26160E]">{w.name}</h4>
                        <p className="text-xs text-[#8E5B34]">{w.section}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 bg-[#6F4E37] text-white rounded-full">
                        {w.tables.length} Tables
                      </span>
                    </div>

                    <div className="text-xs text-[#563B29] space-y-1">
                      <p><span className="font-bold">Assigned Tables:</span> {w.tables.map(n => `Table ${n}`).join(', ')}</p>
                      <p><span className="font-bold">Current Guests:</span> {w.activeGuests} Patrons</p>
                    </div>

                    <Button variant="outline" size="sm" className="w-full" onClick={() => alert(`Reassign section modal for ${w.name}`)}>
                      Reassign Service Section
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              2. MANAGEMENT - D. ORDER SUPERVISION
             ======================================================== */}
          {activeTab === 'mgmt-orders' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Live Order Supervision & Priority Management</h3>
                <p className="text-xs text-[#563B29]">Monitor preparation times and expedite delayed dining tickets.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Order ID</th>
                      <th className="py-3 px-2">Session ID</th>
                      <th className="py-3 px-2">Table</th>
                      <th className="py-3 px-2">Dishes</th>
                      <th className="py-3 px-2">Elapsed</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Manager Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">{ord.id}</td>
                        <td className="py-3 px-2 font-mono font-bold text-[#26160E]">#{ord.sessionId}</td>
                        <td className="py-3 px-2 font-bold text-[#26160E]">Table {ord.tableNumber}</td>
                        <td className="py-3 px-2 text-xs text-[#563B29]">
                          {ord.items.map(it => `${it.qty}x ${it.name}`).join(', ')}
                        </td>
                        <td className="py-3 px-2 text-xs">{ord.time}</td>
                        <td className="py-3 px-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F4ECE1] text-[#6F4E37]">
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => {
                              updateOrderStatus(ord.id, 'Ready to Serve');
                              alert(`Order #${ord.id} expedited and marked Ready to Serve!`);
                            }}
                            className="text-xs font-bold text-[#6F4E37] hover:underline"
                          >
                            Expedite Order
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
              2. MANAGEMENT - E. VIP GUEST PROFILES
             ======================================================== */}
          {activeTab === 'mgmt-vip' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">VIP Customer Registry & Preferences</h3>
                  <p className="text-xs text-[#563B29]">High-net-worth patron preferences, dietary restrictions, and anniversary alerts.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus} onClick={() => alert("Add VIP profile modal")}>
                  Add VIP Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vipList.map((vip) => (
                  <div key={vip.id} className="p-5 rounded-2xl border border-[#D5BFA4]/50 bg-[#FAF6F0] space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif font-bold text-base text-[#26160E]">{vip.name}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C89B4A] text-[#170B06]">
                        {vip.tier}
                      </span>
                    </div>

                    <div className="text-xs text-[#563B29] space-y-1.5">
                      <p><span className="font-bold text-[#8E5B34]">Favorite Vintage:</span> {vip.favoriteWine}</p>
                      <p><span className="font-bold text-[#8E5B34]">Seating Preference:</span> {vip.seatingPref}</p>
                      <p><span className="font-bold text-[#8E5B34]">Allergies:</span> {vip.allergies}</p>
                      <p className="italic bg-white p-2 rounded-lg border border-[#D5BFA4]/30 mt-2">"{vip.notes}"</p>
                    </div>

                    <Button variant="outline" size="sm" className="w-full" onClick={() => alert(`Complimentary wine sent to ${vip.name}`)}>
                      Send Manager Courtesy Comp
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              3. MONITORING - A. RESERVATION MONITORING
             ======================================================== */}
          {activeTab === 'mon-reservations' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Reservation Status Tracking</h3>
                <p className="text-xs text-[#563B29]">Monitor Confirmed, Checked-in, and Cancelled reservations.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Booking ID</th>
                      <th className="py-3 px-2">Guest Name</th>
                      <th className="py-3 px-2">Party</th>
                      <th className="py-3 px-2">Date & Time</th>
                      <th className="py-3 px-2">Assigned Table</th>
                      <th className="py-3 px-2">Session ID</th>
                      <th className="py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">{b.id}</td>
                        <td className="py-3 px-2 font-bold text-[#26160E]">{b.customerName}</td>
                        <td className="py-3 px-2">{b.guests}</td>
                        <td className="py-3 px-2 text-xs">{formatDate(b.date)} at {b.time}</td>
                        <td className="py-3 px-2 font-semibold text-[#6F4E37]">{b.tableNo}</td>
                        <td className="py-3 px-2 font-mono">{b.sessionId ? `#${b.sessionId}` : 'Pending Check-In'}</td>
                        <td className="py-3 px-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              3. MONITORING - B. KITCHEN MONITORING
             ======================================================== */}
          {activeTab === 'mon-kitchen' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Kitchen Display & Preparation Monitoring</h3>
                <p className="text-xs text-[#563B29]">Review live KOT progress across stations.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-5 rounded-2xl border border-[#D5BFA4]/50 bg-[#FAF6F0] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-[#6F4E37]">{ord.id} ({ord.kotId})</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        ord.status === 'Ready to Serve' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.status}
                      </span>
                    </div>
                    <p className="font-serif font-bold text-base text-[#26160E]">Table {ord.tableNumber} • Session #{ord.sessionId}</p>
                    <ul className="text-xs text-[#563B29] space-y-1">
                      {ord.items.map((it, i) => (
                        <li key={i}>• {it.qty}x {it.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              3. MONITORING - C. INVENTORY MONITORING
             ======================================================== */}
          {activeTab === 'mon-inventory' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Inventory Stock & Requisition to Admin</h3>
                  <p className="text-xs text-[#563B29]">Submit replenishment requests for low-stock steaks, truffles, or cellar bottles.</p>
                </div>
                <Button variant="primary" size="sm" onClick={() => alert("Requisition dispatched to Admin office.")}>
                  Submit Bulk Requisition
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Item</th>
                      <th className="py-3 px-2">Current Stock</th>
                      <th className="py-3 px-2">Min Threshold</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {inventory.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-bold text-[#26160E]">{inv.item}</td>
                        <td className="py-3 px-2 font-mono">{inv.stock} {inv.unit}</td>
                        <td className="py-3 px-2 text-xs">{inv.minStock} {inv.unit}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            inv.status === 'Low Stock' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => alert(`Restock requisition for ${inv.item} sent to Admin.`)}
                            className="text-xs font-bold text-[#6F4E37] hover:underline"
                          >
                            Request Reorder
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
              4. COMPLAINTS & REVIEWS
             ======================================================== */}
          {activeTab === 'complaints-mgmt' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Guest Complaints & Immediate Service Recovery</h3>
                <p className="text-xs text-[#563B29]">Manager resolution log for guest issues, temperature, or dish remakes.</p>
              </div>

              <div className="space-y-4">
                {complaints.map((c) => (
                  <div key={c.id} className="p-5 rounded-2xl border border-[#D5BFA4]/50 bg-[#FAF6F0] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-[#26160E]">{c.guest} ({c.table})</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#563B29] italic">"{c.issue}"</p>
                    {c.resolution && (
                      <p className="text-xs text-emerald-700 font-semibold">Resolved: {c.resolution}</p>
                    )}
                    {c.status !== 'Resolved' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => resolveComplaint(c.id, "Manager personally attended table and offered chef's complimentary vintage port.")}
                      >
                        Log Manager Resolution
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              5. PAYMENT MANAGEMENT
             ======================================================== */}
          {activeTab === 'payments-mgmt' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Session-Wise Billing & Register Audit</h3>
                <p className="text-xs text-[#563B29]">Track open session tabs, advance deposit reconciliations, and payment methods.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Session ID</th>
                      <th className="py-3 px-2">Table</th>
                      <th className="py-3 px-2">Guest</th>
                      <th className="py-3 px-2">Subtotal</th>
                      <th className="py-3 px-2">Deposit Offset</th>
                      <th className="py-3 px-2">Net Total</th>
                      <th className="py-3 px-2">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {sessions.map((s) => (
                      <tr key={s.sessionId} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">#{s.sessionId}</td>
                        <td className="py-3 px-2">Table {s.tableNumber}</td>
                        <td className="py-3 px-2 font-bold text-[#26160E]">{s.guestName}</td>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              6. MY PROFILE
             ======================================================== */}
          {activeTab === 'profile-mgmt' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-8 space-y-6 max-w-2xl">
              <div className="flex items-center gap-6 border-b border-[#F4ECE1] pb-6">
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"}
                  alt={currentUser?.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#6F4E37]"
                />
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#26160E]">{currentUser?.name}</h3>
                  <p className="text-xs text-[#6F4E37] font-semibold">Restaurant General & Floor Manager</p>
                  <p className="text-xs text-[#8E5B34]">{currentUser?.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input label="Manager Name" id="mgr-name" defaultValue={currentUser?.name} />
                <Input label="Email Address" id="mgr-email" defaultValue={currentUser?.email} />
                <Input label="Contact Extension" id="mgr-ext" defaultValue="+1 (555) 300-8800" />
                <Input label="Change Portal Password" id="mgr-pass" type="password" placeholder="New manager passcode" />
                <Button variant="primary" size="md" onClick={() => alert("Manager profile parameters saved.")}>
                  Save Settings
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
