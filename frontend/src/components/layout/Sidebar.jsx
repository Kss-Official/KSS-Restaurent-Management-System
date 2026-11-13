import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLE_LABELS } from '../../utils/constants';
import { 
  UtensilsCrossed, 
  LogOut, 
  ArrowLeft,
  X
} from 'lucide-react';

export const Sidebar = ({ 
  title, 
  subtitle, 
  links = [], 
  isOpen = true, 
  onClose,
  portalRole
}) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar container with featured Mocha Brown #6F4E37 */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#6F4E37] text-[#FAF6F0] flex flex-col justify-between transition-transform duration-300 shadow-2xl border-r border-[#563B29] lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top header */}
        <div>
          <div className="p-6 border-b border-[#563B29] flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] text-[#6F4E37] flex items-center justify-center shadow-inner">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold tracking-tight text-[#FAF6F0] leading-none">
                  Aura Mocha
                </h1>
                <p className="text-[11px] font-medium uppercase tracking-widest text-[#E6D7C3] mt-1">
                  {title || 'Management System'}
                </p>
              </div>
            </Link>
            {onClose && (
              <button 
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-lg text-[#E6D7C3] hover:text-white hover:bg-[#563B29]"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Portal badge */}
          <div className="px-6 py-3.5 bg-[#563B29]/70 flex items-center justify-between text-xs text-[#FAF6F0]">
            <span className="font-semibold uppercase tracking-wider text-[#E6D7C3]">Active Portal</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#3E271A] text-[#FAF6F0] font-medium border border-[#8E5B34]/50">
              {subtitle || (currentUser?.role && ROLE_LABELS[currentUser.role]) || 'Portal'}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)]">
            {links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={idx}
                  to={link.path}
                  end={link.end ?? true}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#FAF6F0] text-[#6F4E37] shadow-md font-semibold'
                        : 'text-[#FAF6F0]/90 hover:bg-[#563B29] hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-4 h-4 shrink-0" />}
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#C89B4A] text-[#170B06]">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Area with user summary and back to public site / logout */}
        <div className="p-4 border-t border-[#563B29] bg-[#563B29]/40 space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-[#3E271A]/50">
            <img 
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
              alt={currentUser?.name}
              className="w-9 h-9 rounded-full object-cover border border-[#C89B4A]"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-[#FAF6F0] truncate">{currentUser?.name || "Staff Member"}</p>
              <p className="text-xs text-[#E6D7C3] truncate capitalize">{currentUser?.role || "Authorized"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              className="flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-[#FAF6F0] bg-[#563B29] hover:bg-[#3E271A] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-red-200 bg-red-900/40 hover:bg-red-900/60 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
