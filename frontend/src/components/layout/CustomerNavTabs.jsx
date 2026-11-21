import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const CustomerNavTabs = ({ rightElement, className = '' }) => {
  const location = useLocation();

  const navTabs = [
    { label: 'My Orders', path: '/customer/orders' },
    { label: 'Order Tracking', path: '/customer/order-tracking' },
    { label: 'Table Booking History', path: '/customer/bookings' },
    { label: 'Payment & Invoice', path: '/customer/invoice' },
    { label: 'My Profile', path: '/customer/profile' },
  ];

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#EADBCC] pb-4 print:hidden ${className}`}>
      <div className="flex items-center gap-2 flex-wrap">
        {navTabs.map((tab) => {
          const isActive =
            location.pathname === tab.path ||
            (tab.path === '/customer/order-tracking' && location.pathname === '/order-tracking');

          return (
            <Link
              key={tab.label}
              to={tab.path}
              className={`px-4 py-2 rounded-full text-xs transition-all duration-150 ${
                isActive
                  ? 'bg-[#4C1824] text-white font-bold shadow-xs'
                  : 'bg-white text-[#754D45] hover:bg-[#FAF7F2] font-semibold border border-[#EADBCC]'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
      {rightElement && (
        <div className="flex-shrink-0 self-start sm:self-auto">
          {rightElement}
        </div>
      )}
    </div>
  );
};

export default CustomerNavTabs;
