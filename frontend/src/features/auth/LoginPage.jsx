import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../utils/constants';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { 
  UtensilsCrossed, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ShieldCheck, 
  ChefHat, 
  ConciergeBell, 
  Users, 
  UserCheck 
} from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Search query redirect
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleManualLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email/username and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Determine role from email domain or fallback to customer
      let role = ROLES.CUSTOMER;
      if (email.includes('admin')) role = ROLES.ADMIN;
      else if (email.includes('kitchen')) role = ROLES.KITCHEN;
      else if (email.includes('reception')) role = ROLES.RECEPTIONIST;
      else if (email.includes('waiter')) role = ROLES.WAITER;

      login(role, { email, name: email.split('@')[0] });
      setLoading(false);
      redirectToRole(role);
    }, 600);
  };

  const handleQuickRoleLogin = (role) => {
    setLoading(true);
    setTimeout(() => {
      login(role);
      setLoading(false);
      redirectToRole(role);
    }, 400);
  };

  const redirectToRole = (role) => {
    if (redirectPath && role === ROLES.CUSTOMER) {
      navigate(redirectPath);
      return;
    }

    switch (role) {
      case ROLES.ADMIN:
        navigate('/admin');
        break;
      case ROLES.KITCHEN:
        navigate('/kitchen');
        break;
      case ROLES.RECEPTIONIST:
        navigate('/receptionist');
        break;
      case ROLES.WAITER:
        navigate('/waiter');
        break;
      case ROLES.CUSTOMER:
      default:
        navigate('/');
        break;
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#FAF6F0] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-[#D5BFA4]/50">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-[#6F4E37] text-white flex items-center justify-center shadow-md">
              <UtensilsCrossed className="w-6 h-6 text-[#E6D7C3]" />
            </div>
          </Link>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#26160E]">
            Welcome to Aura Mocha
          </h2>
          <p className="text-xs sm:text-sm text-[#8E5B34]">
            Sign in to access your portal or reservation account
          </p>
        </div>

        {/* Quick Demo Role Selector (Essential for testing all 5 portals effortlessly) */}
        <div className="p-3.5 bg-[#FAF6F0] rounded-2xl border border-[#D5BFA4]/60 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#6F4E37] text-center">
            One-Click Portal Testing Access
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => handleQuickRoleLogin(ROLES.CUSTOMER)}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#6F4E37] hover:text-white text-[#26160E] border border-[#D5BFA4]/40 font-medium transition-colors flex items-center justify-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#C89B4A]" />
              <span>Customer</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin(ROLES.ADMIN)}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#6F4E37] hover:text-white text-[#26160E] border border-[#D5BFA4]/40 font-medium transition-colors flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C89B4A]" />
              <span>Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin(ROLES.KITCHEN)}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#6F4E37] hover:text-white text-[#26160E] border border-[#D5BFA4]/40 font-medium transition-colors flex items-center justify-center gap-1"
            >
              <ChefHat className="w-3.5 h-3.5 text-[#C89B4A]" />
              <span>Kitchen</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin(ROLES.RECEPTIONIST)}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#6F4E37] hover:text-white text-[#26160E] border border-[#D5BFA4]/40 font-medium transition-colors flex items-center justify-center gap-1"
            >
              <ConciergeBell className="w-3.5 h-3.5 text-[#C89B4A]" />
              <span>Reception</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin(ROLES.WAITER)}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#6F4E37] hover:text-white text-[#26160E] border border-[#D5BFA4]/40 font-medium transition-colors flex items-center justify-center gap-1 col-span-2 sm:col-span-1"
            >
              <Users className="w-3.5 h-3.5 text-[#C89B4A]" />
              <span>Waiter</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[#D5BFA4]/40"></div>
          <span className="flex-shrink mx-3 text-xs text-[#8E5B34] uppercase tracking-wider font-semibold">Or Sign In with Credentials</span>
          <div className="flex-grow border-t border-[#D5BFA4]/40"></div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleManualLogin} className="space-y-4">
          <Input
            label="Email or Username"
            id="login-email"
            type="text"
            icon={Mail}
            placeholder="e.g. sophia@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#3E271A]">
              Password
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8E5B34]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-sm rounded-lg border border-[#D5BFA4] bg-white pl-10 pr-10 py-2.5 text-[#26160E] focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8E5B34] hover:text-[#26160E]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#3E271A]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#D5BFA4] text-[#6F4E37] focus:ring-[#6F4E37]"
              />
              <span>Remember Me</span>
            </label>
            <a
              href="#forgot-password"
              onClick={(e) => { e.preventDefault(); alert("Password reset link has been dispatched to your email address."); }}
              className="font-semibold text-[#6F4E37] hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full mt-2"
          >
            Sign In to Account
          </Button>
        </form>

        {/* Register CTA */}
        <div className="text-center pt-2 border-t border-[#F4ECE1] text-xs text-[#563B29]">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-[#6F4E37] hover:underline">
            Create Customer Account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
