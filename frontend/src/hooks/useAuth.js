import { useAppStore } from '../store/store';
import { ROLES } from '../utils/constants';

export const useAuth = () => {
  const { currentUser, login, logout } = useAppStore();

  const isAuthenticated = Boolean(currentUser);
  const isCustomer = currentUser?.role === ROLES.CUSTOMER;
  const isAdmin = currentUser?.role === ROLES.ADMIN;
  const isKitchen = currentUser?.role === ROLES.KITCHEN;
  const isReceptionist = currentUser?.role === ROLES.RECEPTIONIST;
  const isWaiter = currentUser?.role === ROLES.WAITER;
  const isStaff = isAuthenticated && !isCustomer;

  return {
    currentUser,
    isAuthenticated,
    isCustomer,
    isAdmin,
    isKitchen,
    isReceptionist,
    isWaiter,
    isStaff,
    role: currentUser?.role || null,
    login,
    logout
  };
};

export default useAuth;
