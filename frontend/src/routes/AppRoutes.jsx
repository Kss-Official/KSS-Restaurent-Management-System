import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../utils/constants';

// Public Pages
import HomePage from '../features/public/HomePage';
import AboutPage from '../features/public/AboutPage';
import ServicesPage from '../features/public/ServicesPage';
import MenuPage from '../features/public/MenuPage';
import ContactPage from '../features/public/ContactPage';

// Auth Pages
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';

// Customer Pages
import BookTablePage from '../features/customer/BookTablePage';
import ProfilePage from '../features/customer/ProfilePage';
import CustomerBookingsPage from '../features/customer/CustomerBookingsPage';

// Portals
import AdminPortal from '../features/admin/AdminPortal';
import KitchenPortal from '../features/kitchen/KitchenPortal';
import ReceptionistPortal from '../features/receptionist/ReceptionistPortal';
import WaiterPortal from '../features/waiter/WaiterPortal';

// Additional feature pages
import DashboardPage from '../features/dashboard/DashboardPage';
import UserListPage from '../features/users/UserListPage';
import UserDetailPage from '../features/users/UserDetailPage';

// Layout for Public & Customer Pages (with Header and Footer)
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Standalone Auth Routes (No Header & No Footer, full blur immersive background) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 1. Public & Customer Routes with standard luxury layout (Header & Footer) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Customer Portal routes (Protected) */}
        <Route
          path="/customer/book-table"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <BookTablePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/bookings"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <CustomerBookingsPage />
            </ProtectedRoute>
          }
        />

        {/* General Dashboard & Users */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <UserListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <UserDetailPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 2. Staff Portals (Specialized Dashboard Layouts with Mocha Brown Sidebar) */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminPortal />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kitchen/*"
        element={
          <ProtectedRoute allowedRoles={[ROLES.KITCHEN, ROLES.ADMIN]}>
            <KitchenPortal />
          </ProtectedRoute>
        }
      />

      <Route
        path="/receptionist/*"
        element={
          <ProtectedRoute allowedRoles={[ROLES.RECEPTIONIST, ROLES.ADMIN]}>
            <ReceptionistPortal />
          </ProtectedRoute>
        }
      />

      <Route
        path="/waiter/*"
        element={
          <ProtectedRoute allowedRoles={[ROLES.WAITER, ROLES.ADMIN]}>
            <WaiterPortal />
          </ProtectedRoute>
        }
      />

      {/* Catch-all fallback */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
