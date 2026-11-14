import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store/store';
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
  Users,
  Briefcase,
  ShoppingBag,
  Heart,
  Tag,
  Clock,
  Star,
  HelpCircle
} from 'lucide-react';

export const Navbar = ({ onOpenBookingModal }) => {
  const { currentUser, isAuthenticated, isCustomer, logout, role } = useAuth();
  const { cart, wishlist } = useAppStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const cartTotalItems = cart ? cart.reduce((sum, item) => sum + item.qty, 0) : 0;
  const wishlistCount = wishlist ? wishlist.length : 0;

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
    { label: 'Offers', path: '/offers' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
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

  const getPortalIcon = () => {
    switch (role) {
      case ROLES.ADMIN: return ShieldAlert;
      case ROLES.MANAGER: return Briefcase;
      case ROLES.KITCHEN: return ChefHat;
      case ROLES.RECEPTIONIST: return ConciergeBell;
      case ROLES.WAITER: return Users;
      default: return Compass;
    }
  };

  const PortalIcon = getPortalIcon();

  return (
    <header className="sticky top-0 z-50 bg-[#F4EDE8]/95 backdrop-blur-md border-b border-[#A2766B]/30 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - #301A18 to #754D45 & #A2766B Accent */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#301A18] to-[#754D45] flex items-center justify-center text-[#FFFFFF] shadow-md group-hover:scale-105 transition-all border border-[#A2766B]/40">
              <UtensilsCrossed className="w-5 h-5 text-[#A2766B]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#301A18] group-hover:text-[#754D45] transition-colors">
                Aura Mocha
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#754D45]">
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
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-[#301A18] bg-[#FFFFFF] shadow-sm border border-[#A2766B]/40'
                      : 'text-[#301A18] hover:text-[#754D45] hover:bg-[#A2766B]/15'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Wishlist Button */}
            <Link 
              to="/wishlist" 
              className="relative p-2.5 rounded-xl border border-[#A2766B]/30 bg-white hover:bg-[#A2766B]/10 text-[#754D45] transition-colors shadow-sm"
              title="Culinary Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#754D45] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link 
              to="/cart" 
              className="relative p-2.5 rounded-xl border border-[#A2766B]/30 bg-white hover:bg-[#A2766B]/10 text-[#754D45] transition-colors shadow-sm"
              title="Table Order Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#754D45] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </Link>

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
                    className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full border border-[#A2766B]/40 bg-white hover:border-[#754D45] transition-all focus:outline-none focus:ring-2 focus:ring-[#754D45]"
                    aria-label="User Profile Menu"
                  >
                    <img
                      src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                      alt={currentUser?.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#754D45]/30"
                    />
                    <span className="text-xs font-semibold text-[#301A18] max-w-[100px] truncate hidden lg:inline-block">
                      {currentUser?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#754D45] transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-[#A2766B]/30 py-2 z-50 animate-fadeIn divide-y divide-[#A2766B]/20">
                      <div className="px-4 py-2.5">
                        <p className="text-[10px] text-[#A2766B] font-bold uppercase tracking-wider">Patron Account</p>
                        <p className="text-sm font-bold text-[#301A18] truncate">{currentUser?.name}</p>
                        <p className="text-xs text-[#754D45] truncate">{currentUser?.email}</p>
                      </div>

                      <div className="py-1.5 text-xs">
                        <Link
                          to="/customer/profile"
                          className="flex items-center gap-3 px-4 py-2 text-[#301A18] hover:bg-[#A2766B]/15 hover:text-[#301A18] transition-colors"
                        >
                          <User className="w-4 h-4 text-[#754D45]" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/customer/bookings"
                          className="flex items-center gap-3 px-4 py-2 text-[#301A18] hover:bg-[#A2766B]/15 hover:text-[#301A18] transition-colors"
                        >
                          <Calendar className="w-4 h-4 text-[#754D45]" />
                          <span>My Bookings</span>
                        </Link>
                        <Link
                          to="/customer/orders"
                          className="flex items-center gap-3 px-4 py-2 text-[#301A18] hover:bg-[#A2766B]/15 hover:text-[#301A18] transition-colors"
                        >
                          <Clock className="w-4 h-4 text-[#754D45]" />
                          <span>Live Table Orders</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          className="flex items-center gap-3 px-4 py-2 text-[#301A18] hover:bg-[#A2766B]/15 hover:text-[#301A18] transition-colors"
                        >
                          <Heart className="w-4 h-4 text-[#754D45]" />
                          <span>Culinary Wishlist ({wishlistCount})</span>
                        </Link>
                        <Link
                          to="/offers"
                          className="flex items-center gap-3 px-4 py-2 text-[#301A18] hover:bg-[#A2766B]/15 hover:text-[#301A18] transition-colors"
                        >
                          <Tag className="w-4 h-4 text-[#754D45]" />
                          <span>Special Offers & Vouchers</span>
                        </Link>
                        <Link
                          to="/support"
                          className="flex items-center gap-3 px-4 py-2 text-[#301A18] hover:bg-[#A2766B]/15 hover:text-[#301A18] transition-colors"
                        >
                          <HelpCircle className="w-4 h-4 text-[#754D45]" />
                          <span>Concierge Support</span>
                        </Link>
                      </div>

                      <div className="pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-[#754D45] hover:bg-[#A2766B]/10 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
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
            <Link to="/cart" className="relative p-2 text-[#754D45]">
              <ShoppingBag className="w-5 h-5" />
              {cartTotalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#754D45] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </Link>
            {isAuthenticated && isCustomer && (
              <Link to="/customer/profile" className="p-1">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#754D45]"
                />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#301A18] hover:bg-[#A2766B]/15 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#A2766B]/30 bg-[#F4EDE8] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-base font-semibold ${
                  location.pathname === link.path
                    ? 'bg-[#301A18] text-white'
                    : 'text-[#301A18] hover:bg-[#A2766B]/15'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#E8DDD8] flex flex-col gap-2">
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
                <Link to="/customer/orders" className="w-full">
                  <Button variant="secondary" className="w-full" size="md" icon={Clock}>
                    Live Table Orders
                  </Button>
                </Link>
                <Link to="/cart" className="w-full">
                  <Button variant="secondary" className="w-full" size="md" icon={ShoppingBag}>
                    Table Cart ({cartTotalItems})
                  </Button>
                </Link>
                <Link to="/customer/bookings" className="w-full">
                  <Button variant="secondary" className="w-full" size="md" icon={Calendar}>
                    My Bookings
                  </Button>
                </Link>
                <Link to="/wishlist" className="w-full">
                  <Button variant="secondary" className="w-full" size="md" icon={Heart}>
                    Wishlist ({wishlistCount})
                  </Button>
                </Link>
                <Link to="/customer/profile" className="w-full">
                  <Button variant="secondary" className="w-full" size="md" icon={User}>
                    My Profile
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start text-[#C44747]" onClick={handleLogout} icon={LogOut}>
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
                <Button variant="ghost" className="w-full justify-start text-[#C44747]" onClick={handleLogout} icon={LogOut}>
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