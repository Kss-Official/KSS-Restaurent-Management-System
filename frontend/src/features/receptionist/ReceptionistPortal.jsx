import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { useAppStore } from '../../store/store';
import { formatCurrency, formatDate, getQrCodeUrl } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { 
  ConciergeBell, 
  CalendarClock, 
  Users, 
  UserCheck, 
  QrCode, 
  CreditCard, 
  UtensilsCrossed, 
  XCircle, 
  MessageSquareWarning, 
  Bell, 
  User, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Layers, 
  Menu, 
  Eye, 
  Phone, 
  X, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export const ReceptionistPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Centralized Store
  const { 
    currentUser, 
    tables, 
    updateTableStatus, 
    sessions, 
    startTableSession, 
    settleSessionPayment, 
    completeSessionAndCleanTable, 
    bookings, 
    addBooking, 
    cancelBooking, 
    orders, 
    waitingList, 
    addWaitingGuest, 
    updateWaitingStatus, 
    complaints, 
    notifications, 
    markNotificationRead 
  } = useAppStore();

  // Search & Filters
  const [guestSearch, setGuestSearch] = useState('');
  const [qrInputCode, setQrInputCode] = useState('');
  const [verifiedBooking, setVerifiedBooking] = useState(null);
  const [selectedTableNumber, setSelectedTableNumber] = useState(1);

  // Modals
  const [newReservationModal, setNewReservationModal] = useState(false);
  const [newWaitModal, setNewWaitModal] = useState(false);
  const [complaintModal, setComplaintModal] = useState(false);
  const [viewVoucherModal, setViewVoucherModal] = useState(null);

  // Form states
  const [resForm, setResForm] = useState({
    customerName: '', contactNumber: '', location: 'Manhattan Flagship (Downtown 5th Ave)',
    date: new Date().toISOString().split('T')[0], time: '07:30 PM', guests: '4 People', specialRequests: ''
  });

  const [waitForm, setWaitForm] = useState({
    name: '', phone: '', guests: '2 People', waitTime: '15 mins', notes: ''
  });

  const [complaintForm, setComplaintForm] = useState({
    guest: '', table: 'Table 2', issue: ''
  });

  // Sidebar navigation mapping according to Specification
  const navLinks = [
    { label: '1. Dashboard', icon: ConciergeBell, tabId: 'dashboard' },
    { label: '2. Reservations', icon: CalendarClock, tabId: 'reservations', badge: bookings.filter(b => b.status === 'Confirmed').length },
    { label: '3. Waiting List Queue', icon: Clock, tabId: 'waiting-list', badge: waitingList.filter(w => w.status === 'Waiting').length },
    { label: '4. Customer Directory', icon: Users, tabId: 'customers' },
    { label: '5. QR Check-in & Sessions', icon: QrCode, tabId: 'checkin-sessions', badge: sessions.filter(s => s.status === 'Active').length },
    { label: '6. Payment Status', icon: CreditCard, tabId: 'payments' },
    { label: '7. Orders Overview', icon: UtensilsCrossed, tabId: 'orders-view' },
    { label: '8. Cancellations', icon: XCircle, tabId: 'cancellations', badge: bookings.filter(b => b.status === 'Cancelled').length },
    { label: '9. Feedback & Complaints', icon: MessageSquareWarning, tabId: 'complaints' },
    { label: '10. Live Notifications', icon: Bell, tabId: 'notifications', badge: notifications.filter(n => n.unread).length },
    { label: '11. My Profile', icon: User, tabId: 'profile' },
  ];

  // QR Code Verification and Table Check-In
  const handleVerifyQR = (e) => {
    e.preventDefault();
    const found = bookings.find(b => 
      b.qrCode?.toUpperCase() === qrInputCode.trim().toUpperCase() ||
      b.id.toUpperCase() === qrInputCode.trim().toUpperCase()
    );
    if (found) {
      setVerifiedBooking(found);
    } else {
      alert("Invalid QR Code or Booking ID. Please verify the customer voucher.");
      setVerifiedBooking(null);
    }
  };

  const handlePerformCheckIn = (booking) => {
    // Generate 6-digit session, assign physical table, link customer
    const sessionId = startTableSession({
      tableNumber: selectedTableNumber,
      guestName: booking.customerName,
      guestPhone: booking.contactNumber,
      partySize: parseInt(booking.guests) || 2,
      reservationId: booking.id,
      advancePaid: booking.advancePaid || 50
    });
    alert(`Guest Checked In Successfully!\nAssigned Table: Table ${selectedTableNumber}\nDaily 6-Digit Session ID Generated: #${sessionId}`);
    setVerifiedBooking(null);
    setQrInputCode('');
    setActiveTab('checkin-sessions');
  };

  const handleCreateReservation = (e) => {
    e.preventDefault();
    addBooking(resForm);
    setNewReservationModal(false);
    setResForm({
      customerName: '', contactNumber: '', location: 'Manhattan Flagship (Downtown 5th Ave)',
      date: new Date().toISOString().split('T')[0], time: '07:30 PM', guests: '4 People', specialRequests: ''
    });
    alert("New reservation logged and QR Voucher created.");
  };

  const handleAddWaitGuest = (e) => {
    e.preventDefault();
    addWaitingGuest(waitForm);
    setNewWaitModal(false);
    setWaitForm({ name: '', phone: '', guests: '2 People', waitTime: '15 mins', notes: '' });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex">
      {/* Sidebar */}
      <Sidebar
        title="Reception Portal"
        subtitle="Concierge & Front Desk"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={navLinks}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

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
                Front Desk: {navLinks.find(l => l.tabId === activeTab)?.label.replace(/^\d+\.\s*/, '')}
              </h2>
              <p className="text-xs text-[#8E5B34]">Guest Arrivals, Table Check-In & Concierge Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Concierge Active
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
              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Today's Arrivals</p>
                  <p className="font-serif text-3xl font-bold text-[#6F4E37] mt-2">{bookings.length}</p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">
                    {bookings.filter(b => b.status === 'Checked-In').length} already seated
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Waiting List Queue</p>
                  <p className="font-serif text-3xl font-bold text-amber-700 mt-2">{waitingList.length}</p>
                  <p className="text-xs text-[#563B29] mt-1">Walk-in parties in lounge</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Available Tables</p>
                  <p className="font-serif text-3xl font-bold text-[#26160E] mt-2">
                    {tables.filter(t => t.status === 'Available').length} / {tables.length}
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">Ready for seating</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D5BFA4]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#8E5B34]">Active Table Sessions</p>
                  <p className="font-serif text-3xl font-bold text-[#26160E] mt-2">
                    {sessions.filter(s => s.status === 'Active').length}
                  </p>
                  <p className="text-xs text-[#563B29] mt-1">With 6-digit session codes</p>
                </div>
              </div>

              {/* Fast Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md" icon={QrCode} onClick={() => setActiveTab('checkin-sessions')}>
                  Scan & Check-In Customer
                </Button>
                <Button variant="outline" size="md" icon={CalendarClock} onClick={() => setNewReservationModal(true)}>
                  New Reservation
                </Button>
                <Button variant="secondary" size="md" icon={Clock} onClick={() => setNewWaitModal(true)}>
                  Add to Waiting List
                </Button>
              </div>

              {/* Today's Expected Bookings List */}
              <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Today's Expected Reservations</h3>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('reservations')}>
                    View All ({bookings.length})
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                        <th className="py-3 px-2">Booking ID</th>
                        <th className="py-3 px-2">Guest Name</th>
                        <th className="py-3 px-2">Party</th>
                        <th className="py-3 px-2">Scheduled</th>
                        <th className="py-3 px-2">Assigned Table</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2">Fast Check-In</th>
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
                          <td className="py-3 px-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                              {b.status}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            {b.status !== 'Checked-In' ? (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                  setVerifiedBooking(b);
                                  setActiveTab('checkin-sessions');
                                }}
                              >
                                Check In
                              </Button>
                            ) : (
                              <span className="text-xs font-bold text-emerald-800">Seated #{b.sessionId}</span>
                            )}
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
              2. RESERVATIONS MANAGEMENT
             ======================================================== */}
          {activeTab === 'reservations' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Reservations Master Registry</h3>
                  <p className="text-xs text-[#563B29]">Review, create, modify bookings, and preview customer QR codes.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus} onClick={() => setNewReservationModal(true)}>
                  New Reservation
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">ID</th>
                      <th className="py-3 px-2">Guest Name</th>
                      <th className="py-3 px-2">Phone</th>
                      <th className="py-3 px-2">Date & Time</th>
                      <th className="py-3 px-2">Party</th>
                      <th className="py-3 px-2">Table</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">{b.id}</td>
                        <td className="py-3 px-2 font-bold text-[#26160E]">{b.customerName}</td>
                        <td className="py-3 px-2 text-[#563B29]">{b.contactNumber}</td>
                        <td className="py-3 px-2 text-xs">{formatDate(b.date)} at {b.time}</td>
                        <td className="py-3 px-2">{b.guests}</td>
                        <td className="py-3 px-2 font-semibold text-[#6F4E37]">{b.tableNo}</td>
                        <td className="py-3 px-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setViewVoucherModal(b)}
                              className="text-xs font-bold text-[#6F4E37] hover:underline"
                            >
                              QR Voucher
                            </button>
                            {b.status === 'Confirmed' && (
                              <button
                                onClick={() => cancelBooking(b.id)}
                                className="text-xs font-bold text-red-600 hover:underline"
                              >
                                Cancel
                              </button>
                            )}
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
              3. WAITING LIST QUEUE
             ======================================================== */}
          {activeTab === 'waiting-list' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Walk-In Waiting Queue</h3>
                  <p className="text-xs text-[#563B29]">Track guest waiting time, notify patrons by SMS/Call, and assign ready tables.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus} onClick={() => setNewWaitModal(true)}>
                  Add Walk-In Guest
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {waitingList.map((w) => (
                  <div key={w.id} className="p-5 rounded-2xl border border-[#D5BFA4]/50 bg-[#FAF6F0] space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#6F4E37]">{w.id}</span>
                        <h4 className="font-serif font-bold text-base text-[#26160E] mt-0.5">{w.name}</h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        w.status === 'Notified' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {w.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#563B29] space-y-1">
                      <p><span className="font-bold">Party Size:</span> {w.guests}</p>
                      <p><span className="font-bold">Contact:</span> {w.phone}</p>
                      <p><span className="font-bold">Estimated Wait:</span> {w.waitTime}</p>
                      <p><span className="font-bold">Queued At:</span> {w.addedAt}</p>
                    </div>

                    <div className="pt-2 border-t border-[#D5BFA4]/30 flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          updateWaitingStatus(w.id, 'Notified');
                          alert(`Notification sent to ${w.name}'s mobile (${w.phone}): Your table is ready!`);
                        }}
                      >
                        Notify Table Ready
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              4. CUSTOMER DIRECTORY
             ======================================================== */}
          {activeTab === 'customers' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Patron & Guest Directory</h3>
                  <p className="text-xs text-[#563B29]">Search guest history, lifetime reservations, and dining preferences.</p>
                </div>
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-[#8E5B34] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name or phone..."
                    value={guestSearch}
                    onChange={e => setGuestSearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[#D5BFA4] bg-[#FAF6F0]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Guest Name</th>
                      <th className="py-3 px-2">Phone</th>
                      <th className="py-3 px-2">Privilege Tier</th>
                      <th className="py-3 px-2">Total Visits</th>
                      <th className="py-3 px-2">Last Visit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {[
                      { name: "Sophia Montgomery", phone: "+1 (555) 392-8819", tier: "Black Gold Connoisseur", visits: 18, last: "Today (Session #000001)" },
                      { name: "Lord Alistair Sterling", phone: "+1 (555) 890-1122", tier: "Platinum Member", visits: 12, last: "Today (Session #000002)" },
                      { name: "Victoria Kensington", phone: "+1 (555) 442-9901", tier: "Gold Member", visits: 9, last: "Today (Session #000003)" },
                      { name: "Dr. Jonathan Crane", phone: "+1 (555) 123-9988", tier: "Gold Member", visits: 5, last: "Nov 08, 2026" },
                    ].map((g, i) => (
                      <tr key={i} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-bold text-[#26160E]">{g.name}</td>
                        <td className="py-3 px-2 text-[#563B29]">{g.phone}</td>
                        <td className="py-3 px-2 font-semibold text-[#6F4E37]">{g.tier}</td>
                        <td className="py-3 px-2 font-mono font-bold">{g.visits} visits</td>
                        <td className="py-3 px-2 text-xs text-[#8E5B34]">{g.last}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              5. QR CHECK-IN & 6-DIGIT TABLE SESSIONS
             ======================================================== */}
          {activeTab === 'checkin-sessions' && (
            <div className="space-y-8">
              {/* QR Scanner / Input Box */}
              <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Scan or Enter Booking QR Code</h3>
                  <p className="text-xs text-[#563B29]">
                    Verify arrival, assign physical table, and generate the daily six-digit Table Session ID (000001, 000002...).
                  </p>
                </div>

                <form onSubmit={handleVerifyQR} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                  <div className="relative flex-1">
                    <QrCode className="w-5 h-5 text-[#6F4E37] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. BK-90214 or BK-90214-QR-SOPHIA"
                      value={qrInputCode}
                      onChange={e => setQrInputCode(e.target.value)}
                      className="w-full text-sm pl-11 pr-4 py-3 rounded-xl border border-[#D5BFA4] bg-[#FAF6F0] focus:ring-2 focus:ring-[#6F4E37]"
                      required
                    />
                  </div>
                  <Button type="submit" variant="primary" size="md">
                    Verify QR Code
                  </Button>
                </form>

                {/* Verified Details Card & Table Allocation */}
                {verifiedBooking && (
                  <div className="p-6 rounded-2xl bg-[#F4ECE1] border border-[#D5BFA4] space-y-4 max-w-xl animate-fadeIn">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-[#6F4E37] bg-white px-2 py-1 rounded">
                        {verifiedBooking.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        {verifiedBooking.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#3E271A] space-y-1">
                      <p><span className="font-bold">Guest:</span> {verifiedBooking.customerName}</p>
                      <p><span className="font-bold">Contact:</span> {verifiedBooking.contactNumber}</p>
                      <p><span className="font-bold">Party Size:</span> {verifiedBooking.guests}</p>
                      <p><span className="font-bold">Advance Deposit Paid:</span> {formatCurrency(verifiedBooking.advancePaid || 50)}</p>
                    </div>

                    {/* Table Assignment Selector */}
                    <div className="space-y-1.5 pt-2 border-t border-[#D5BFA4]/40">
                      <label className="text-xs font-bold uppercase text-[#8E5B34]">Assign Physical Table</label>
                      <select
                        value={selectedTableNumber}
                        onChange={e => setSelectedTableNumber(parseInt(e.target.value))}
                        className="w-full text-xs p-2.5 rounded-lg border border-[#D5BFA4] bg-white"
                      >
                        {tables.map(t => (
                          <option key={t.id} value={t.number}>
                            Table {t.number} ({t.capacity}p - {t.section}) - Status: {t.status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Button
                      variant="gold"
                      size="lg"
                      className="w-full mt-2"
                      onClick={() => handlePerformCheckIn(verifiedBooking)}
                    >
                      Complete Check-In & Generate Session ID
                    </Button>
                  </div>
                )}
              </div>

              {/* Active Sessions List */}
              <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Active Table Sessions & Fast Checkout</h3>
                  <p className="text-xs text-[#563B29]">Daily 6-digit session codes synced across all portals.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                        <th className="py-3 px-2">Session ID</th>
                        <th className="py-3 px-2">Table</th>
                        <th className="py-3 px-2">Guest</th>
                        <th className="py-3 px-2">Check-In</th>
                        <th className="py-3 px-2">Net Bill</th>
                        <th className="py-3 px-2">Payment</th>
                        <th className="py-3 px-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4ECE1]">
                      {sessions.map((s) => (
                        <tr key={s.sessionId} className="hover:bg-[#FAF6F0]">
                          <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">#{s.sessionId}</td>
                          <td className="py-3 px-2 font-bold text-[#26160E]">Table {s.tableNumber}</td>
                          <td className="py-3 px-2">{s.guestName}</td>
                          <td className="py-3 px-2 text-xs">{s.checkInTime}</td>
                          <td className="py-3 px-2 font-mono font-bold">{formatCurrency(s.total)}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              s.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {s.paymentStatus}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              {s.paymentStatus !== 'Paid' ? (
                                <button
                                  onClick={() => settleSessionPayment(s.sessionId, 'Card')}
                                  className="text-xs font-bold text-[#6F4E37] hover:underline"
                                >
                                  Settle Bill
                                </button>
                              ) : (
                                <button
                                  onClick={() => completeSessionAndCleanTable(s.sessionId)}
                                  className="text-xs font-bold text-purple-700 hover:underline"
                                >
                                  Check Out & Clean Table
                                </button>
                              )}
                            </div>
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
              6. PAYMENT STATUS
             ======================================================== */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Billing & Advance Payment Audits</h3>
                <p className="text-xs text-[#563B29]">Reconcile deposit advances and view session settlement receipts.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Session</th>
                      <th className="py-3 px-2">Guest</th>
                      <th className="py-3 px-2">Table</th>
                      <th className="py-3 px-2">Advance Offset</th>
                      <th className="py-3 px-2">Amount Due</th>
                      <th className="py-3 px-2">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {sessions.map((s) => (
                      <tr key={s.sessionId} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">#{s.sessionId}</td>
                        <td className="py-3 px-2 font-bold">{s.guestName}</td>
                        <td className="py-3 px-2">Table {s.tableNumber}</td>
                        <td className="py-3 px-2 font-mono text-emerald-700">-{formatCurrency(s.advancePayment)}</td>
                        <td className="py-3 px-2 font-mono font-bold">{formatCurrency(s.total)}</td>
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
              7. ORDERS OVERVIEW
             ======================================================== */}
          {activeTab === 'orders-view' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Table-Wise & Session-Wise Orders</h3>
                <p className="text-xs text-[#563B29]">Track dining orders dispatched to the kitchen per table session.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Order ID</th>
                      <th className="py-3 px-2">Session ID</th>
                      <th className="py-3 px-2">Table</th>
                      <th className="py-3 px-2">Dishes</th>
                      <th className="py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-mono font-bold text-[#6F4E37]">{ord.id}</td>
                        <td className="py-3 px-2 font-mono font-bold">#{ord.sessionId}</td>
                        <td className="py-3 px-2 font-bold">Table {ord.tableNumber}</td>
                        <td className="py-3 px-2 text-xs">
                          {ord.items.map(it => `${it.qty}x ${it.name}`).join(', ')}
                        </td>
                        <td className="py-3 px-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F4ECE1] text-[#6F4E37]">
                            {ord.status}
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
              8. CANCELLATIONS
             ======================================================== */}
          {activeTab === 'cancellations' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#26160E]">Cancellation & Refund Requests</h3>
                <p className="text-xs text-[#563B29]">Process customer cancellations according to restaurant reservation policies.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#F4ECE1] text-[#8E5B34] uppercase text-xs">
                      <th className="py-3 px-2">Booking ID</th>
                      <th className="py-3 px-2">Guest Name</th>
                      <th className="py-3 px-2">Reason</th>
                      <th className="py-3 px-2">Advance Deposit</th>
                      <th className="py-3 px-2">Refund Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ECE1]">
                    {bookings.filter(b => b.status === 'Cancelled').map((b) => (
                      <tr key={b.id} className="hover:bg-[#FAF6F0]">
                        <td className="py-3 px-2 font-mono font-bold text-red-700">{b.id}</td>
                        <td className="py-3 px-2 font-bold">{b.customerName}</td>
                        <td className="py-3 px-2 text-xs italic">{b.cancelReason || 'Customer requested cancellation'}</td>
                        <td className="py-3 px-2 font-mono text-emerald-800">{formatCurrency(b.advancePaid || 50)}</td>
                        <td className="py-3 px-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                            Refund Approved
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
              9. FEEDBACK & COMPLAINTS
             ======================================================== */}
          {activeTab === 'complaints' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26160E]">Register Guest Feedback / Complaints</h3>
                  <p className="text-xs text-[#563B29]">Log front-desk guest concerns and forward directly to Floor Manager.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus} onClick={() => setComplaintModal(true)}>
                  Log Front-Desk Complaint
                </Button>
              </div>

              <div className="space-y-4">
                {complaints.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl border border-[#D5BFA4]/50 bg-[#FAF6F0] space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-[#26160E]">{c.guest} ({c.table})</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                        {c.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#563B29] italic">"{c.issue}"</p>
                    {c.resolution && <p className="text-xs text-emerald-700 font-semibold">Resolution: {c.resolution}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              10. NOTIFICATIONS
             ======================================================== */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-6 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#26160E]">Live Operational Alerts</h3>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 rounded-xl border flex items-center justify-between ${
                    n.unread ? 'bg-[#F4ECE1] border-[#6F4E37]' : 'bg-[#FAF6F0] border-[#D5BFA4]/40'
                  }`}>
                    <div>
                      <p className="font-bold text-sm text-[#26160E]">{n.title}</p>
                      <p className="text-xs text-[#563B29] mt-0.5">{n.message}</p>
                      <p className="text-[10px] text-[#8E5B34] mt-1">{n.time}</p>
                    </div>
                    {n.unread && (
                      <button
                        onClick={() => markNotificationRead(n.id)}
                        className="text-xs font-bold text-[#6F4E37] hover:underline"
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              11. MY PROFILE
             ======================================================== */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-[#D5BFA4]/50 shadow-sm p-8 space-y-6 max-w-2xl">
              <div className="flex items-center gap-6 border-b border-[#F4ECE1] pb-6">
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"}
                  alt={currentUser?.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#6F4E37]"
                />
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#26160E]">{currentUser?.name}</h3>
                  <p className="text-xs text-[#6F4E37] font-semibold">Front Desk & Reservations Concierge</p>
                  <p className="text-xs text-[#8E5B34]">{currentUser?.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input label="Staff Name" id="rec-name" defaultValue={currentUser?.name} />
                <Input label="Email Address" id="rec-email" defaultValue={currentUser?.email} />
                <Input label="Reception Desk Phone" id="rec-phone" defaultValue="+1 (555) 444-1234" />
                <Input label="Change Password" id="rec-pass" type="password" placeholder="New passcode" />
                <Button variant="primary" size="md" onClick={() => alert("Receptionist settings updated.")}>
                  Save Profile Settings
                </Button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Modal: View QR Voucher */}
      {viewVoucherModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 border border-[#D5BFA4] shadow-2xl text-center space-y-4">
            <div className="flex justify-between items-center border-b border-[#F4ECE1] pb-2">
              <span className="text-xs font-bold uppercase text-[#8E5B34]">Booking QR Code</span>
              <button onClick={() => setViewVoucherModal(null)}><X className="w-5 h-5 text-[#8E5B34]" /></button>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#26160E]">{viewVoucherModal.id}</h3>
            <p className="text-xs text-[#563B29]">{viewVoucherModal.customerName} • {viewVoucherModal.guests}</p>
            
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#D5BFA4]/50 flex justify-center">
              <img
                src={getQrCodeUrl(viewVoucherModal.qrCode || viewVoucherModal.id)}
                alt="Booking QR Code"
                className="w-48 h-48 rounded-xl object-contain"
              />
            </div>
            <p className="text-xs font-mono font-bold text-[#6F4E37]">{viewVoucherModal.qrCode}</p>
          </div>
        </div>
      )}

      {/* Modal: New Reservation */}
      {newReservationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 border border-[#D5BFA4] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#F4ECE1] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#26160E]">Log New Reservation</h3>
              <button onClick={() => setNewReservationModal(false)}><X className="w-5 h-5 text-[#8E5B34]" /></button>
            </div>
            <form onSubmit={handleCreateReservation} className="space-y-4 text-xs">
              <Input label="Customer Full Name" id="r-name" value={resForm.customerName} onChange={e => setResForm({ ...resForm, customerName: e.target.value })} required />
              <Input label="Contact Mobile Number" id="r-phone" value={resForm.contactNumber} onChange={e => setResForm({ ...resForm, contactNumber: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Date" id="r-date" type="date" value={resForm.date} onChange={e => setResForm({ ...resForm, date: e.target.value })} required />
                <div className="space-y-1">
                  <label className="font-bold text-[#3E271A]">Time Slot</label>
                  <select value={resForm.time} onChange={e => setResForm({ ...resForm, time: e.target.value })} className="w-full p-2.5 rounded-lg border border-[#D5BFA4]">
                    <option>06:00 PM</option>
                    <option>06:30 PM</option>
                    <option>07:00 PM</option>
                    <option>07:30 PM</option>
                    <option>08:00 PM</option>
                    <option>08:30 PM</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-[#3E271A]">Party Size</label>
                <select value={resForm.guests} onChange={e => setResForm({ ...resForm, guests: e.target.value })} className="w-full p-2.5 rounded-lg border border-[#D5BFA4]">
                  <option>2 People</option>
                  <option>4 People</option>
                  <option>6 People</option>
                  <option>8 People</option>
                </select>
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full">Save & Issue QR Code</Button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Walk-In */}
      {newWaitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 border border-[#D5BFA4] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#F4ECE1] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#26160E]">Add Walk-In Guest to Waitlist</h3>
              <button onClick={() => setNewWaitModal(false)}><X className="w-5 h-5 text-[#8E5B34]" /></button>
            </div>
            <form onSubmit={handleAddWaitGuest} className="space-y-4 text-xs">
              <Input label="Guest Name" id="w-name" value={waitForm.name} onChange={e => setWaitForm({ ...waitForm, name: e.target.value })} required />
              <Input label="Phone Number" id="w-phone" value={waitForm.phone} onChange={e => setWaitForm({ ...waitForm, phone: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#3E271A]">Party Size</label>
                  <select value={waitForm.guests} onChange={e => setWaitForm({ ...waitForm, guests: e.target.value })} className="w-full p-2.5 rounded-lg border border-[#D5BFA4]">
                    <option>2 People</option>
                    <option>4 People</option>
                    <option>6 People</option>
                  </select>
                </div>
                <Input label="Est. Wait" id="w-time" value={waitForm.waitTime} onChange={e => setWaitForm({ ...waitForm, waitTime: e.target.value })} />
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full">Add to Queue</Button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReceptionistPortal;
