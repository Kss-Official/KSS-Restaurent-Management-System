import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, RESTAURANT_IMAGES } from '../../utils/constants';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { UtensilsCrossed, User, Mail, Phone, Lock, ArrowLeft } from 'lucide-react';

export const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email address is required.';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = 'Valid mobile phone number is required.';
    }
    if (!formData.password || formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.agreeTerms) {
      errs.agreeTerms = 'You must agree to the Terms of Hospitality.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(ROLES.CUSTOMER, {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        memberSince: "Nov 2026"
      });
      setLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-gradient-to-b from-[#301A18] via-[#754D45] to-[#301A18]">
      
      {/* Heavily Blurred Background Image & Backdrop Filter */}
      <div className="absolute inset-0 z-0">
        <img
          src={RESTAURANT_IMAGES.heroAlt}
          alt="Aura Mocha Luxury Restaurant"
          className="w-full h-full object-cover scale-110 filter blur-2xl opacity-20"
        />
        <div className="absolute inset-0 bg-[#301A18]/70 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#301A18] via-[#754D45]/90 to-[#301A18]"></div>
      </div>

      {/* Back to Website Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FFFFFF] text-xs font-semibold backdrop-blur-md border border-[#A2766B]/30 transition-all shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 text-[#A2766B]" />
        <span>Back to Website</span>
      </Link>

      {/* Centered Registration Card */}
      <div className="relative z-10 max-w-md w-full space-y-5 bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#A2766B]/30 my-8">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-[#301A18] text-white flex items-center justify-center shadow-md shadow-[#301A18]/30">
              <UtensilsCrossed className="w-6 h-6 text-[#A2766B]" />
            </div>
          </Link>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#301A18]">
            Join Aura Mocha
          </h2>
          <p className="text-xs sm:text-sm text-[#754D45]">
            Create your customer account to reserve tables and track dining history
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Input
            label="Full Name"
            id="register-name"
            icon={User}
            placeholder="e.g. Lady Vivienne Rose"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            error={errors.fullName}
            required
          />

          <Input
            label="Email Address"
            id="register-email"
            type="email"
            icon={Mail}
            placeholder="vivienne@luxury.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            required
          />

          <Input
            label="Mobile Number"
            id="register-phone"
            type="tel"
            icon={Phone}
            placeholder="+1 (555) 234-5678"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
            required
          />

          <Input
            label="Password"
            id="register-password"
            type="password"
            icon={Lock}
            placeholder="Create password (min 6 characters)"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            required
          />

          <Input
            label="Confirm Password"
            id="register-confirm-password"
            type="password"
            icon={Lock}
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
            required
          />

          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#301A18]">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="w-4 h-4 mt-0.5 rounded border-[#A2766B]/40 text-[#754D45] focus:ring-[#754D45]"
              />
              <span>
                I agree to the <a href="#terms" className="font-semibold text-[#754D45] hover:underline">Terms of Hospitality</a>.
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-xs text-[#754D45] font-medium mt-1">{errors.agreeTerms}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full mt-2"
          >
            Create Customer Account
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-[#A2766B]/30 text-xs text-[#754D45]">
          Already an esteemed guest?{' '}
          <Link to="/login" className="font-bold text-[#301A18] hover:underline">
            Sign In here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;