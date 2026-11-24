import React, { useState } from 'react';
import { useAppStore } from '../../../store/store';
import { useAdminDatabase } from '../adminStore';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Armchair, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Eye, 
  UserPlus, 
  Search, 
  Filter,
  UtensilsCrossed,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const AdminDashboard = ({ onNavigateTab }) => {
  const { orders = [], tables = [], sessions = [] } = useAppStore();
  const { getAdminStaff, saveAdminStaff } = useAdminDatabase();

  const [staffList, setStaffList] = useState(() => getAdminStaff());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [addStaffModalOpen, setAddStaffModalOpen] = useState(false);
  const [staffSearch, setStaffSearch] = useState('');
  const [staffRoleFilter, setStaffRoleFilter] = useState('All');

  const [newStaffForm, setNewStaffForm] = useState({
    name: '',
    role: 'Waiter',
    email: '',
    phone: '',
    shift: 'Morning Shift',
    salary: '₹35,000'
  });

  // Calculate Metrics
  const totalOrdersCount = orders.length || 24;
  const totalRevenue = sessions.reduce((acc, s) => acc + (s.total || 0), 0) + 48650;
  const activeTablesCount = tables.filter(t => t.status === 'Occupied' || t.status === 'Reserved').length || 7;
  const totalTablesCount = tables.length || 16;
  const activeStaffCount = staffList.filter(s => s.status === 'Active').length;

  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    if (!newStaffForm.name || !newStaffForm.email) return;
    const item = {
      id: Date.now(),
      ...newStaffForm,
      status: 'Active',
      joined: 'Today'
    };
    const updated = [item, ...staffList];
    setStaffList(updated);
    saveAdminStaff(updated);
    setAddStaffModalOpen(false);
    setNewStaffForm({
      name: '',
      role: 'Waiter',
      email: '',
      phone: '',
      shift: 'Morning Shift',
      salary: '₹35,000'
    });
  };

  const filteredStaff = staffList.filter(s => {
    if (staffRoleFilter !== 'All' && s.role !== staffRoleFilter) return false;
    if (staffSearch.trim()) {
      const q = staffSearch.toLowerCase().trim();
      return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.phone.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Executive Hero Banner */}
      <div 
        className="relative rounded-3xl overflow-hidden p-6 sm:p-8 shadow-sm border border-[#E8DDD8]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(20, 10, 10, 0.94) 0%, rgba(35, 15, 18, 0.88) 50%, rgba(20, 10, 10, 0.92) 100%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E5A81E] text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>LUNAR System Live • Executive Control</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">Admin Overview & Performance</h1>
            <p className="text-xs sm:text-sm text-[#F5EDE8]/90 mt-1 max-w-2xl">
              Real-time synchronization across Orders, Financial Collections, Table Occupancy, and Culinary Staff operations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab && onNavigateTab('food-menu')}
              className="px-4 py-2.5 rounded-2xl bg-[#500F1D] border border-white/20 text-white font-semibold text-xs sm:text-sm hover:bg-[#3D0B16] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <UtensilsCrossed className="w-4 h-4 text-[#E5A81E]" />
              <span>Food Master</span>
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('kitchen-kds')}
              className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold text-xs sm:text-sm hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Kitchen & KDS</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* 1. Total Orders */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#FAF2EB] flex items-center justify-center text-[#500F1D] shadow-xs shrink-0">
              <ShoppingBag className="w-6 h-6 text-[#500F1D]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#75696B]">Total Orders</p>
              <div className="text-2xl font-serif font-bold text-[#2D2528] mt-0.5">{totalOrdersCount}</div>
              <span className="text-[11px] font-semibold text-[#15803D] flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" /> ↑ 14% vs yesterday
              </span>
            </div>
          </div>
        </div>

        {/* 2. Total Revenue */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#500F1D] flex items-center justify-center text-white shadow-xs shrink-0">
              <DollarSign className="w-6 h-6 text-[#E5A81E]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#75696B]">Total Revenue</p>
              <div className="text-2xl font-serif font-bold text-[#2D2528] mt-0.5">₹{totalRevenue.toLocaleString()}</div>
              <span className="text-[11px] font-semibold text-[#15803D] flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" /> ↑ 18% Net collection
              </span>
            </div>
          </div>
        </div>

        {/* 3. Active Tables */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#FAF2EB] flex items-center justify-center text-[#500F1D] shadow-xs shrink-0">
              <Armchair className="w-6 h-6 text-[#500F1D]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#75696B]">Active Tables</p>
              <div className="text-2xl font-serif font-bold text-[#2D2528] mt-0.5">
                {activeTablesCount} <span className="text-xs font-normal text-[#75696B]">/ {totalTablesCount}</span>
              </div>
              <span className="text-[11px] font-semibold text-[#D97706] flex items-center gap-1 mt-0.5">
                {Math.round((activeTablesCount / totalTablesCount) * 100)}% Occupancy Rate
              </span>
            </div>
          </div>
        </div>

        {/* 4. Staff Overview */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-xs flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#FAF2EB] flex items-center justify-center text-[#500F1D] shadow-xs shrink-0">
              <Users className="w-6 h-6 text-[#500F1D]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#75696B]">Staff Overview</p>
              <div className="text-2xl font-serif font-bold text-[#2D2528] mt-0.5">{activeStaffCount} On Duty</div>
              <span className="text-[11px] font-semibold text-[#15803D] flex items-center gap-1 mt-0.5">
                100% Shift Attendance
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Live Orders Monitor & Staff Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Live Orders Monitor */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E8DDD8] shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[#E8DDD8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2EB] text-[#500F1D] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2D2528]">Recent Order Stream</h3>
                <p className="text-xs text-[#75696B]">Latest orders across dine-in, takeaway and delivery</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] font-bold text-xs">
              Live Sync Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#FAF1EB]">
                <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                  <th className="py-3.5 px-4 rounded-l-2xl">Order ID</th>
                  <th className="py-3.5 px-4">Table</th>
                  <th className="py-3.5 px-4">Items Summary</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center rounded-r-2xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5EDE8] text-xs sm:text-sm">
                {[
                  { id: '#ORD-1049', table: 'T02', items: '2x Truffle Risotto, 1x Mocktail', amount: 1060, time: '3 mins ago', status: 'Preparing' },
                  { id: '#ORD-1048', table: 'T05', items: '1x Margherita Pizza, 2x Tandoori Murgh', amount: 1170, time: '8 mins ago', status: 'Ready' },
                  { id: '#ORD-1047', table: 'T01', items: '1x Chocolate Fondant, 2x Espresso', amount: 690, time: '14 mins ago', status: 'Served' },
                  { id: '#ORD-1046', table: 'T08', items: '3x Paneer Tikka, 4x Garlic Naan', amount: 1320, time: '21 mins ago', status: 'Completed' },
                  { id: '#ORD-1045', table: 'T03', items: '1x Chicken Milanese, 1x Red Wine', amount: 980, time: '32 mins ago', status: 'Completed' }
                ].map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF7F5] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#500F1D]">{ord.id}</td>
                    <td className="py-3.5 px-4 font-bold text-[#2D2528]">{ord.table}</td>
                    <td className="py-3.5 px-4 text-[#75696B] font-medium max-w-[200px] truncate">{ord.items}</td>
                    <td className="py-3.5 px-4 font-bold text-[#2D2528]">₹{ord.amount}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        ord.status === 'Preparing' ? 'bg-[#FEF9C3] text-[#B45309]' :
                        ord.status === 'Ready' ? 'bg-[#DBEAFE] text-[#1E40AF]' :
                        ord.status === 'Served' ? 'bg-[#E0E7FF] text-[#4338CA]' :
                        'bg-[#DCFCE7] text-[#15803D]'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="w-8 h-8 rounded-xl bg-[#FAF2EB] text-[#500F1D] hover:bg-[#F2E5DC] inline-flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Staff Overview & Attendance */}
        <div className="bg-white rounded-3xl border border-[#E8DDD8] shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2D2528]">Staff Roster</h3>
                <p className="text-xs text-[#75696B]">Active team members on duty</p>
              </div>
              <button
                onClick={() => setAddStaffModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0B16] transition-all cursor-pointer shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add Staff</span>
              </button>
            </div>

            <div className="py-3 space-y-3">
              {staffList.slice(0, 5).map((staff) => (
                <div key={staff.id} className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#500F1D] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                      {staff.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[#2D2528] leading-tight">{staff.name}</p>
                      <p className="text-[11px] text-[#75696B] leading-tight mt-0.5">{staff.role} • {staff.shift}</p>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-xs" title="Online & Active"></span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E8DDD8] flex items-center justify-between text-xs text-[#75696B]">
            <span>Total registered staff: <strong>{staffList.length}</strong></span>
            <span className="font-semibold text-[#500F1D]">All shifts active</span>
          </div>
        </div>
      </div>

      {/* Staff Directory Full Table */}
      <div className="bg-white rounded-3xl border border-[#E8DDD8] shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#E8DDD8] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#2D2528]">Restaurant Staff Directory</h3>
            <p className="text-xs text-[#75696B]">Comprehensive operational records, contact details and shift allocations</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#75696B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search staff..."
                value={staffSearch}
                onChange={(e) => setStaffSearch(e.target.value)}
                className="bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl pl-9 pr-4 py-2 text-xs text-[#2D2528] placeholder-[#75696B] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs"
              />
            </div>

            <select
              value={staffRoleFilter}
              onChange={(e) => setStaffRoleFilter(e.target.value)}
              className="bg-[#FAF7F5] border border-[#E8DDD8] rounded-2xl px-3 py-2 text-xs font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D] shadow-2xs cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Kitchen">Kitchen Chef</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Waiter">Waiter</option>
              <option value="Bartender">Bartender</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#FAF1EB]">
              <tr className="text-[#500F1D] font-bold text-xs sm:text-sm">
                <th className="py-3.5 px-4 rounded-l-2xl">Staff Name</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Shift</th>
                <th className="py-3.5 px-4">Salary</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center rounded-r-2xl">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EDE8] text-xs sm:text-sm">
              {filteredStaff.map((st) => (
                <tr key={st.id} className="hover:bg-[#FAF7F5] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#2D2528] whitespace-nowrap">{st.name}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full bg-[#FAF2EB] text-[#500F1D] font-bold text-xs border border-[#E8DDD8]">
                      {st.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-xs text-[#75696B]">
                    <div>{st.email}</div>
                    <div className="font-semibold text-[#2D2528]">{st.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#2D2528] whitespace-nowrap">{st.shift}</td>
                  <td className="py-3.5 px-4 font-bold text-[#2D2528] whitespace-nowrap">{st.salary}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] font-bold text-xs">
                      {st.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-xs text-[#75696B] whitespace-nowrap">{st.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {addStaffModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#E8DDD8] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2D2528]">Add Staff Member</h3>
                <p className="text-xs text-[#75696B]">Register new personnel into the restaurant system</p>
              </div>
              <button
                onClick={() => setAddStaffModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF7F5] hover:bg-[#F2EAE4] flex items-center justify-center text-[#75696B] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStaffSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#2D2528] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={newStaffForm.name}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E8DDD8] bg-[#FAF7F5] font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2D2528] mb-1">Role</label>
                  <select
                    value={newStaffForm.role}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, role: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E8DDD8] bg-[#FAF7F5] font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D] cursor-pointer"
                  >
                    <option value="Manager">Manager</option>
                    <option value="Kitchen">Kitchen Chef</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Waiter">Waiter</option>
                    <option value="Bartender">Bartender</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#2D2528] mb-1">Shift</label>
                  <select
                    value={newStaffForm.shift}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, shift: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E8DDD8] bg-[#FAF7F5] font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D] cursor-pointer"
                  >
                    <option value="Morning Shift">Morning (07 AM – 03 PM)</option>
                    <option value="Evening Shift">Evening (03 PM – 11 PM)</option>
                    <option value="Night Shift">Night (07 PM – 03 AM)</option>
                    <option value="General Shift">General (10 AM – 07 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2D2528] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@lunar.com"
                  value={newStaffForm.email}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E8DDD8] bg-[#FAF7F5] font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2D2528] mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 00000"
                    value={newStaffForm.phone}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E8DDD8] bg-[#FAF7F5] font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2D2528] mb-1">Salary Monthly</label>
                  <input
                    type="text"
                    placeholder="₹35,000"
                    value={newStaffForm.salary}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, salary: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E8DDD8] bg-[#FAF7F5] font-semibold text-[#2D2528] focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setAddStaffModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-[#75696B] font-bold hover:bg-[#FAF7F5] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#500F1D] text-white font-bold hover:bg-[#3D0B16] transition-all cursor-pointer shadow-sm"
                >
                  Save Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-[#E8DDD8] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#E8DDD8] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#2D2528]">{selectedOrder.id} Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-7 h-7 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#75696B] cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs text-[#2D2528]">
              <p><strong>Table:</strong> {selectedOrder.table}</p>
              <p><strong>Items:</strong> {selectedOrder.items}</p>
              <p><strong>Total Amount:</strong> ₹{selectedOrder.amount}</p>
              <p><strong>Status:</strong> <span className="font-bold text-[#500F1D]">{selectedOrder.status}</span></p>
              <p><strong>Time:</strong> {selectedOrder.time}</p>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2 rounded-xl bg-[#500F1D] text-white font-bold text-xs hover:bg-[#3D0B16] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;
