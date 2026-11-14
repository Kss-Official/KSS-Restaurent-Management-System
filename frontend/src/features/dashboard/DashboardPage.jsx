import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../utils/constants';
import { Link, Navigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { ShieldCheck, ChefHat, ConciergeBell, Users, User, Briefcase } from 'lucide-react';

export const DashboardPage = () => {
  const { currentUser, role } = useAuth();

  if (role === ROLES.ADMIN) return <Navigate to="/admin" replace />;
  if (role === ROLES.MANAGER) return <Navigate to="/manager" replace />;
  if (role === ROLES.KITCHEN) return <Navigate to="/kitchen" replace />;
  if (role === ROLES.RECEPTIONIST) return <Navigate to="/receptionist" replace />;
  if (role === ROLES.WAITER) return <Navigate to="/waiter" replace />;
  if (role === ROLES.CUSTOMER) return <Navigate to="/customer/profile" replace />;

  return (
    <div className="min-h-[80vh] bg-[#F4EDE8] flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white p-8 rounded-3xl border border-[#E8DDD8] shadow-xl text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-[#301A18]">
          Restaurant Portals Access
        </h2>
        <p className="text-sm text-[#754D45]">
          Select the portal you wish to access with your authorized credentials.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <Link to="/login" className="p-4 rounded-xl border border-[#E8DDD8]/60 hover:border-[#754D45] bg-[#F4EDE8] transition-colors">
            <ShieldCheck className="w-6 h-6 text-[#754D45] mb-2" />
            <h4 className="font-bold text-[#301A18]">Admin Portal</h4>
            <p className="text-xs text-[#754D45]">Executive management & reports</p>
          </Link>
          <Link to="/login" className="p-4 rounded-xl border border-[#E8DDD8]/60 hover:border-[#754D45] bg-[#F4EDE8] transition-colors">
            <Briefcase className="w-6 h-6 text-[#754D45] mb-2" />
            <h4 className="font-bold text-[#301A18]">Manager Portal</h4>
            <p className="text-xs text-[#754D45]">Operations, floor & inventory oversight</p>
          </Link>
          <Link to="/login" className="p-4 rounded-xl border border-[#E8DDD8]/60 hover:border-[#754D45] bg-[#F4EDE8] transition-colors">
            <ChefHat className="w-6 h-6 text-[#754D45] mb-2" />
            <h4 className="font-bold text-[#301A18]">Kitchen Portal</h4>
            <p className="text-xs text-[#754D45]">KDS & live cooking tickets</p>
          </Link>
          <Link to="/login" className="p-4 rounded-xl border border-[#E8DDD8]/60 hover:border-[#754D45] bg-[#F4EDE8] transition-colors">
            <ConciergeBell className="w-6 h-6 text-[#754D45] mb-2" />
            <h4 className="font-bold text-[#301A18]">Reception Portal</h4>
            <p className="text-xs text-[#754D45]">Front desk, check-in & seating</p>
          </Link>
          <Link to="/login" className="p-4 rounded-xl border border-[#E8DDD8]/60 hover:border-[#754D45] bg-[#F4EDE8] transition-colors">
            <Users className="w-6 h-6 text-[#754D45] mb-2" />
            <h4 className="font-bold text-[#301A18]">Waiter Portal</h4>
            <p className="text-xs text-[#754D45]">Table service & order taking</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
