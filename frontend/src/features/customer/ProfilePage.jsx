import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Edit3, 
  ShieldCheck, 
  CheckCircle, 
  UtensilsCrossed,
  ShoppingBag,
  Navigation,
  Receipt,
  LogOut,
  ArrowRight,
  Sparkles,
  Award,
  Crown
} from 'lucide-react';

export const ProfilePage = () => {
  const { currentUser, login, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || 'Sophia Montgomery');
  const [email, setEmail] = useState(currentUser?.email || 'customer@auramocha.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (555) 392-8819');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    login('customer', {
      ...currentUser,
      name,
      email,
      phone
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const portalHubItems = [
    {
      step: 'Step 1',
      title: 'Home Page',
      desc: 'Explore the grand restaurant overview & story',
      path: '/',
      icon: UtensilsCrossed,
      color: 'bg-[#4C1824] text-[#FABE24]'
    },
    {
      step: 'Step 3',
      title: 'Food Menu',
      desc: 'Browse chef specials, artisanal pasta & desserts',
      path: '/menu',
      icon: UtensilsCrossed,
      color: 'bg-emerald-800 text-emerald-200'
    },
    {
      step: 'Step 4',
      title: 'Table Booking',
      desc: 'Experience 3D indoor & outdoor table reservation',
      path: '/book-table',
      icon: Calendar,
      color: 'bg-amber-800 text-amber-200'
    },
    {
      step: 'Step 5',
      title: 'My Orders',
      desc: 'Review past dining sessions and active orders',
      path: '/customer/orders',
      icon: ShoppingBag,
      color: 'bg-indigo-800 text-indigo-200'
    },
    {
      step: 'Step 6',
      title: 'Order Tracking',
      desc: 'Watch live 5-stage kitchen preparation progress',
      path: '/customer/order-tracking',
      icon: Navigation,
      color: 'bg-rose-800 text-rose-200'
    },
    {
      step: 'Step 7',
      title: 'Payment & Invoice',
      desc: 'View certified GST tax invoice and print receipts',
      path: '/customer/invoice',
      icon: Receipt,
      color: 'bg-teal-800 text-teal-200'
    }
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16 font-hanken">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Navigation tabs */}
        <div className="flex items-center gap-2 border-b border-[#EADBCC] pb-4 flex-wrap">
          <Link
            to="/customer/profile"
            className="px-4 py-2 rounded-full bg-[#4C1824] text-white text-xs font-bold shadow-xs"
          >
            Personal Profile
          </Link>
          <Link
            to="/customer/orders"
            className="px-4 py-2 rounded-full bg-white text-[#754D45] hover:bg-[#FAF7F2] text-xs font-semibold border border-[#EADBCC]"
          >
            My Orders
          </Link>
          <Link
            to="/customer/order-tracking"
            className="px-4 py-2 rounded-full bg-white text-[#754D45] hover:bg-[#FAF7F2] text-xs font-semibold border border-[#EADBCC]"
          >
            Order Tracking
          </Link>
          <Link
            to="/customer/invoice"
            className="px-4 py-2 rounded-full bg-white text-[#754D45] hover:bg-[#FAF7F2] text-xs font-semibold border border-[#EADBCC]"
          >
            Invoices & Receipts
          </Link>
          <Link
            to="/customer/bookings"
            className="px-4 py-2 rounded-full bg-white text-[#754D45] hover:bg-[#FAF7F2] text-xs font-semibold border border-[#EADBCC]"
          >
            Table Bookings History
          </Link>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Your profile details have been successfully updated.</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EADBCC] shadow-md space-y-8">
          
          {/* Top User Info & Loyalty Tier */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-[#F0E5D8]">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                  alt={currentUser?.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#4C1824] shadow-md"
                />
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div className="text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-[#FAF5EE] text-[#4C1824] text-[11px] font-bold uppercase tracking-wider border border-[#EADBCC] flex items-center gap-1">
                    <Crown className="w-3 h-3 text-[#FABE24]" />
                    <span>{currentUser?.tier || "Gold Connoisseur"}</span>
                  </span>
                  <span className="text-xs text-[#754D45]">Member Since {currentUser?.memberSince || "2024"}</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#2B181C]">
                  {currentUser?.name || "Sophia Montgomery"}
                </h2>
                <p className="text-xs text-[#754D45]">
                  {currentUser?.email || "customer@auramocha.com"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 rounded-full border border-[#4C1824] text-[#4C1824] hover:bg-[#4C1824] hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="p-2 rounded-full border border-rose-200 text-rose-700 hover:bg-rose-50 transition-all text-xs font-semibold flex items-center gap-1 cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Edit Form or Information Display */}
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-bold text-[#754D45] mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCC] text-xs sm:text-sm focus:outline-hidden focus:border-[#4C1824]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#754D45] mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCC] text-xs sm:text-sm focus:outline-hidden focus:border-[#4C1824]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#754D45] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCC] text-xs sm:text-sm focus:outline-hidden focus:border-[#4C1824]"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#4C1824] hover:bg-[#38111A] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-xs cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCC]/80 space-y-1">
                <div className="flex items-center gap-2 text-[#754D45]">
                  <Mail className="w-4 h-4 text-[#4C1824]" />
                  <span className="font-bold">Email Address</span>
                </div>
                <p className="font-semibold text-[#2B181C]">{currentUser?.email || "customer@auramocha.com"}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCC]/80 space-y-1">
                <div className="flex items-center gap-2 text-[#754D45]">
                  <Phone className="w-4 h-4 text-[#4C1824]" />
                  <span className="font-bold">Contact Phone</span>
                </div>
                <p className="font-semibold text-[#2B181C]">{currentUser?.phone || "+1 (555) 392-8819"}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCC]/80 space-y-1">
                <div className="flex items-center gap-2 text-[#754D45]">
                  <Award className="w-4 h-4 text-[#4C1824]" />
                  <span className="font-bold">Loyalty Points</span>
                </div>
                <p className="font-semibold text-[#2B181C]">1,450 Lunar Dining Pts</p>
              </div>
            </div>
          )}

        </div>

        {/* Customer Portal Quick Navigation Hub */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2B181C]">
                Customer Portal Flow Hub
              </h3>
              <p className="text-xs text-[#754D45]">
                Seamlessly jump between all 8 pages of your customer experience.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portalHubItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className="bg-white p-5 rounded-2xl border border-[#EADBCC] shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#754D45] bg-[#FAF5EE] px-2.5 py-0.5 rounded-full border border-[#EADBCC]">
                      {item.step}
                    </span>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-base text-[#2B181C] group-hover:text-[#4C1824] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#754D45] mt-0.5">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-[#4C1824] pt-2 border-t border-[#F0E5D8]">
                    <span>Open {item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
