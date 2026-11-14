import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store/store';
import { formatDate } from '../../utils/helpers';
import Button from '../../components/common/Button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Eye, 
  X,
  Plus
} from 'lucide-react';

export const CustomerBookingsPage = () => {
  const { currentUser } = useAuth();
  const { bookings, cancelBooking } = useAppStore();
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Filter bookings for current customer (or fallback to showing all demo bookings)
  const myBookings = bookings.filter(b => b.userId === currentUser?.id || !b.userId || b.userId === 'cust-1');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#21845A]/15 text-[#21845A] border border-[#21845A]/30 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#3976B8]/15 text-[#3976B8] border border-[#3976B8]/30 border border-blue-300">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#C44747]/15 text-[#C44747] border border-[#C44747]/30 border border-red-300">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#B7791F]/15 text-[#B7791F] border border-[#B7791F]/30 border border-amber-300">
            <AlertCircle className="w-3.5 h-3.5" /> {status}
          </span>
        );
    }
  };

  const handleCancel = (bookingId) => {
    if (window.confirm(`Are you sure you wish to cancel reservation ${bookingId}?`)) {
      cancelBooking(bookingId);
      if (selectedBooking && selectedBooking.id === bookingId) {
        setSelectedBooking(prev => ({ ...prev, status: 'Cancelled' }));
      }
    }
  };

  return (
    <div className="bg-[#F4EDE8] py-12 px-4 sm:px-6 lg:px-8 min-h-[85vh]">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation tabs */}
        <div className="flex items-center justify-between border-b border-[#E8DDD8]/50 pb-4">
          <div className="flex items-center gap-3">
            <Link
              to="/customer/profile"
              className="px-4 py-2 rounded-xl bg-white text-[#754D45] hover:bg-[#FAF7F5] text-sm font-semibold border border-[#E8DDD8]/40"
            >
              Personal Information
            </Link>
            <Link
              to="/customer/bookings"
              className="px-4 py-2 rounded-xl bg-[#754D45] text-white text-sm font-semibold shadow-sm"
            >
              My Bookings ({myBookings.length})
            </Link>
          </div>

          <Link to="/customer/book-table">
            <Button variant="primary" size="sm" icon={Plus}>
              Book New Table
            </Button>
          </Link>
        </div>

        {/* Section Title */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#55352F]">
            Reservation & Dining History
          </h1>
          <p className="text-sm text-[#754D45] mt-1">
            Review upcoming reservation details, assigned tables, or past visits.
          </p>
        </div>

        {/* Bookings List */}
        {myBookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#E8DDD8] p-8 space-y-4">
            <Calendar className="w-12 h-12 text-[#754D45] mx-auto opacity-60" />
            <h3 className="font-serif text-xl font-bold text-[#55352F]">No Reservations Yet</h3>
            <p className="text-sm text-[#754D45] max-w-sm mx-auto">
              You haven't scheduled any dining experiences with us. Reserve a table now to taste our signature cuisine.
            </p>
            <Link to="/customer/book-table">
              <Button variant="primary" size="md">Book a Table</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {myBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl p-6 border border-[#E8DDD8]/60 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#FAF7F5]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-bold text-[#754D45] bg-[#F4EDE8] px-3 py-1 rounded-lg border border-[#E8DDD8]/40">
                      {booking.id}
                    </span>
                    <span className="text-xs font-semibold text-[#754D45]">
                      {booking.tableNo || 'Table Assigned on Arrival'}
                    </span>
                  </div>
                  <div>
                    {getStatusBadge(booking.status)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#754D45] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#754D45] font-medium text-[11px] uppercase">Location</p>
                      <p className="font-bold text-[#55352F] leading-tight">{booking.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-[#754D45] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#754D45] font-medium text-[11px] uppercase">Date & Time</p>
                      <p className="font-bold text-[#55352F] leading-tight">{formatDate(booking.date)}</p>
                      <p className="text-xs text-[#754D45]">{booking.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#754D45] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#754D45] font-medium text-[11px] uppercase">Party Size</p>
                      <p className="font-bold text-[#55352F] leading-tight">{booking.guests}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-[#754D45] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#754D45] font-medium text-[11px] uppercase">Guest Name</p>
                      <p className="font-bold text-[#55352F] leading-tight">{booking.customerName}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#FAF7F5] flex items-center justify-between">
                  <span className="text-xs text-[#754D45] italic truncate max-w-xs">
                    {booking.specialRequests ? `"${booking.specialRequests}"` : 'Standard seating'}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Eye}
                      onClick={() => setSelectedBooking(booking)}
                    >
                      View Details
                    </Button>
                    {booking.status === 'Confirmed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-700 hover:bg-red-50"
                        onClick={() => handleCancel(booking.id)}
                      >
                        Cancel Booking
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Modal View */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 border border-[#E8DDD8] shadow-2xl space-y-6 relative animate-fadeIn">
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F4EDE8] text-[#754D45]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#754D45]">
                  Reservation Voucher
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#55352F]">
                  Booking Reference: {selectedBooking.id}
                </h3>
              </div>

              <div className="bg-[#F4EDE8] p-5 rounded-2xl border border-[#E8DDD8]/50 space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-[#E8DDD8]/30">
                  <span className="text-[#754D45]">Current Status</span>
                  {getStatusBadge(selectedBooking.status)}
                </div>
                <div className="flex justify-between">
                  <span className="text-[#754D45]">Location</span>
                  <span className="font-semibold text-[#55352F] text-right">{selectedBooking.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#754D45]">Date</span>
                  <span className="font-semibold text-[#55352F]">{formatDate(selectedBooking.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#754D45]">Time</span>
                  <span className="font-semibold text-[#55352F]">{selectedBooking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#754D45]">Number of Guests</span>
                  <span className="font-semibold text-[#55352F]">{selectedBooking.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#754D45]">Table Assignment</span>
                  <span className="font-semibold text-[#754D45]">{selectedBooking.tableNo || 'Table 12 (Reserved)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#754D45]">Guest Contact</span>
                  <span className="font-semibold text-[#55352F]">{selectedBooking.contactNumber}</span>
                </div>
                {selectedBooking.specialRequests && (
                  <div className="pt-2 border-t border-[#E8DDD8]/30">
                    <span className="text-[#754D45] text-xs block mb-1">Special Dietary / Requests:</span>
                    <p className="text-xs italic text-[#55352F] bg-white p-2.5 rounded-lg border border-[#E8DDD8]/30">
                      "{selectedBooking.specialRequests}"
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                {selectedBooking.status === 'Confirmed' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-700"
                    onClick={() => handleCancel(selectedBooking.id)}
                  >
                    Cancel This Booking
                  </Button>
                )}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedBooking(null)}
                >
                  Close Voucher
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerBookingsPage;
