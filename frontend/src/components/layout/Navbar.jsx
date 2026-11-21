import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { Leaf, Calendar, User, Menu, X, LogOut, ShoppingBag, Navigation, Receipt, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const { currentUser, isAuthenticated, isCustomer, logout, role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isMenu = location.pathname === '/menu';
  const isAbout = location.pathname === '/about';
  const isReviews = location.pathname === '/reviews';
  const isBlogs = location.pathname === '/blogs';

  // Animation Stage:
  // Stage 1: Logo capsule centered in viewport (Home entrance)
  // Stage 2: Logo capsule in top-center (Menu, About, Reviews & Blogs entrance & Home stage 2)
  // Stage 3: Expands horizontally to LHS & RHS into floating light cream glass navbar
  const [animStage, setAnimStage] = useState(() => (isHome ? 1 : (isMenu || isAbout || isReviews || isBlogs) ? 2 : 3));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileDropdownRef = useRef(null);

  // Customer dropdown navigation options matching requested flow:
  // 1. My Orders
  // 2. Order Tracking
  // 3. Table Booking History
  // 4. Payment & Invoice
  // 5. My Profile
  // 6. Logout
  const customerDropdownItems = [
    { label: 'My Orders', path: '/customer/orders', icon: ShoppingBag },
    { label: 'Order Tracking', path: '/customer/order-tracking', icon: Navigation },
    { label: 'Table Booking History', path: '/customer/bookings', icon: Calendar },
    { label: 'Payment & Invoice', path: '/customer/invoice', icon: Receipt },
    { label: 'My Profile', path: '/customer/profile', icon: User },
  ];

  useEffect(() => {
    if (isHome) {
      // Run full 3-stage opening sequence on home page load: center -> top-center -> expand
      setAnimStage(1);

      const timer1 = setTimeout(() => {
        setAnimStage(2); // Glides to top middle
      }, 850);

      const timer2 = setTimeout(() => {
        setAnimStage(3); // Expands outwards to LHS & RHS
      }, 1750);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else if (isMenu || isAbout || isReviews || isBlogs) {
      // Menu / About / Reviews / Blogs Page sequence matching Reference Images:
      // Starts in top middle (Stage 2) -> smoothly expands outwards to LHS & RHS (Stage 3)
      setAnimStage(2);

      const timer = setTimeout(() => {
        setAnimStage(3); // Expands outwards to LHS & RHS
      }, 750);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setAnimStage(3);
    }
  }, [location.pathname, isHome, isMenu, isAbout, isReviews, isBlogs]);

  // Track window scroll for enhanced contrast over long pages
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer & profile dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Click outside listener for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const getPortalRoute = () => {
    switch (role) {
      case ROLES.ADMIN: return '/admin';
      case ROLES.MANAGER: return '/manager';
      case ROLES.KITCHEN: return '/kitchen';
      case ROLES.RECEPTIONIST: return '/receptionist';
      case ROLES.WAITER: return '/waiter';
      case ROLES.CUSTOMER: return '/customer/profile';
      default: return '/login';
    }
  };

  // Requested order: Home, About Us, Menu, Reviews, Blogs
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Menu', path: '/menu' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Blogs', path: '/blogs' },
  ];

  const handleReserveClick = () => {
    // Reserve a Table requires customer login
    if (!isAuthenticated || (!isCustomer && role !== ROLES.ADMIN)) {
      navigate('/login?redirect=/book-table');
      return;
    }

    // Notify BookTablePage to reset if user is already on the page
    window.dispatchEvent(new CustomEvent('lunar-reset-booking'));
    navigate('/book-table', { state: { reset: Date.now() } });
  };

  // Dynamic geometry & light cream/light white frosted glass styles
  const getContainerStyles = () => {
    if (animStage === 1) {
      return {
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(220px, 46vw, 270px)',
        height: 'clamp(120px, 25vw, 145px)',
        borderRadius: '9999px',
        backgroundColor: 'rgba(250, 245, 239, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(255, 255, 255, 0.85)',
      };
    }
    if (animStage === 2) {
      return {
        top: 'clamp(14px, 2.5vw, 20px)',
        transform: 'translate(-50%, 0)',
        width: 'clamp(105px, 20vw, 124px)',
        height: 'clamp(46px, 8vw, 52px)',
        borderRadius: '9999px',
        backgroundColor: 'rgba(250, 245, 239, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.22)',
        border: '1px solid rgba(255, 255, 255, 0.85)',
      };
    }
    // Stage 3: Light cream / light white frosted glass matching Image 2
    return {
      top: 'clamp(14px, 2.5vw, 20px)',
      transform: 'translate(-50%, 0)',
      width: 'min(90vw, 1060px)',
      height: 'clamp(56px, 8vw, 64px)',
      borderRadius: '9999px',
      backgroundColor: isScrolled
        ? 'rgba(252, 248, 243, 0.96)'
        : 'rgba(247, 240, 232, 0.86)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      boxShadow: isScrolled
        ? '0 12px 36px rgba(0, 0, 0, 0.16)'
        : '0 16px 45px rgba(0, 0, 0, 0.22)',
      border: '1px solid rgba(255, 255, 255, 0.75)',
    };
  };

  return (
    <>
      {/* Morphing Floating Light Cream Glass Navbar */}
      <header
        role="banner"
        style={{
          ...getContainerStyles(),
          transition:
            'top 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), width 0.75s cubic-bezier(0.16, 1, 0.3, 1), height 0.75s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
        }}
        className={`fixed left-1/2 z-50 select-none font-hanken ${
          animStage === 3 ? 'overflow-visible' : 'overflow-hidden'
        }`}
      >
        {/* ========================================================
            STAGE 1 & 2 CONTENT: Centered Lunar Logo Pill
            (Smoothly shrinks in place as capsule glides to top)
           ======================================================== */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-400 ${
            animStage === 3 ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          {/* Leaf Icon with dynamic scale */}
          <Leaf
            strokeWidth={1.8}
            className={`text-[#4C1824] transition-all duration-700 ${
              animStage === 1
                ? 'w-10 h-10 sm:w-11 sm:h-11'
                : 'w-3.5 h-3.5 sm:w-4 sm:h-4'
            }`}
          />
          {/* Lunar Brand Name with dynamic scale */}
          <span
            className={`font-hanken text-[#4C1824] transition-all duration-700 ${
              animStage === 1
                ? 'text-2xl sm:text-3xl font-medium tracking-tight mt-1'
                : 'text-xs sm:text-[13px] font-semibold leading-tight mt-0.5'
            }`}
          >
            Lunar
          </span>
        </div>

        {/* ========================================================
            STAGE 3 CONTENT: Fully Opened Floating Glass Navbar
            Matching Image 2:
            - LHS: Light cream oval badge with Leaf + Lunar
            - Center: Links with wide gap covering empty area
            - RHS: "Reserve a Table" button (No user icon before login)
           ======================================================== */}
        <div
          className={`w-full h-full flex items-center justify-between px-3.5 sm:px-5 md:px-6 transition-opacity duration-500 delay-100 ${
            animStage === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* LHS: Lunar Badge Matching Image 2 */}
          <Link
            to="/"
            aria-label="Lunar Home"
            className="flex-shrink-0 inline-flex flex-col items-center justify-center px-4 sm:px-5 py-1 sm:py-1.5 rounded-full bg-[#FAF5EE]/95 hover:bg-white border border-white/80 shadow-xs transition-all duration-200 active:scale-95 group cursor-pointer"
          >
            <Leaf
              strokeWidth={1.8}
              className="w-3.5 h-3.5 text-[#4C1824] group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#4C1824] font-hanken leading-tight tracking-wide">
              Lunar
            </span>
          </Link>

          {/* Center: Desktop Navigation Links with Balanced Spacing */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center justify-center gap-4 lg:gap-6 xl:gap-7 mx-auto"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`font-hanken text-[13.5px] lg:text-[14px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#4C1824] text-white px-5 sm:px-6 py-2 rounded-full shadow-sm'
                      : 'text-[#3B151E] hover:text-[#4C1824] hover:bg-black/5 px-2.5 py-1.5 rounded-full'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* RHS: "Reserve a Table" Button (Exactly matching Image 2 Before Login) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Reserve a Table Button */}
            <button
              onClick={handleReserveClick}
              className="bg-[#4C1824] hover:bg-[#38111A] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-hanken text-[13px] sm:text-[14px] font-medium flex items-center gap-2 shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="hidden sm:inline">Reserve a Table</span>
              <span className="sm:hidden font-semibold">Reserve</span>
            </button>

            {/* If Authenticated: Profile Icon with Dropdown Menu */}
            {isAuthenticated && (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileDropdownOpen((prev) => !prev);
                  }}
                  title="Profile Menu"
                  aria-label="User Profile Menu"
                  aria-expanded={profileDropdownOpen}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
                    profileDropdownOpen
                      ? 'bg-[#4C1824] text-white border-[#4C1824] ring-2 ring-[#FABE24]/60'
                      : 'bg-white/80 hover:bg-white text-[#4C1824] border-white/90 hover:scale-105 active:scale-95'
                  }`}
                >
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-full mt-3 w-64 rounded-2xl bg-[#FAF7F2] border border-[#EADBCC] shadow-2xl p-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-150 font-hanken"
                  >
                    {/* User Info Header */}
                    <div className="px-3 py-2.5 mb-1.5 rounded-xl bg-white/90 border border-[#EADBCC] flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#4C1824] text-[#FABE24] flex items-center justify-center font-bold text-xs uppercase shadow-xs flex-shrink-0">
                        {currentUser?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#2B181C] truncate">
                          {currentUser?.name || 'Customer'}
                        </p>
                        <p className="text-[11px] text-[#7A5B53] truncate">
                          {currentUser?.email || ''}
                        </p>
                      </div>
                    </div>

                    {/* Staff Portal Link if not customer */}
                    {role && role !== ROLES.CUSTOMER && (
                      <Link
                        to={getPortalRoute()}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#4C1824] hover:bg-[#4C1824]/10 transition-colors mb-1"
                      >
                        <User className="w-3.5 h-3.5 text-[#FABE24]" />
                        <span>Staff Dashboard</span>
                      </Link>
                    )}

                    {/* 1. My Orders, 2. Order Tracking, 3. Table Booking History, 4. Payment & Invoice, 5. My Profile */}
                    <div className="space-y-0.5">
                      {customerDropdownItems.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = location.pathname === item.path;
                        return (
                          <Link
                            key={item.label}
                            to={item.path}
                            onClick={() => setProfileDropdownOpen(false)}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                              isCurrent
                                ? 'bg-[#4C1824] text-white font-semibold shadow-xs'
                                : 'text-[#3B151E] hover:text-[#4C1824] hover:bg-[#4C1824]/5'
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#FABE24]' : 'text-[#7A5B53]'}`} />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* 6. Logout */}
                    <div className="border-t border-[#EADBCC] mt-1.5 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-700 hover:text-rose-800 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-600" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden w-8 h-8 rounded-full bg-white/70 hover:bg-white border border-white/80 flex items-center justify-center text-[#4C1824] transition-all duration-200 cursor-pointer shadow-xs"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && animStage === 3 && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[92vw] max-w-sm z-40 rounded-2xl backdrop-blur-2xl bg-[#FAF5EE]/95 border border-white/80 shadow-2xl p-5 md:hidden animate-in fade-in slide-in-from-top-4 duration-200 font-hanken">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-hanken text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-[#4C1824] text-white shadow-sm'
                      : 'text-[#3B151E] hover:bg-black/5 hover:text-[#4C1824]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="border-t border-black/10 my-2 pt-2">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-hanken text-sm font-medium text-[#4C1824] hover:bg-black/5 px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Login / Register</span>
                </Link>
              ) : (
                <div className="space-y-1">
                  <div className="px-4 py-1 text-xs font-bold text-[#754D45] uppercase tracking-wider">
                    {currentUser?.name || 'Customer Account'}
                  </div>
                  {customerDropdownItems.map((item) => {
                    const Icon = item.icon;
                    const isCurrent = location.pathname === item.path;
                    return (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`font-hanken text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2.5 transition-colors ${
                          isCurrent
                            ? 'bg-[#4C1824] text-white font-semibold'
                            : 'text-[#3B151E] hover:bg-black/5'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isCurrent ? 'text-[#FABE24]' : 'text-[#754D45]'}`} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left font-hanken text-sm font-medium text-rose-700 hover:bg-rose-50 px-4 py-2 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
