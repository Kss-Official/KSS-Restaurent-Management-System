import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../utils/constants';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Flame, 
  Armchair, 
  CreditCard, 
  Menu, 
  Bell, 
  Calendar, 
  Sparkles,
  ShieldCheck,
  User,
  ArrowRight
} from 'lucide-react';

import AdminDashboard from './tabs/AdminDashboard';
import FoodMenuManagement from './tabs/FoodMenuManagement';
import KitchenKdsManagement from './tabs/KitchenKdsManagement';
import TableManagementAdmin from './tabs/TableManagementAdmin';
import PosSystemSettings from './tabs/PosSystemSettings';

export const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useAuth();

  // Navigation Links Structure matching the 5 required sections
  const navLinks = [
    { label: '1. Dashboard', icon: LayoutDashboard, tabId: 'dashboard' },
    { label: '2. Food & Menu', icon: UtensilsCrossed, tabId: 'food-menu' },
    { label: '3. Kitchen & KDS', icon: Flame, tabId: 'kitchen-kds' },
    { label: '4. Table Management', icon: Armchair, tabId: 'table-mgmt' },
    { label: '5. POS & Settings', icon: CreditCard, tabId: 'pos-settings' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F5] flex">
      {/* Sidebar with Primary Burgundy */}
      <Sidebar
        brandTitle="L U N A R"
        title="Admin Portal"
        subtitle="Executive Control"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={navLinks}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false);
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header matching luxury burgundy/champagne theme */}
        <header className="h-20 bg-white/95 backdrop-blur-md border-b border-[#E8DDD8] px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#500F1D] hover:bg-[#FAF7F5] transition-colors"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#500F1D]/10 text-[#500F1D] border border-[#500F1D]/15">
                  LUNAR Master Suite
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  System Online
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#500F1D] capitalize mt-0.5">
                {navLinks.find(l => l.tabId === activeTab)?.label.replace(/^\d+\.\s*/, '')}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#FAF7F5] border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]">
              <Calendar size={14} className="text-[#500F1D]/60" />
              <span>Today, 16 Nov 2026</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                className="w-10 h-10 rounded-2xl bg-[#FAF7F5] hover:bg-[#F3EAE7] border border-[#E8DDD8] flex items-center justify-center text-[#500F1D] transition-colors"
                aria-label="Notifications"
              >
                <Bell size={18} />
              </button>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#500F1D] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                3
              </span>
            </div>

            {/* Administrator Profile Pill */}
            <div className="flex items-center gap-3 pl-3 border-l border-[#E8DDD8]">
              <div className="w-10 h-10 rounded-2xl bg-[#500F1D] text-[#E5A81E] flex items-center justify-center font-bold text-sm shadow-xs overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-[#500F1D] leading-none">
                  {currentUser?.name || 'Priyanka'}
                </p>
                <p className="text-[10px] font-semibold text-[#500F1D]/60 mt-0.5">
                  Super Administrator
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Tab Rendering */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {activeTab === 'dashboard' && (
            <AdminDashboard onNavigateTab={(tab) => setActiveTab(tab)} />
          )}

          {activeTab === 'food-menu' && (
            <FoodMenuManagement />
          )}

          {activeTab === 'kitchen-kds' && (
            <KitchenKdsManagement />
          )}

          {activeTab === 'table-mgmt' && (
            <TableManagementAdmin />
          )}

          {activeTab === 'pos-settings' && (
            <PosSystemSettings />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPortal;
