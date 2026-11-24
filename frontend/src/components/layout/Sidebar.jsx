import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLE_LABELS } from '../../utils/constants';
import { 
  UtensilsCrossed, 
  LogOut, 
  ArrowLeft,
  X,
  Sparkles
} from 'lucide-react';

export const Sidebar = ({ 
  brandTitle = 'L U N A R',
  title = 'RESTAURANT MANAGEMENT SYSTEM', 
  subtitle, 
  links = [], 
  isOpen = true, 
  onClose,
  portalRole,
  activeTab,
  onTabChange
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
          className="fixed inset-0 bg-[#2D2528]/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      {/* Sidebar container with Primary Burgundy (#542334) */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#542334] text-[#FFFFFF] flex flex-col justify-between transition-transform duration-300 shadow-2xl border-r border-[#E8DDD8] lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top header */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="p-5 border-b border-white/15 flex items-center justify-between shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#542334] flex items-center justify-center shadow-lg shrink-0">
                <UtensilsCrossed className="w-5 h-5 text-[#C8A66B]" />
              </div>
              <div className="overflow-hidden">
                <h1 className="font-serif text-xl font-bold tracking-wider text-[#FFFFFF] leading-none truncate">
                  {brandTitle}
                </h1>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-[#E8D9DD] mt-1 truncate">
                  {title}
                </p>
              </div>
            </Link>
            {onClose && (
              <button 
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-lg text-white hover:bg-white/15"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Portal badge */}
          <div className="px-5 py-3 bg-black/15 flex items-center justify-between text-xs text-[#FFFFFF] shrink-0 border-b border-white/10">
            <span className="font-semibold uppercase tracking-wider text-[#C8A66B] text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Active Portal</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#873C50] text-[#FFFFFF] font-bold border border-[#C8A66B]/30 text-[11px]">
              {subtitle || (currentUser?.role && ROLE_LABELS[currentUser.role]) || 'Portal'}
            </span>
          </div>

          {/* Navigation Links with Group Support */}
          <nav className="p-3 space-y-1.5 overflow-y-auto flex-1 custom-scrollbar">
            {links.map((item, idx) => {
              // If item is a group header
              if (item.isGroup) {
                return (
                  <div key={idx} className="pt-3 pb-1">
                    <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-[#E8D9DD]/70">
                      {item.groupTitle}
                    </p>
                    <div className="mt-1 space-y-0.5">
                      {item.children?.map((sub, sIdx) => {
                        const SubIcon = sub.icon;
                        const isSubActive = sub.isActive || activeTab === sub.tabId;
                        return (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => {
                              if (sub.onClick) sub.onClick();
                              if (onTabChange && sub.tabId) onTabChange(sub.tabId);
                              if (onClose) onClose();
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left ${
                              isSubActive
                                ? 'bg-[#873C50] text-[#FFFFFF] shadow-sm font-bold border-l-4 border-[#C8A66B]'
                                : 'text-[#E8D9DD] hover:text-[#FFFFFF] hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              {SubIcon && (
                                <SubIcon 
                                  className={`w-4 h-4 shrink-0 ${isSubActive ? 'text-[#C8A66B]' : 'text-[#E8D9DD]'}`} 
                                />
                              )}
                              <span className="truncate">{sub.label}</span>
                            </div>
                            {sub.badge !== undefined && sub.badge > 0 && (
                              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#C8A66B] text-[#542334]">
                                {sub.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // Normal single item
              const Icon = item.icon;
              const isActive = item.isActive || activeTab === item.tabId;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    if (onTabChange && item.tabId) onTabChange(item.tabId);
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-[#873C50] text-[#FFFFFF] shadow-sm font-bold border-l-4 border-[#C8A66B]'
                      : 'text-[#E8D9DD] hover:text-[#FFFFFF] hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    {Icon && (
                      <Icon 
                        className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C8A66B]' : 'text-[#E8D9DD]'}`} 
                      />
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#C8A66B] text-[#542334]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Area with user summary and back to public site / logout */}
        <div className="p-3.5 border-t border-white/15 bg-black/20 space-y-2.5 shrink-0">
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/10 border border-white/15">
            <img 
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
              alt={currentUser?.name}
              className="w-8 h-8 rounded-full object-cover border border-[#C8A66B] shrink-0"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#FFFFFF] truncate">{currentUser?.name || "Staff Member"}</p>
              <p className="text-[10px] text-[#E8D9DD] truncate capitalize font-medium">{currentUser?.role ? ROLE_LABELS[currentUser.role] : "Staff"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#FFFFFF] bg-white/15 hover:bg-white/25 rounded-lg transition-colors shadow-xs border border-white/20"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C8A66B]" />
              <span>Public Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-white bg-[#873C50] hover:bg-[#6b2c3d] rounded-lg transition-colors shadow-xs"
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
