import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES, INITIAL_BOOKINGS, INITIAL_MENU_ITEMS } from '../utils/constants';
import { getStoredItem, setStoredItem } from '../utils/helpers';

// Preset credentials for easy testing across all 5 portals
export const DEMO_USERS = {
  customer: {
    id: "cust-1",
    name: "Sophia Montgomery",
    email: "customer@auramocha.com",
    role: ROLES.CUSTOMER,
    phone: "+1 (555) 392-8819",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    memberSince: "May 2024"
  },
  admin: {
    id: "admin-1",
    name: "Arthur Pendelton",
    email: "admin@auramocha.com",
    role: ROLES.ADMIN,
    phone: "+1 (555) 800-4499",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    department: "Executive Operations"
  },
  kitchen: {
    id: "kitchen-1",
    name: "Chef Marco Pierre",
    email: "kitchen@auramocha.com",
    role: ROLES.KITCHEN,
    phone: "+1 (555) 777-2211",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80",
    station: "Head Chef - Hot Kitchen"
  },
  receptionist: {
    id: "rec-1",
    name: "Elena Rostova",
    email: "reception@auramocha.com",
    role: ROLES.RECEPTIONIST,
    phone: "+1 (555) 444-1234",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    desk: "Front Desk Concierge"
  },
  waiter: {
    id: "waiter-1",
    name: "Julian Vance",
    email: "waiter@auramocha.com",
    role: ROLES.WAITER,
    phone: "+1 (555) 666-8921",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    assignedSection: "Floor A (Tables 1-8)"
  }
};

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Current logged in user (null = public visitor)
  const [currentUser, setCurrentUser] = useState(() => {
    return getStoredItem('aura_user', null);
  });

  // Bookings list
  const [bookings, setBookings] = useState(() => {
    return getStoredItem('aura_bookings', INITIAL_BOOKINGS);
  });

  // Menu Items
  const [menuItems, setMenuItems] = useState(() => {
    return getStoredItem('aura_menu', INITIAL_MENU_ITEMS);
  });

  // Kitchen Orders (KOT)
  const [kitchenOrders, setKitchenOrders] = useState(() => {
    return getStoredItem('aura_kitchen_orders', [
      {
        id: "KOT-101",
        table: "Table 4",
        waiter: "Julian Vance",
        time: "10 mins ago",
        status: "Preparing", // 'New', 'Preparing', 'Ready', 'Completed'
        items: [
          { name: "Dry-Aged Mocha Ribeye", qty: 2, notes: "Medium Rare, extra reduction" },
          { name: "Artisanal Burrata & Heirloom Fig", qty: 1, notes: "No nuts" }
        ]
      },
      {
        id: "KOT-102",
        table: "Table 12",
        waiter: "Julian Vance",
        time: "3 mins ago",
        status: "New",
        items: [
          { name: "Truffle & Wild Mushroom Pappardelle", qty: 2, notes: "Extra parmesan" },
          { name: "Pan-Seared Hokkaido Scallops", qty: 1, notes: "Crispy pancetta on side" }
        ]
      },
      {
        id: "KOT-103",
        table: "Table 7",
        waiter: "Elena R.",
        time: "18 mins ago",
        status: "Ready",
        items: [
          { name: "Rosemary Glazed Colorado Lamb", qty: 2, notes: "Gluten-free plating" },
          { name: "Warm Mocha Chocolate Fondant", qty: 2, notes: "Serve with warm espresso shot" }
        ]
      },
      {
        id: "KOT-104",
        table: "Table 2",
        waiter: "Julian Vance",
        time: "45 mins ago",
        status: "Completed",
        items: [
          { name: "Velvet Espresso Crème Brûlée", qty: 2, notes: "" }
        ]
      }
    ]);
  });

  // Waiter Tables
  const [tables, setTables] = useState(() => {
    return getStoredItem('aura_tables', [
      { id: "T-01", number: 1, capacity: 2, status: "Available", waiter: "Julian Vance" },
      { id: "T-02", number: 2, capacity: 4, status: "Occupied", currentOrder: "KOT-104", waiter: "Julian Vance" },
      { id: "T-03", number: 3, capacity: 2, status: "Available", waiter: "Julian Vance" },
      { id: "T-04", number: 4, capacity: 4, status: "Occupied", currentOrder: "KOT-101", waiter: "Julian Vance" },
      { id: "T-05", number: 5, capacity: 6, status: "Reserved", guestName: "Alexander Wright", waiter: "Julian Vance" },
      { id: "T-06", number: 6, capacity: 2, status: "Available", waiter: "Julian Vance" },
      { id: "T-07", number: 7, capacity: 4, status: "Occupied", currentOrder: "KOT-103", waiter: "Julian Vance" },
      { id: "T-08", number: 8, capacity: 6, status: "Available", waiter: "Julian Vance" }
    ]);
  });

  // Save changes to localStorage
  useEffect(() => {
    setStoredItem('aura_user', currentUser);
  }, [currentUser]);

  useEffect(() => {
    setStoredItem('aura_bookings', bookings);
  }, [bookings]);

  useEffect(() => {
    setStoredItem('aura_kitchen_orders', kitchenOrders);
  }, [kitchenOrders]);

  useEffect(() => {
    setStoredItem('aura_tables', tables);
  }, [tables]);

  // Auth actions
  const login = (role, customData = null) => {
    let user;
    if (customData) {
      user = {
        id: "cust-" + Date.now(),
        role: ROLES.CUSTOMER,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        memberSince: "Nov 2026",
        ...customData
      };
    } else if (DEMO_USERS[role]) {
      user = DEMO_USERS[role];
    } else {
      user = DEMO_USERS.customer;
    }
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: "Cancelled" } : b));
  };

  const updateBookingStatus = (bookingId, status, tableNo = null) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status, ...(tableNo ? { tableNo } : {}) };
      }
      return b;
    }));
  };

  const updateKitchenStatus = (orderId, newStatus) => {
    setKitchenOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
  };

  const updateTableStatus = (tableId, newStatus) => {
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, status: newStatus } : t));
  };

  const createTableOrder = (tableNumber, items, notes) => {
    const newKotId = "KOT-" + Math.floor(100 + Math.random() * 900);
    const newOrder = {
      id: newKotId,
      table: `Table ${tableNumber}`,
      waiter: currentUser?.name || "Julian Vance",
      time: "Just now",
      status: "New",
      items: items.map(item => ({
        name: item.name,
        qty: item.qty || 1,
        notes: notes || ""
      }))
    };
    setKitchenOrders(prev => [newOrder, ...prev]);
    // update table
    setTables(prev => prev.map(t => t.number === tableNumber ? { ...t, status: "Occupied", currentOrder: newKotId } : t));
    return newKotId;
  };

  const value = {
    currentUser,
    login,
    logout,
    bookings,
    addBooking,
    cancelBooking,
    updateBookingStatus,
    menuItems,
    setMenuItems,
    kitchenOrders,
    updateKitchenStatus,
    tables,
    updateTableStatus,
    createTableOrder
  };

  return React.createElement(AppContext.Provider, { value }, children);
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
