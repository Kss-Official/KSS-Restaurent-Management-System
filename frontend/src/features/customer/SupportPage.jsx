import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store/store';
import Button from '../../components/common/Button';
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronDown, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const SupportPage = () => {
  const { currentUser } = useAuth();
  const { setComplaints } = useAppStore();

  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    category: 'Reservation Inquiry',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: "What is the dress code for dining at Aura Mocha?",
      a: "We invite our patrons to dress in elegant smart-casual or formal attire. Athletic wear, distressed denim, and beachwear are not permitted in our main dining salon and lounge."
    },
    {
      q: "How far in advance should I reserve a table?",
      a: "For prime weekend evening dinners and private dining salons, we recommend reserving 7 to 14 days in advance. Same-day reservations are subject to walk-in availability and waiting list prioritization."
    },
    {
      q: "Is valet parking available on arrival?",
      a: "Yes, complimentary private valet parking is offered at the main entrance courtyard of our Grand Vista and Promenade locations for all dining guests."
    },
    {
      q: "How does the Table Session ID work during my visit?",
      a: "Upon arrival at our reception desk, your host verifies your booking and generates a unique daily 6-digit Table Session ID (e.g. #000001). This allows you and your waiter to sync course orders and settle your bill seamlessly."
    },
    {
      q: "Can you accommodate severe dietary restrictions and allergies?",
      a: "Our culinary brigade accommodates gluten-free, vegan, halal, and specific allergen requests. Please notify us during table booking or inform your floor captain upon seating."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    const newTicket = {
      id: Date.now(),
      guest: formData.name,
      table: 'Online Support',
      subject: formData.subject || formData.category,
      category: formData.category,
      message: formData.message,
      status: 'Open',
      time: 'Just now'
    };

    setComplaints(prev => [newTicket, ...prev]);
    setSubmitted(true);
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      category: 'Reservation Inquiry',
      subject: '',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="py-12 bg-[#F4EDE8] min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F5] text-[#542334] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#C8A66B]" /> Concierge Desk
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2528]">
            Guest Services & Inquiries
          </h1>
          <p className="text-sm text-[#75696B]">
            Our hospitality team is dedicated to orchestrating flawless dining affairs. Reach our concierge for special arrangements or assistance.
          </p>
        </div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E8DDD8]/60 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F4EDE8] text-[#542334] flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2D2528]">Private Concierge Line</h3>
            <p className="text-xs text-[#873C50]">Direct line for instant inquiries</p>
            <p className="font-mono font-bold text-sm text-[#542334]">+1 (555) 800-4499</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8DDD8]/60 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F4EDE8] text-[#542334] flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2D2528]">Email Concierge</h3>
            <p className="text-xs text-[#873C50]">For event quotes and private bookings</p>
            <p className="font-bold text-xs text-[#542334]">concierge@auramocha.com</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8DDD8]/60 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F4EDE8] text-[#542334] flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2D2528]">Service Hours</h3>
            <p className="text-xs text-[#873C50]">Dining Salon & Front Desk</p>
            <p className="font-bold text-xs text-[#2D2528]">Mon – Sun: 11:30 AM – Midnight</p>
          </div>
        </div>

        {/* FAQs & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* FAQs Accordion */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDD8]/60 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#873C50]">Need Assistance?</span>
              <h3 className="font-serif text-2xl font-bold text-[#2D2528] mt-1">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-3 pt-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-[#E8DDD8]/40 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    className="w-full p-4 text-left flex justify-between items-center bg-[#F4EDE8]/50 hover:bg-[#F4EDE8] transition-colors"
                  >
                    <span className="font-serif font-bold text-sm text-[#2D2528] pr-2">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#542334] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="p-4 text-xs text-[#75696B] bg-white leading-relaxed border-t border-[#FAF7F5]">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Concierge Message Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDD8]/60 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#873C50]">Direct Communication</span>
              <h3 className="font-serif text-2xl font-bold text-[#2D2528] mt-1">Contact Concierge or Raise Query</h3>
            </div>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your query has been logged directly with our General Manager and Floor Concierge.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-[#873C50] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E8DDD8]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-[#873C50] block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E8DDD8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-[#873C50] block mb-1">Inquiry Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E8DDD8] bg-white"
                >
                  <option value="Reservation Inquiry">Reservation & Table Seating</option>
                  <option value="Private Dining">Private Dining Salon & Events</option>
                  <option value="Billing / Advance Deposit">Billing / Advance Deposit</option>
                  <option value="Dietary Request">Dietary Restriction / Special Request</option>
                  <option value="General Feedback">Service Feedback / Manager Escalation</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-[#873C50] block mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Brief summary of request..."
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E8DDD8]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-[#873C50] block mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your request or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E8DDD8]"
                ></textarea>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full shadow-lg"
                icon={Send}
              >
                Send Message to Concierge
              </Button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SupportPage;