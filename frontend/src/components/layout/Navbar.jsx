import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../utils/constants';
import Button from '../common/Button';
import { 
  UtensilsCrossed, 
  User, 
  Calendar, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldAlert, 
  Compass, 
  ChefHat, 
  ConciergeBell, 
  Users 
} from 'lucide-react';

export const Navbar = ({ onOpenBookingModal }) => {
  const { currentUser, isAuthenticated, isCustomer, logout, role } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Menu', path: '/menu' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getPortalRoute = () => {
    switch (role) {
      case ROLES.ADMIN: return '/admin';
      case ROLES.KITCHEN: return '/kitchen';
      case ROLES.RECEPTIONIST: return '/receptionist';
      case ROLES.WAITER: return '/waiter';
      case ROLES.CUSTOMER: return '/customer/profile';
      default: return '/login';
    }
  };

  const getPortalIcon = () => {
    switch (role) {
      case ROLES.ADMIN: return ShieldAlert;
      case ROLES.KITCHEN: return ChefHat;
      case ROLES.RECEPTIONIST: return ConciergeBell;
      case ROLES.WAITER: return Users;
      default: return Compass;
    }
  };

  const PortalIcon = getPortalIcon();

  return (
    <header className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#D5BFA4]/40 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-[#6F4E37] flex items-center justify-center text-[#F4ECE1] shadow-md group-hover:bg-[#563B29] transition-colors">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#26160E] group-hover:text-[#6F4E37] transition-colors">
                Aura Mocha
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8E5B34]">
                Haute Cuisine & Lounge
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'text-[#6F4E37] font-semibold bg-[#F4ECE1]'
                      : 'text-[#3E271A] hover:text-[#6F4E37] hover:bg-[#F4ECE1]/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* If Not Authenticated -> Show Login Button */}
            {!isAuthenticated && (
              <Link to="/login">
                <Button variant="primary" size="md">
                  Login
                </Button>
              </Link>
            )}

            {/* If Staff Member -> Show Portal Quick Access */}
            {isAuthenticated && !isCustomer && (
              <div className="flex items-center gap-3">
                <Link to={getPortalRoute()}>
                  <Button variant="dark" size="sm" icon={PortalIcon}>
                    {ROLE_LABELS[role]} Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} icon={LogOut}>
                  Logout
                </Button>
              </div>
            )}

            {/* If Customer Logged In -> Show "Book a Table" & Customer Profile Dropdown */}
            {isAuthenticated && isCustomer && (
              <div className="flex items-center gap-3">
                <Link to="/customer/book-table">
                  <Button 
                    variant="primary" 
                    size="md" 
                    icon={Calendar}
                    className="shadow-md"
                  >
                    Book a Table
                  </Button>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full border border-[#D5BFA4] bg-white hover:border-[#6F4E37] transition-all focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
                    aria-label="User Profile Menu"
                  >
                    <img
                      src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                      alt={currentUser?.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#6F4E37]/30"
                    />
                    <span className="text-xs font-semibold text-[#26160E] max-w-[100px] truncate hidden lg:inline-block">
                      {currentUser?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#6F4E37] transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-[#D5BFA4]/40 py-2 z-50 animate-fadeIn">
                      <div className="px-4 py-2.5 border-b border-[#F4ECE1]">
                        <p className="text-xs text-[#8E5B34] font-medium uppercase tracking-wider">Signed in as</p>
                        <p className="text-sm font-bold text-[#26160E] truncate">{currentUser?.name}</p>
                        <p className="text-xs text-[#6F4E37]/70 truncate">{currentUser?.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/customer/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3E271A] hover:bg-[#F4ECE1] hover:text-[#6F4E37] transition-colors"
                        >
                          <User className="w-4 h-4 text-[#6F4E37]" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/customer/bookings"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3E271A] hover:bg-[#F4ECE1] hover:text-[#6F4E37] transition-colors"
                        >
                          <Calendar className="w-4 h-4 text-[#6F4E37]" />
                          <span>My Bookings</span>
                        </Link>
                      </div>

                      <div className="border-t border-[#F4ECE1] pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-700 hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated && isCustomer && (
              <Link to="/customer/profile" className="p-1">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#6F4E37]"
                />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#3E271A] hover:bg-[#F4ECE1] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D5BFA4]/40 bg-[#FAF6F0] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-[#6F4E37] text-white'
                    : 'text-[#3E271A] hover:bg-[#F4ECE1]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#D5BFA4]/40 flex flex-col gap-2">
            {!isAuthenticated ? (
              <Link to="/login" className="w-full">
                <Button variant="primary" className="w-full" size="md">
                  Login
                </Button>
              </Link>
            ) : isCustomer ? (
              <>
                <Link to="/customer/book-table" className="w-full">
                  <Button variant="primary" className="w-full" size="md" icon={Calendar}>
                    Book a Table
                  </Button>
                </Link>
                <Link to="/customer/profile" className="w-full">
                  <Button variant="secondary" className="w-full" size="md" icon={User}>
                    My Profile
                  </Button>
                </Link>
                <Link to="/customer/bookings" className="w-full">
                  <Button variant="secondary" className="w-full" size="md" icon={Calendar}>
                    My Bookings
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start text-red-700" onClick={handleLogout} icon={LogOut}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to={getPortalRoute()} className="w-full">
                  <Button variant="dark" className="w-full" size="md" icon={PortalIcon}>
                    Go to {ROLE_LABELS[role]} Portal
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start text-red-700" onClick={handleLogout} icon={LogOut}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
