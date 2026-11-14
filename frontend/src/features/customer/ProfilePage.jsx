import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Edit3, 
  ShieldCheck, 
  CheckCircle, 
  Utensils 
} from 'lucide-react';

export const ProfilePage = () => {
  const { currentUser, login } = useAuth();

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

  return (
    <div className="bg-[#F4EDE8] py-12 px-4 sm:px-6 lg:px-8 min-h-[85vh]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation tabs */}
        <div className="flex items-center gap-3 border-b border-[#E8DDD8]/50 pb-4">
          <Link
            to="/customer/profile"
            className="px-4 py-2 rounded-xl bg-[#754D45] text-white text-sm font-semibold shadow-sm"
          >
            Personal Information
          </Link>
          <Link
            to="/customer/bookings"
            className="px-4 py-2 rounded-xl bg-white text-[#754D45] hover:bg-[#FAF7F5] text-sm font-semibold border border-[#E8DDD8]/40"
          >
            My Bookings & History
          </Link>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            Your profile details have been successfully updated.
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DDD8] shadow-xl space-y-8">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-[#FAF7F5]">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                  alt={currentUser?.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#754D45] shadow-lg"
                />
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>
              <div className="text-center sm:text-left space-y-1">
                <span className="px-3 py-0.5 rounded-full bg-[#FAF7F5] text-[#754D45] text-[11px] font-bold uppercase tracking-wider">
                  Patron Member
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#301A18]">
                  {currentUser?.name}
                </h1>
                <p className="text-xs text-[#754D45]">
                  Member Since {currentUser?.memberSince || '2024'} • Aura Mocha Privilege Club
                </p>
              </div>
            </div>

            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                icon={Edit3}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            )}
          </div>

          {/* Details / Edit View */}
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="p-4 rounded-2xl bg-[#F4EDE8] border border-[#E8DDD8]/40 space-y-1">
                <p className="text-xs uppercase tracking-wider font-semibold text-[#754D45] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#754D45]" /> Full Name
                </p>
                <p className="font-bold text-[#301A18] text-base">{currentUser?.name}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4EDE8] border border-[#E8DDD8]/40 space-y-1">
                <p className="text-xs uppercase tracking-wider font-semibold text-[#754D45] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#754D45]" /> Email Address
                </p>
                <p className="font-bold text-[#301A18] text-base">{currentUser?.email}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4EDE8] border border-[#E8DDD8]/40 space-y-1">
                <p className="text-xs uppercase tracking-wider font-semibold text-[#754D45] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#754D45]" /> Mobile Number
                </p>
                <p className="font-bold text-[#301A18] text-base">{currentUser?.phone}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4EDE8] border border-[#E8DDD8]/40 space-y-1">
                <p className="text-xs uppercase tracking-wider font-semibold text-[#754D45] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#754D45]" /> Privilege Tier
                </p>
                <p className="font-bold text-[#301A18] text-base">Black Gold Connoisseur</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <Input
                label="Full Name"
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Mobile Number"
                id="edit-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <div className="pt-2 flex gap-3">
                <Button type="submit" variant="primary" size="md">
                  Save Changes
                </Button>
                <Button type="button" variant="ghost" size="md" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* Quick link to reservations */}
          <div className="p-6 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#301A18]">Looking to Dine Soon?</h3>
              <p className="text-xs sm:text-sm text-[#754D45]">View your existing reservations or book a new table.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/customer/bookings">
                <Button variant="outline" size="sm">
                  View Bookings
                </Button>
              </Link>
              <Link to="/customer/book-table">
                <Button variant="primary" size="sm" icon={Calendar}>
                  Reserve Table
                </Button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
