import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store/store';
import { 
  RESTAURANT_LOCATIONS, 
  TIME_SLOTS, 
  GUEST_OPTIONS, 
  RESTAURANT_IMAGES 
} from '../../utils/constants';
import { generateBookingId, formatDate } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  User, 
  Phone, 
  FileText 
} from 'lucide-react';

export const BookTablePage = () => {
  const { currentUser, isAuthenticated, isCustomer } = useAuth();
  const { addBooking } = useAppStore();
  const navigate = useNavigate();

  // If user is not logged in or not a customer, redirect to login
  if (!isAuthenticated || !isCustomer) {
    return (
      <div className="min-h-[70vh] bg-[#F4EDE8] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#E8DDD8] shadow-lg text-center space-y-4">
          <Calendar className="w-12 h-12 text-[#75696B] mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-[#2D2528]">Sign In to Reserve a Table</h2>
          <p className="text-sm text-[#75696B]">
            Table reservations are reserved for registered patrons. Please sign in or create an account to proceed.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link to="/login?redirect=/customer/book-table">
              <Button variant="primary" className="w-full">Sign In as Customer</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="w-full">Create Account</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Today's date in YYYY-MM-DD format for min date
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    location: RESTAURANT_LOCATIONS[0],
    date: todayStr,
    time: TIME_SLOTS[5], // "06:00 PM"
    guests: GUEST_OPTIONS[0], // "2 People"
    customerName: currentUser?.name || '',
    contactNumber: currentUser?.phone || '',
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const bookingId = generateBookingId();
      const newBooking = {
        id: bookingId,
        userId: currentUser?.id || 'cust-1',
        customerName: formData.customerName,
        contactNumber: formData.contactNumber,
        location: formData.location,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        tableNo: `Table ${Math.floor(1 + Math.random() * 20)}`,
        specialRequests: formData.specialRequests || 'None',
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };

      addBooking(newBooking);
      setConfirmedBooking(newBooking);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="bg-[#F4EDE8] py-12 px-4 sm:px-6 lg:px-8 min-h-[85vh]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* If Confirmation UI is active */}
        {confirmedBooking ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DDD8] shadow-xl text-center space-y-8 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-[#873C50] text-white flex items-center justify-center mx-auto shadow-xl shadow-[#873C50]/30">
              <CheckCircle2 className="w-10 h-10 text-[#FFFFFF]" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-[#F4EDE8] text-[#75696B] text-xs font-bold uppercase tracking-wider">
                Reservation Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2D2528]">
                We Look Forward to Hosting You
              </h1>
              <p className="text-sm text-[#75696B] max-w-lg mx-auto">
                Your table has been reserved with Executive Service. A confirmation code has been generated for your party.
              </p>
            </div>

            {/* Confirmation Card with Mocha Palette */}
            <div className="max-w-xl mx-auto bg-[#F4EDE8] rounded-2xl p-6 border border-[#E8DDD8] text-left space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8DDD8] pb-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#75696B]">Booking Reference</p>
                  <p className="font-mono text-2xl font-bold text-[#75696B]">{confirmedBooking.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#75696B]">Status</p>
                  <span className="px-3 py-1 rounded-full bg-[#21845A]/15 text-[#21845A] border border-[#21845A]/30 text-xs font-bold">
                    {confirmedBooking.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <p className="text-[#75696B] font-medium">Guest Name</p>
                  <p className="font-bold text-[#2D2528]">{confirmedBooking.customerName}</p>
                </div>
                <div>
                  <p className="text-[#75696B] font-medium">Party Size</p>
                  <p className="font-bold text-[#2D2528]">{confirmedBooking.guests}</p>
                </div>
                <div>
                  <p className="text-[#75696B] font-medium">Date & Time</p>
                  <p className="font-bold text-[#2D2528]">{formatDate(confirmedBooking.date)} at {confirmedBooking.time}</p>
                </div>
                <div>
                  <p className="text-[#75696B] font-medium">Contact Phone</p>
                  <p className="font-bold text-[#2D2528]">{confirmedBooking.contactNumber}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[#75696B] font-medium">Location</p>
                  <p className="font-bold text-[#2D2528]">{confirmedBooking.location}</p>
                </div>
                {confirmedBooking.specialRequests && (
                  <div className="sm:col-span-2">
                    <p className="text-[#75696B] font-medium">Special Requests</p>
                    <p className="text-[#2D2528] italic">"{confirmedBooking.specialRequests}"</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/customer/bookings">
                <Button variant="primary" size="lg" icon={Calendar}>
                  View in My Bookings
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Reservation Form */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DDD8] shadow-xl space-y-8">
            
            <div className="border-b border-[#E8DDD8] pb-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#75696B]">
                Exclusive Dining
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2528]">
                Reserve Your Table
              </h1>
              <p className="text-sm text-[#75696B]">
                Please complete the reservation parameters below to secure your seating.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#2D2528] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#75696B]" />
                  Restaurant Location <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full text-sm rounded-lg border border-[#E8DDD8] bg-white px-3.5 py-2.5 text-[#2D2528] focus:outline-none focus:ring-2 focus:ring-[#B66A79]"
                  required
                >
                  {RESTAURANT_LOCATIONS.map((loc, idx) => (
                    <option key={idx} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#2D2528] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#75696B]" />
                    Reservation Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full text-sm rounded-lg border border-[#E8DDD8] bg-white px-3.5 py-2.5 text-[#2D2528] focus:outline-none focus:ring-2 focus:ring-[#B66A79]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#2D2528] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#75696B]" />
                    Reservation Time Slot <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full text-sm rounded-lg border border-[#E8DDD8] bg-white px-3.5 py-2.5 text-[#2D2528] focus:outline-none focus:ring-2 focus:ring-[#B66A79]"
                    required
                  >
                    {TIME_SLOTS.map((slot, idx) => (
                      <option key={idx} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guests Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#2D2528] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#75696B]" />
                  Number of Guests <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {GUEST_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, guests: opt })}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold border transition-all ${
                        formData.guests === opt
                          ? 'bg-[#873C50] text-white border-[#873C50] shadow-md'
                          : 'bg-[#F4EDE8] text-[#2D2528] border-[#E8DDD8] hover:bg-[#F4EDE8]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <Input
                  label="Customer Name"
                  id="book-name"
                  icon={User}
                  placeholder="Full Name"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  required
                />
                <Input
                  label="Contact Number"
                  id="book-phone"
                  icon={Phone}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  required
                />
              </div>

              {/* Special Requests */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#2D2528] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#75696B]" />
                  Special Requests (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Dietary allergies, window booth preference, birthday/anniversary arrangements..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full text-sm rounded-lg border border-[#E8DDD8] bg-white px-3.5 py-2.5 text-[#2D2528] focus:outline-none focus:ring-2 focus:ring-[#B66A79]"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full shadow-lg"
                  icon={Calendar}
                >
                  Confirm Table Reservation
                </Button>
                <p className="text-center text-xs text-[#75696B] mt-3">
                  Reservations can be modified or cancelled up to 2 hours prior to scheduled dining time without penalty.
                </p>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookTablePage;
