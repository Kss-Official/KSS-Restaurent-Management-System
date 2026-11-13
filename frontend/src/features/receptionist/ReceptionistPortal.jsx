import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { useAppStore } from '../../store/store';
import { formatDate } from '../../utils/helpers';
import Button from '../../components/common/Button';
import { 
  ConciergeBell, 
  CalendarClock, 
  CheckCircle2, 
  UserCheck, 
  Grid, 
  Users, 
  Menu, 
  Phone, 
  MapPin, 
  Plus, 
  Search 
} from 'lucide-react';

export const ReceptionistPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { bookings, updateBookingStatus, tables, updateTableStatus } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(b => 
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed');
  const checkedInCount = bookings.filter(b => b.status === 'Checked-In' || b.status === 'Completed').length;

  const navLinks = [
    { label: 'Reception Dashboard', icon: ConciergeBell, path: '#dashboard', onClick: () => setActiveTab('dashboard') },
    { label: 'New Reservations', icon: CalendarClock, path: '#new', onClick: () => setActiveTab('new'), badge: bookings.length },
    { label: 'Confirmed Reservations', icon: CheckCircle2, path: '#confirmed', onClick: () => setActiveTab('confirmed'), badge: confirmedBookings.length },
    { label: 'Check-in Guests', icon: UserCheck, path: '#checkin', onClick: () => setActiveTab('checkin') },
    { label: 'Table Allocation', icon: Grid, path: '#tables', onClick: () => setActiveTab('tables') },
    { label: 'Manage Guest Details', icon: Users, path: '#guests', onClick: () => setActiveTab('guests') },
  ];

  const handleCheckIn = (bookingId) => {
    updateBookingStatus(bookingId, 'Checked-In');
    alert(`Guest for ${bookingId} has been checked in and escorted to their assigned table.`);
  };

  const handleAllocateTable = (bookingId, tableNumber) => {
    updateBookingStatus(bookingId, 'Confirmed', `Table ${tableNumber}`);
    updateTableStatus(`T-0${tableNumber}`, 'Occupied');
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex">
      {/* Sidebar with exact Mocha Brown #6F4E37 */}
      <Sidebar
        title="Reception Portal"
        subtitle="Concierge & Seating"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={navLinks.map(l => ({
          ...l,
          path: `/receptionist#${activeTab}`,
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
                Front Desk Concierge
              </h2>
              <p className="text-xs text-[#8E5B34]">Table Seating & Reservation Desk</p>
            </div>
          </div>

          <div className="relative w-64 hidden sm:block">
            <Search className="w-4 h-4 text-[#8E5B34] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guest or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[#D5BFA4] bg-[#FAF6F0] focus:ring-2 focus:ring-[#6F4E37] focus:outline-none"
            />
          </div>
        </header>

        {/* Content */}
        <main className="p-6 sm:p-8 flex-1 space-y-8">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-[#D5BFA4]/50 shadow-sm">
              <p className="text-xs uppercase font-bold text-[#8E5B34]">Today's Arrivals</p>
              <p className="font-serif text-3xl font-bold text-[#6F4E37] mt-1">{bookings.length}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#D5BFA4]/50 shadow-sm">
              <p className="text-xs uppercase font-bold text-[#8E5B34]">Confirmed Bookings</p>
              <p className="font-serif text-3xl font-bold text-[#26160E] mt-1">{confirmedBookings.length}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#D5BFA4]/50 shadow-sm">
              <p className="text-xs uppercase font-bold text-[#8E5B34]">Seated Guests</p>
              <p className="font-serif text-3xl font-bold text-emerald-800 mt-1">{checkedInCount}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#D5BFA4]/50 shadow-sm">
              <p className="text-xs uppercase font-bold text-[#8E5B34]">Available Tables</p>
              <p className="font-serif text-3xl font-bold text-[#6F4E37] mt-1">
                {tables.filter(t => t.status === 'Available').length} / {tables.length}
              </p>
            </div>
          </div>

          {/* Table Allocation Visual Grid */}
          <div className="bg-white rounded-2xl p-6 border border-[#D5BFA4]/50 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Dining Floor Plan & Live Table Status</h3>
                <p className="text-xs text-[#563B29]">Click any table to view seating or reassign status.</p>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Available</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> Occupied</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Reserved</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 pt-2">
              {tables.map((table) => {
                const isOccupied = table.status === 'Occupied';
                const isReserved = table.status === 'Reserved';
                return (
                  <div
                    key={table.id}
                    onClick={() => {
                      const next = table.status === 'Available' ? 'Reserved' : table.status === 'Reserved' ? 'Occupied' : 'Available';
                      updateTableStatus(table.id, next);
                    }}
                    className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all hover:scale-105 shadow-sm ${
                      isOccupied
                        ? 'bg-red-50 border-red-300 text-red-900'
                        : isReserved
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    }`}
                  >
                    <p className="text-xs font-bold uppercase">Table {table.number}</p>
                    <p className="font-serif text-xl font-bold my-1">{table.capacity}p</p>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white shadow-xs">
                      {table.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guest Check-In & Reservations Queue */}
          <div className="bg-white rounded-2xl p-6 border border-[#D5BFA4]/50 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#26160E]">Reservation Queue & Fast Check-In</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                    <th className="py-3 px-2">Booking ID</th>
                    <th className="py-3 px-2">Guest Name</th>
                    <th className="py-3 px-2">Phone</th>
                    <th className="py-3 px-2">Scheduled Time</th>
                    <th className="py-3 px-2">Party</th>
                    <th className="py-3 px-2">Assigned Table</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4ECE1]">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FAF6F0]">
                      <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">{b.id}</td>
                      <td className="py-3 px-2 font-bold text-[#26160E]">{b.customerName}</td>
                      <td className="py-3 px-2 text-[#563B29]">{b.contactNumber}</td>
                      <td className="py-3 px-2 text-[#26160E]">{formatDate(b.date)} at {b.time}</td>
                      <td className="py-3 px-2">{b.guests}</td>
                      <td className="py-3 px-2">
                        <select
                          value={b.tableNo || 'Table 1'}
                          onChange={(e) => updateBookingStatus(b.id, b.status, e.target.value)}
                          className="text-xs p-1.5 rounded border border-[#D5BFA4] bg-white text-[#26160E]"
                        >
                          {[1,2,3,4,5,6,7,8,12,18].map(n => (
                            <option key={n} value={`Table ${n}`}>Table {n}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          b.status === 'Checked-In' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        {b.status !== 'Checked-In' ? (
                          <Button
                            variant="primary"
                            size="sm"
                            icon={CheckCircle2}
                            onClick={() => handleCheckIn(b.id)}
                          >
                            Check In
                          </Button>
                        ) : (
                          <span className="text-xs font-semibold text-emerald-700">Seated</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ReceptionistPortal;
