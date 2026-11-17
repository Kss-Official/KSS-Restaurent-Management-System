import React, { useState } from 'react';
import { RESTAURANT_LOCATIONS, RESTAURANT_IMAGES } from '../../utils/constants';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F4EDE8] py-16 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#75696B]">
          Personalized Service
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#2D2528]">
          Concierge & Reservations
        </h1>
        <div className="w-16 h-1 bg-[#873C50] mx-auto rounded-full"></div>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#75696B]">
          Have questions regarding special dietary requirements, private room buyouts, or table availability? Our concierge is at your service.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Details */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E8DDD8] shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#2D2528]">
                Direct Contacts
              </h2>

              <div className="space-y-4 text-sm text-[#75696B]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#873C50] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#FFFFFF]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2D2528]">Telephone Concierge</p>
                    <p className="text-[#75696B]">+1 (555) 782-9900</p>
                    <p className="text-xs text-[#75696B]/70">Available 9:00 AM – 11:00 PM EST daily</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#873C50] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#FFFFFF]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2D2528]">Electronic Mail</p>
                    <p className="text-[#75696B]">reservations@auramocha.com</p>
                    <p className="text-xs text-[#75696B]/70">Inquiries answered within 2 business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#873C50] text-white flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#FFFFFF]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2D2528]">Operating Hours</p>
                    <p className="text-xs">Lunch: 11:30 AM – 3:00 PM (Daily)</p>
                    <p className="text-xs">Dinner: 5:30 PM – 11:00 PM (Daily)</p>
                    <p className="text-xs">Mocha Bar: Until 1:00 AM (Fri & Sat)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Locations List */}
            <div className="bg-[#F4EDE8] p-8 rounded-2xl border border-[#E8DDD8] space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#2D2528] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#75696B]" />
                Our Flagship Locations
              </h3>
              <div className="space-y-3">
                {RESTAURANT_LOCATIONS.map((loc, idx) => (
                  <div key={idx} className="p-3 bg-white/70 rounded-xl border border-[#E8DDD8] text-xs sm:text-sm font-medium text-[#2D2528] flex items-center justify-between">
                    <span>{loc}</span>
                    <span className="text-[11px] font-bold text-[#75696B] uppercase tracking-wider">Open Today</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E8DDD8] shadow-md">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#873C50] text-white flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8 text-[#FFFFFF]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2D2528]">
                  Message Dispatched
                </h3>
                <p className="text-sm text-[#75696B] max-w-md mx-auto">
                  Thank you for reaching out to Aura Dining Concierge. Our reservations director will review your inquiry and follow up shortly.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-serif text-2xl font-bold text-[#2D2528]">
                  Send an Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-[#75696B]">
                  Please share your details and our team will get in touch with you promptly.
                </p>

                <Input
                  label="Full Name"
                  id="name"
                  placeholder="e.g. Lady Vivienne Rose"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="vivienne@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    label="Mobile Number"
                    id="phone"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#2D2528]">
                    Subject of Inquiry
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-sm rounded-lg border border-[#E8DDD8] bg-white px-3.5 py-2.5 text-[#2D2528] focus:outline-none focus:ring-2 focus:ring-[#B66A79]"
                  >
                    <option>General Inquiry</option>
                    <option>Private Room Buyout & Events</option>
                    <option>Dietary Consultation</option>
                    <option>Wine Cellar Booking</option>
                    <option>Corporate Partnership</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#2D2528]">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your upcoming occasion, guest count, or requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-sm rounded-lg border border-[#E8DDD8] bg-white px-3.5 py-2.5 text-[#2D2528] focus:outline-none focus:ring-2 focus:ring-[#B66A79]"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={Send}
                >
                  Submit Inquiry
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
