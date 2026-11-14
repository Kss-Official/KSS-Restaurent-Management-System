import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, RESTAURANT_IMAGES } from '../../utils/constants';
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
  UserCheck,
  ArrowLeft,
  Briefcase
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
      let role = ROLES.CUSTOMER;
      if (email.includes('admin')) role = ROLES.ADMIN;
      else if (email.includes('manager')) role = ROLES.MANAGER;
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
      case ROLES.MANAGER:
        navigate('/manager');
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
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#542334]">
      
      {/* Heavily Blurred Background Image & Backdrop Filter */}
      <div className="absolute inset-0 z-0">
        <img
          src={RESTAURANT_IMAGES.hero}
          alt="Aura Mocha Luxury Restaurant"
          className="w-full h-full object-cover scale-110 filter blur-2xl opacity-35"
        />
        <div className="absolute inset-0 bg-[#542334]/85 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#542334] via-[#542334]/90 to-[#542334]"></div>
      </div>

      {/* Back to Home Button (floating at top left) */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-[#F4EDE8] text-xs font-semibold backdrop-blur-md border border-white/20 transition-all shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 text-[#C8A66B]" />
        <span>Back to Website</span>
      </Link>

      {/* Centered Login Card */}
      <div className="relative z-10 max-w-md w-full space-y-6 bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#E8DDD8] my-8">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-[#542334] text-white flex items-center justify-center shadow-md shadow-[#542334]/30">
              <UtensilsCrossed className="w-6 h-6 text-[#C8A66B]" />
            </div>
          </Link>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#542334]">
            Sign In to Aura Mocha
          </h2>
          <p className="text-xs sm:text-sm text-[#75696B]">
            Access your reservation account or portal dashboard
          </p>
        </div>

        {/* Quick Demo Role Selector */}
        <div className="p-3.5 bg-[#FAF7F5] rounded-2xl border border-[#E8DDD8] space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#542334] text-center">
            One-Click Portal Testing Access
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => handleQuickRoleLogin(ROLES.CUSTOMER)}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#873C50] hover:text-white text-[#2D2528] border border-[#E8DDD8] font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#C8A66B]" />
              <span>Customer</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin(ROLES.ADMIN)}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#873C50] hover:text-white text-[#2D2528] border border-[#E8DDD8] font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8A66B]" />
              <span>Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin(ROLES.MANAGER)}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#873C50] hover:text-white text-[#2D2528] border border-[#E8DDD8] font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#C8A66B]" />
              <span>Manager</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin(ROLES.KITCHEN)}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#873C50] hover:text-white text-[#2D2528] border border-[#E8DDD8] font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <ChefHat className="w-3.5 h-3.5 text-[#C8A66B]" />
              <span>Kitchen</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin(ROLES.RECEPTIONIST)}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#873C50] hover:text-white text-[#2D2528] border border-[#E8DDD8] font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <ConciergeBell className="w-3.5 h-3.5 text-[#C8A66B]" />
              <span>Reception</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickRoleLogin(ROLES.WAITER)}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#873C50] hover:text-white text-[#2D2528] border border-[#E8DDD8] font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <Users className="w-3.5 h-3.5 text-[#C8A66B]" />
              <span>Waiter</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[#E8DDD8]"></div>
          <span className="flex-shrink mx-3 text-xs text-[#75696B] uppercase tracking-wider font-semibold">Or Credentials</span>
          <div className="flex-grow border-t border-[#E8DDD8]"></div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-[#C44747] font-semibold">
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
            placeholder="e.g. customer@auramocha.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#2D2528]">
              Password
            </label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#75696B]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-sm rounded-lg border border-[#E8DDD8] bg-white pl-10 pr-10 py-2.5 text-[#2D2528] focus:outline-none focus:ring-2 focus:ring-[#873C50]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#75696B] hover:text-[#2D2528]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#2D2528]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#E8DDD8] text-[#873C50] focus:ring-[#873C50]"
              />
              <span>Remember Me</span>
            </label>
            <a
              href="#forgot-password"
              onClick={(e) => { e.preventDefault(); alert("Password reset link has been dispatched to your email address."); }}
              className="font-semibold text-[#873C50] hover:underline"
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
        <div className="text-center pt-2 border-t border-[#E8DDD8] text-xs text-[#75696B]">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-[#542334] hover:underline">
            Create Customer Account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;