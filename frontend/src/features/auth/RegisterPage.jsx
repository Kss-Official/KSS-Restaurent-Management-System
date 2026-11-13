import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { UtensilsCrossed, User, Mail, Phone, Lock, CheckCircle2 } from 'lucide-react';

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
      // Create user and auto log in as customer
      login(ROLES.CUSTOMER, {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        memberSince: "Nov 2026"
      });
      setLoading(false);
      // Redirect to Home page as specified
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-[85vh] bg-[#FAF6F0] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-[#D5BFA4]/50">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-[#6F4E37] text-white flex items-center justify-center shadow-md">
              <UtensilsCrossed className="w-6 h-6 text-[#E6D7C3]" />
            </div>
          </Link>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#26160E]">
            Join Aura Mocha
          </h2>
          <p className="text-xs sm:text-sm text-[#8E5B34]">
            Create your customer account to reserve tables and track dining history
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#563B29]">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="w-4 h-4 mt-0.5 rounded border-[#D5BFA4] text-[#6F4E37] focus:ring-[#6F4E37]"
              />
              <span>
                I agree to the <a href="#terms" className="font-semibold text-[#6F4E37] hover:underline">Terms of Hospitality</a> and reservation cancellation policy.
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-xs text-red-600 font-medium mt-1">{errors.agreeTerms}</p>
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

        <div className="text-center pt-2 border-t border-[#F4ECE1] text-xs text-[#563B29]">
          Already an esteemed guest?{' '}
          <Link to="/login" className="font-bold text-[#6F4E37] hover:underline">
            Sign In here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
