import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { useAppStore } from '../../store/store';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  CalendarCheck, 
  UtensilsCrossed, 
  MapPin, 
  Sparkles, 
  BarChart3, 
  Settings, 
  Plus, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Menu 
} from 'lucide-react';

export const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { bookings, menuItems, setMenuItems } = useAppStore();

  const [staffList, setStaffList] = useState([
    { id: 1, name: "Marco Pierre", role: "Head Chef (Kitchen)", email: "marco@auramocha.com", shift: "Evening", status: "Active" },
    { id: 2, name: "Elena Rostova", role: "Front Desk Concierge", email: "elena@auramocha.com", shift: "Morning", status: "Active" },
    { id: 3, name: "Julian Vance", role: "Senior Waiter", email: "julian@auramocha.com", shift: "All-Day", status: "Active" },
    { id: 4, name: "Clara Higgins", role: "Sous Chef", email: "clara@auramocha.com", shift: "Evening", status: "Active" },
    { id: 5, name: "David Sterling", role: "Floor Captain", email: "david@auramocha.com", shift: "Morning", status: "Active" },
  ]);

  const [customerList, setCustomerList] = useState([
    { id: 1, name: "Sophia Montgomery", email: "sophia@luxury.com", phone: "+1 555-392-8819", tier: "Black Gold", visits: 14, spent: "$3,420" },
    { id: 2, name: "Lord Alistair Sterling", email: "sterling@estate.co", phone: "+1 555-890-1122", tier: "Platinum", visits: 8, spent: "$2,100" },
    { id: 3, name: "Victoria Kensington", email: "victoria@art.org", phone: "+1 555-442-9901", tier: "Gold", visits: 5, spent: "$1,380" },
    { id: 4, name: "Dr. Jonathan Crane", email: "crane@med.nyu", phone: "+1 555-123-9988", tier: "Gold", visits: 3, spent: "$890" },
  ]);

  const navLinks = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '#dashboard', onClick: () => setActiveTab('dashboard') },
    { label: 'Manage Customers', icon: Users, path: '#customers', onClick: () => setActiveTab('customers') },
    { label: 'Manage Staff', icon: UserCheck, path: '#staff', onClick: () => setActiveTab('staff') },
    { label: 'Manage Reservations', icon: CalendarCheck, path: '#reservations', onClick: () => setActiveTab('reservations'), badge: bookings.length },
    { label: 'Manage Menu', icon: UtensilsCrossed, path: '#menu', onClick: () => setActiveTab('menu'), badge: menuItems.length },
    { label: 'Manage Locations', icon: MapPin, path: '#locations', onClick: () => setActiveTab('locations') },
    { label: 'Manage Services', icon: Sparkles, path: '#services', onClick: () => setActiveTab('services') },
    { label: 'Reports & Analytics', icon: BarChart3, path: '#reports', onClick: () => setActiveTab('reports') },
    { label: 'System Settings', icon: Settings, path: '#settings', onClick: () => setActiveTab('settings') },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex">
      {/* Sidebar with exact Mocha Brown #6F4E37 */}
      <Sidebar
        title="Admin Portal"
        subtitle="Executive Control"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={navLinks.map(l => ({
          ...l,
          path: `/admin#${activeTab}`,
          end: activeTab === l.label.toLowerCase().split(' ')[1] || (l.label === 'Dashboard' && activeTab === 'dashboard')
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
                Admin: {activeTab.replace('-', ' ')}
              </h2>
              <p className="text-xs text-[#8E5B34]">Executive Administration Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              Live System Online
            </span>
          </div>
        </header>

        {/* Tab Content */}
        <main className="p-6 sm:p-8 flex-1 space-y-8">
          
          {/* 1. DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Daily Revenue</p>
                  <p className="font-serif text-3xl font-bold text-[#26160E] mt-2">$14,890.00</p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">↑ +18.4% vs last week</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Active Reservations</p>
                  <p className="font-serif text-3xl font-bold text-[#6F4E37] mt-2">{bookings.length}</p>
                  <p className="text-xs text-[#563B29] mt-1">Across 4 locations</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Active Staff on Floor</p>
                  <p className="font-serif text-3xl font-bold text-[#26160E] mt-2">{staffList.length}</p>
                  <p className="text-xs text-[#563B29] mt-1">Kitchen & Reception staff</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Total Patrons</p>
                  <p className="font-serif text-3xl font-bold text-[#26160E] mt-2">1,420</p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">↑ 24 new this week</p>
                </div>
              </div>

              {/* Recent Reservations Table */}
              <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#26160E]">Recent Table Bookings</h3>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('reservations')}>
                    Manage All ({bookings.length})
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-[11px]">
                        <th className="py-3 px-2">ID</th>
                        <th className="py-3 px-2">Guest</th>
                        <th className="py-3 px-2">Date & Time</th>
                        <th className="py-3 px-2">Party</th>
                        <th className="py-3 px-2">Location</th>
                        <th className="py-3 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4ECE1]">
                      {bookings.slice(0, 5).map((b) => (
                        <tr key={b.id} className="hover:bg-[#FAF6F0]">
                          <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">{b.id}</td>
                          <td className="py-3 px-2 font-semibold text-[#26160E]">{b.customerName}</td>
                          <td className="py-3 px-2 text-[#563B29]">{formatDate(b.date)} at {b.time}</td>
                          <td className="py-3 px-2 text-[#26160E]">{b.guests}</td>
                          <td className="py-3 px-2 text-[#563B29]">{b.location}</td>
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
            </div>
          )}

          {/* 2. MANAGE CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Customer Registry</h3>
                  <p className="text-xs text-[#563B29]">Manage registered patrons, VIP privileges, and spend history.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus}>Add New Customer</Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Patron</th>
                      <th className="py-3 px-2">Phone</th>
                      <th className="py-3 px-2">Privilege Tier</th>
                      <th className="py-3 px-2">Total Visits</th>
                      <th className="py-3 px-2">Lifetime Spend</th>
                      <th className="py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {customerList.map((c) => (
                      <tr key={c.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2">
                          <p className="font-bold text-[#26160E]">{c.name}</p>
                          <p className="text-xs text-[#8E5B34]">{c.email}</p>
                        </td>
                        <td className="py-3 px-2 text-[#563B29]">{c.phone}</td>
                        <td className="py-3 px-2">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F4ECE1] text-[#6F4E37] border border-[#D5BFA4]/40">
                            {c.tier}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-medium">{c.visits}</td>
                        <td className="py-3 px-2 font-mono font-bold text-[#26160E]">{c.spent}</td>
                        <td className="py-3 px-2">
                          <button className="text-xs font-bold text-[#6F4E37] hover:underline mr-3">Edit</button>
                          <button className="text-xs font-bold text-red-600 hover:underline">Revoke</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. MANAGE STAFF */}
          {activeTab === 'staff' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Staff Roster & Authorizations</h3>
                  <p className="text-xs text-[#563B29]">Manage kitchen, concierge, and floor staff assignments.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus}>Invite Staff Member</Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Name & Email</th>
                      <th className="py-3 px-2">Assigned Role</th>
                      <th className="py-3 px-2">Shift</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {staffList.map((s) => (
                      <tr key={s.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2">
                          <p className="font-bold text-[#26160E]">{s.name}</p>
                          <p className="text-xs text-[#8E5B34]">{s.email}</p>
                        </td>
                        <td className="py-3 px-2 font-semibold text-[#6F4E37]">{s.role}</td>
                        <td className="py-3 px-2 text-[#563B29]">{s.shift}</td>
                        <td className="py-3 px-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button className="text-xs font-bold text-[#6F4E37] hover:underline mr-3">Edit Shift</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. MANAGE RESERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">All Restaurant Reservations</h3>
                <p className="text-xs text-[#563B29]">Master oversight of all guest bookings across tables.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Booking ID</th>
                      <th className="py-3 px-2">Guest Name</th>
                      <th className="py-3 px-2">Phone</th>
                      <th className="py-3 px-2">Date & Time</th>
                      <th className="py-3 px-2">Party</th>
                      <th className="py-3 px-2">Assigned Table</th>
                      <th className="py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">{b.id}</td>
                        <td className="py-3 px-2 font-bold text-[#26160E]">{b.customerName}</td>
                        <td className="py-3 px-2 text-[#563B29]">{b.contactNumber}</td>
                        <td className="py-3 px-2 text-[#26160E]">{formatDate(b.date)} at {b.time}</td>
                        <td className="py-3 px-2">{b.guests}</td>
                        <td className="py-3 px-2 font-semibold text-[#6F4E37]">{b.tableNo || 'Unassigned'}</td>
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

          {/* 5. MANAGE MENU */}
          {activeTab === 'menu' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Menu Master Catalog</h3>
                  <p className="text-xs text-[#563B29]">Manage dishes, prices, descriptions, and signature items.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus}>Add Menu Item</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl border border-[#D5BFA4]/40 bg-[#FAF6F0] flex gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-sm text-[#26160E]">{item.name}</h4>
                        <span className="font-bold text-sm text-[#6F4E37]">{formatCurrency(item.price)}</span>
                      </div>
                      <p className="text-xs text-[#563B29] line-clamp-2">{item.description}</p>
                      <span className="inline-block text-[10px] uppercase font-bold text-[#8E5B34] bg-white px-2 py-0.5 rounded border border-[#D5BFA4]/40">
                        {item.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. MANAGE RESTAURANT LOCATIONS */}
          {activeTab === 'locations' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#26160E]">Restaurant Outlets & Floor Plans</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {['Manhattan Flagship (5th Ave)', 'Uptown Bistro & Lounge (Madison Ave)', 'Beverly Hills Garden Terrace', 'SoHo Culinary Loft'].map((loc, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D5BFA4]/60 space-y-2">
                    <span className="text-xs font-bold text-[#6F4E37] uppercase">Location 0{i + 1}</span>
                    <h4 className="font-serif font-bold text-lg text-[#26160E]">{loc}</h4>
                    <p className="text-xs text-[#563B29]">24 Tables • 96 Seating Capacity • Sommelier Cellar On-Site</p>
                    <div className="pt-2 flex gap-2">
                      <Button variant="outline" size="sm">Edit Floor Plan</Button>
                      <Button variant="primary" size="sm">Table Status</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. MANAGE SERVICES */}
          {activeTab === 'services' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#26160E]">Private Services & Buyouts</h3>
              <p className="text-sm text-[#563B29]">Configure private dining, tasting menus, and corporate buyout packages.</p>
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D5BFA4]/40">
                <p className="font-bold text-[#6F4E37]">Chef's Omakase & Tasting Table</p>
                <p className="text-xs text-[#563B29] mt-1">Status: Active • Price per seat: $195.00</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#D5BFA4]/40">
                <p className="font-bold text-[#6F4E37]">Subterranean Wine Cellar Buyout</p>
                <p className="text-xs text-[#563B29] mt-1">Status: Active • Price per seat: $240.00</p>
              </div>
            </div>
          )}

          {/* 8. REPORTS */}
          {activeTab === 'reports' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#26160E]">Revenue & Booking Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D5BFA4]/40 text-center">
                  <p className="text-xs font-bold uppercase text-[#8E5B34]">Average Check Size</p>
                  <p className="font-serif text-3xl font-bold text-[#6F4E37] mt-2">$142.50</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D5BFA4]/40 text-center">
                  <p className="text-xs font-bold uppercase text-[#8E5B34]">Table Turnaround</p>
                  <p className="font-serif text-3xl font-bold text-[#6F4E37] mt-2">1 hr 35 min</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D5BFA4]/40 text-center">
                  <p className="text-xs font-bold uppercase text-[#8E5B34]">Customer Return Rate</p>
                  <p className="font-serif text-3xl font-bold text-[#6F4E37] mt-2">78.2%</p>
                </div>
              </div>
            </div>
          )}

          {/* 9. SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6 max-w-2xl">
              <h3 className="font-serif text-xl font-bold text-[#26160E]">Restaurant System Configurations</h3>
              <div className="space-y-4 text-sm">
                <Input label="Restaurant Legal Name" id="cfg-name" defaultValue="Aura Mocha Haute Cuisine LLC" />
                <Input label="Master Notification Email" id="cfg-email" defaultValue="executive@auramocha.com" />
                <Input label="Default Table Turn Window (Hours)" id="cfg-turn" defaultValue="2" />
                <Button variant="primary" size="md">Save System Parameters</Button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default AdminPortal;
