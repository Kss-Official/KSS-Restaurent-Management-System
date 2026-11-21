import React from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
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
import BlogsPage from '../features/public/BlogsPage';

// Auth Pages
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';

// Customer Pages
import BookTablePage from '../features/customer/BookTablePage';
import ProfilePage from '../features/customer/ProfilePage';
import CustomerBookingsPage from '../features/customer/CustomerBookingsPage';
import CustomerOrdersPage from '../features/customer/CustomerOrdersPage';
import OrderTrackingPage from '../features/customer/OrderTrackingPage';
import PaymentInvoicePage from '../features/customer/PaymentInvoicePage';
import CartPage from '../features/customer/CartPage';
import OffersPage from '../features/customer/OffersPage';
import WishlistPage from '../features/customer/WishlistPage';
import ReviewsPage from '../features/customer/ReviewsPage';
import SupportPage from '../features/customer/SupportPage';

// Portals
import AdminPortal from '../features/admin/AdminPortal';
import ManagerPortal from '../features/manager/ManagerPortal';
import KitchenPortal from '../features/kitchen/KitchenPortal';
import ReceptionistPortal from '../features/receptionist/ReceptionistPortal';
import WaiterPortal from '../features/waiter/WaiterPortal';

// Additional feature pages
import DashboardPage from '../features/dashboard/DashboardPage';
import UserListPage from '../features/users/UserListPage';
import UserDetailPage from '../features/users/UserDetailPage';

// Layout for Public & Customer Pages (with Header and Footer)
const PublicLayout = () => {
  const location = useLocation();
  // Pages with full-bleed top hero banner under the floating glass navbar
  const isFullBleedHero = location.pathname === '/' || location.pathname === '/menu' || location.pathname === '/about' || location.pathname === '/reviews' || location.pathname === '/blogs';
  const isReservationPage = location.pathname === '/book-table' || location.pathname === '/reserve' || location.pathname === '/customer/book-table';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />
      <main className={`flex-1 ${!isFullBleedHero ? 'pt-24 sm:pt-28' : ''}`}>
        <Outlet />
      </main>
      {!isReservationPage && <Footer />}
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
        <Route path="/blogs" element={<BlogsPage />} />

        {/* Reservation Routes (Protected for Customer & Admin) */}
        <Route
          path="/book-table"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <BookTablePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reserve"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <BookTablePage />
            </ProtectedRoute>
          }
        />

        {/* Public / Customer accessible features */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/support" element={<SupportPage />} />

        {/* Customer Portal routes */}
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
        <Route
          path="/customer/orders"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <CustomerOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/order-tracking"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <OrderTrackingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-tracking"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <OrderTrackingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/invoice"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <PaymentInvoicePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoice"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <PaymentInvoicePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/cart"
          element={<CartPage />}
        />
        <Route
          path="/customer/offers"
          element={<OffersPage />}
        />
        <Route
          path="/customer/wishlist"
          element={<WishlistPage />}
        />
        <Route
          path="/customer/reviews"
          element={<ReviewsPage />}
        />
        <Route
          path="/customer/support"
          element={<SupportPage />}
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
        path="/manager/*"
        element={
          <ProtectedRoute allowedRoles={[ROLES.MANAGER, ROLES.ADMIN]}>
            <ManagerPortal />
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