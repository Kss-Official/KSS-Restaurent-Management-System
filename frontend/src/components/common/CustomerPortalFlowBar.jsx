import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LogIn, 
  UtensilsCrossed, 
  Calendar, 
  ShoppingBag, 
  Navigation, 
  Receipt, 
  User, 
  ChevronRight,
  Check
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const CustomerPortalFlowBar = ({ currentStep: manualStep }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const flowSteps = [
    { id: 'home', label: 'Home Page', path: '/', icon: Home },
    { 
      id: 'auth', 
      label: isAuthenticated ? 'Account' : 'Login / Sign Up', 
      path: isAuthenticated ? '/customer/profile' : '/login', 
      icon: LogIn 
    },
    { id: 'menu', label: 'Food Menu', path: '/menu', icon: UtensilsCrossed },
    { id: 'book-table', label: 'Table Booking', path: '/book-table', icon: Calendar },
    { id: 'orders', label: 'My Orders', path: '/customer/orders', icon: ShoppingBag },
    { id: 'tracking', label: 'Order Tracking', path: '/customer/order-tracking', icon: Navigation },
    { id: 'invoice', label: 'Payment & Invoice', path: '/customer/invoice', icon: Receipt },
    { id: 'profile', label: 'My Profile', path: '/customer/profile', icon: User },
  ];

  // Detect current step from route if not provided
  const getCurrentStep = () => {
    if (manualStep) return manualStep;
    const p = location.pathname;
    if (p === '/') return 'home';
    if (p === '/login' || p === '/register') return 'auth';
    if (p.startsWith('/menu')) return 'menu';
    if (p.startsWith('/book-table') || p.startsWith('/reserve')) return 'book-table';
    if (p.startsWith('/customer/orders') || p === '/orders') return 'orders';
    if (p.startsWith('/customer/order-tracking') || p.startsWith('/order-tracking')) return 'tracking';
    if (p.startsWith('/customer/invoice') || p.startsWith('/invoice')) return 'invoice';
    if (p.startsWith('/customer/profile') || p === '/profile') return 'profile';
    return '';
  };

  const activeStep = getCurrentStep();
  const activeIndex = flowSteps.findIndex((s) => s.id === activeStep);

  return (
    <div className="w-full bg-[#231518] border-b border-[#FABE24]/20 shadow-md py-3 px-4 sm:px-6 sticky top-0 z-30 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Title / Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#FABE24] animate-pulse" />
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#FABE24]">
            Customer Portal Flow
          </span>
          <span className="text-white/40 text-xs hidden sm:inline">•</span>
          <span className="text-white/70 text-xs hidden sm:inline font-medium">
            Simple 8-Step Dining Experience
          </span>
        </div>

        {/* Horizontal Stepper Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
          {flowSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = step.id === activeStep;
            const isPassed = activeIndex !== -1 && idx < activeIndex;

            return (
              <React.Fragment key={step.id}>
                <Link
                  to={step.path}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#FABE24] text-[#1F1416] shadow-[0_0_12px_rgba(250,190,36,0.5)] font-bold scale-105'
                      : isPassed
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  title={`Go to ${step.label}`}
                >
                  {isPassed ? (
                    <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                  ) : (
                    <Icon className={`w-3 h-3 ${isActive ? 'text-[#1F1416]' : 'text-[#FABE24]'}`} />
                  )}
                  <span>{step.label}</span>
                </Link>

                {idx < flowSteps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-white/30 flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default CustomerPortalFlowBar;
