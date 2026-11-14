import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ROLES, 
  INITIAL_BOOKINGS, 
  INITIAL_MENU_ITEMS, 
  INITIAL_TABLES, 
  INITIAL_SESSIONS, 
  INITIAL_ORDERS,
  INITIAL_WAITING_LIST,
  INITIAL_OFFERS,
  INITIAL_REVIEWS,
  INITIAL_COMPLAINTS,
  INITIAL_INVENTORY 
} from '../utils/constants';
import { getStoredItem, setStoredItem, generateBookingId, generateSessionId, getQrCodeUrl } from '../utils/helpers';

// Preset credentials for instant testing across all 6 portals
export const DEMO_USERS = {
  admin: {
    id: "admin-1",
    name: "Arthur Pendelton",
    email: "admin@auramocha.com",
    role: ROLES.ADMIN,
    phone: "+1 (555) 800-4499",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    department: "Executive Operations & General Ownership"
  },
  manager: {
    id: "mgr-1",
    name: "Harrison Blake",
    email: "manager@auramocha.com",
    role: ROLES.MANAGER,
    phone: "+1 (555) 300-8800",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    department: "Operations & Floor Management"
  },
  receptionist: {
    id: "rec-1",
    name: "Elena Rostova",
    email: "reception@auramocha.com",
    role: ROLES.RECEPTIONIST,
    phone: "+1 (555) 444-1234",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    desk: "Front Desk & Reservations Concierge"
  },
  customer: {
    id: "cust-1",
    name: "Sophia Montgomery",
    email: "customer@auramocha.com",
    role: ROLES.CUSTOMER,
    phone: "+1 (555) 392-8819",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    memberSince: "May 2024",
    tier: "Black Gold Connoisseur"
  },
  kitchen: {
    id: "kitchen-1",
    name: "Chef Marco Pierre",
    email: "kitchen@auramocha.com",
    role: ROLES.KITCHEN,
    phone: "+1 (555) 777-2211",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80",
    station: "Head Chef - Hot Kitchen & Pass"
  },
  waiter: {
    id: "waiter-1",
    name: "Julian Vance",
    email: "waiter@auramocha.com",
    role: ROLES.WAITER,
    phone: "+1 (555) 666-8921",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    assignedSection: "Floor A (Window & Booths)"
  }
};

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // 1. Current Authenticated User
  const [currentUser, setCurrentUser] = useState(() => getStoredItem('aura_user', null));

  // 2. Physical Tables
  const [tables, setTables] = useState(() => getStoredItem('aura_tables', INITIAL_TABLES));

  // 3. Dining Table Sessions (Daily 6-digit session number)
  const [sessions, setSessions] = useState(() => getStoredItem('aura_sessions', INITIAL_SESSIONS));

  // 4. Reservations / Bookings
  const [bookings, setBookings] = useState(() => getStoredItem('aura_bookings', INITIAL_BOOKINGS));

  // 5. Orders (Linked to 6-digit Session ID)
  const [orders, setOrders] = useState(() => getStoredItem('aura_orders', INITIAL_ORDERS));

  // 6. Menu Catalog
  const [menuItems, setMenuItems] = useState(() => getStoredItem('aura_menu', INITIAL_MENU_ITEMS));

  // 7. Reception Waiting List
  const [waitingList, setWaitingList] = useState(() => getStoredItem('aura_waiting_list', INITIAL_WAITING_LIST));

  // 8. Offers & Coupons
  const [offers, setOffers] = useState(() => getStoredItem('aura_offers', INITIAL_OFFERS));

  // 9. Reviews & Complaints
  const [reviews, setReviews] = useState(() => getStoredItem('aura_reviews', INITIAL_REVIEWS));
  const [complaints, setComplaints] = useState(() => getStoredItem('aura_complaints', INITIAL_COMPLAINTS));

  // 10. Inventory & Ingredients
  const [inventory, setInventory] = useState(() => getStoredItem('aura_inventory', INITIAL_INVENTORY));

  // 11. Customer Cart & Wishlist
  const [cart, setCart] = useState(() => getStoredItem('aura_cart', []));
  const [wishlist, setWishlist] = useState(() => getStoredItem('aura_wishlist', [1, 2, 6]));
  const [appliedCoupon, setAppliedCoupon] = useState(() => getStoredItem('aura_applied_coupon', null));

  // 12. Real-Time Notifications
  const [notifications, setNotifications] = useState(() => getStoredItem('aura_notifications', [
    { id: 1, title: "New Reservation Confirmed", message: "Sophia Montgomery reserved Table 2 for 4 guests.", time: "10 mins ago", unread: true },
    { id: 2, title: "Order Ready to Serve", message: "Table 7 Lamb Cutlets ready at kitchen pass.", time: "2 mins ago", unread: true },
    { id: 3, title: "Low Stock Trigger", message: "Dry-Aged Ribeye inventory is below threshold (18 cuts).", time: "1 hr ago", unread: false }
  ]));

  // Auto-persist all synchronized states
  useEffect(() => { setStoredItem('aura_user', currentUser); }, [currentUser]);
  useEffect(() => { setStoredItem('aura_tables', tables); }, [tables]);
  useEffect(() => { setStoredItem('aura_sessions', sessions); }, [sessions]);
  useEffect(() => { setStoredItem('aura_bookings', bookings); }, [bookings]);
  useEffect(() => { setStoredItem('aura_orders', orders); }, [orders]);
  useEffect(() => { setStoredItem('aura_menu', menuItems); }, [menuItems]);
  useEffect(() => { setStoredItem('aura_waiting_list', waitingList); }, [waitingList]);
  useEffect(() => { setStoredItem('aura_offers', offers); }, [offers]);
  useEffect(() => { setStoredItem('aura_reviews', reviews); }, [reviews]);
  useEffect(() => { setStoredItem('aura_complaints', complaints); }, [complaints]);
  useEffect(() => { setStoredItem('aura_inventory', inventory); }, [inventory]);
  useEffect(() => { setStoredItem('aura_cart', cart); }, [cart]);
  useEffect(() => { setStoredItem('aura_wishlist', wishlist); }, [wishlist]);
  useEffect(() => { setStoredItem('aura_applied_coupon', appliedCoupon); }, [appliedCoupon]);
  useEffect(() => { setStoredItem('aura_notifications', notifications); }, [notifications]);

  // Auth Functions
  const login = (role, customData = null) => {
    let user;
    if (customData) {
      user = {
        id: "cust-" + Date.now(),
        role: ROLES.CUSTOMER,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        memberSince: "Nov 2026",
        tier: "Silver Guest",
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

  // TABLE LIFECYCLE: Available -> Reserved -> Occupied -> Cleaning -> Available
  const updateTableStatus = (tableId, newStatus) => {
    setTables(prev => prev.map(t => {
      if (t.id === tableId || t.number === tableId) {
        return { 
          ...t, 
          status: newStatus,
          activeSessionId: (newStatus === 'Available' || newStatus === 'Cleaning') ? null : t.activeSessionId
        };
      }
      return t;
    }));
  };

  const assignTableWaiter = (tableNumber, waiterName) => {
    setTables(prev => prev.map(t => t.number === tableNumber ? { ...t, waiter: waiterName } : t));
  };

  // CHECK-IN & 6-DIGIT TABLE SESSION GENERATION
  const startTableSession = ({ tableNumber, guestName, guestPhone, partySize, reservationId = null, advancePaid = 0 }) => {
    const newSessionId = generateSessionId(sessions.length);
    const tableId = `T-${String(tableNumber).padStart(2, '0')}`;

    const newSession = {
      sessionId: newSessionId,
      tableNumber,
      tableId,
      reservationId,
      guestName,
      guestPhone,
      partySize,
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      checkOutTime: null,
      status: "Active",
      waiter: tables.find(t => t.number === tableNumber)?.waiter || "Julian Vance",
      orders: [],
      advancePayment: Number(advancePaid) || 0,
      subtotal: 0,
      tax: 0,
      serviceCharge: 0,
      discount: 0,
      total: 0,
      paymentStatus: "Pending",
      paymentMethod: null
    };

    // Update Sessions
    setSessions(prev => [newSession, ...prev]);

    // Update Table to Occupied with activeSessionId
    setTables(prev => prev.map(t => t.number === tableNumber ? {
      ...t,
      status: "Occupied",
      activeSessionId: newSessionId
    } : t));

    // Update Reservation status if linked
    if (reservationId) {
      setBookings(prev => prev.map(b => b.id === reservationId ? {
        ...b,
        status: "Checked-In",
        sessionId: newSessionId,
        tableNo: `Table ${tableNumber}`
      } : b));
    }

    addNotification("Guest Checked-In", `${guestName} seated at Table ${tableNumber}. Session ID: ${newSessionId}`);
    return newSessionId;
  };

  // CHECK-OUT & BILLING WORKFLOW
  const settleSessionPayment = (sessionId, paymentMethod = "Card", discountAmount = 0) => {
    setSessions(prev => prev.map(s => {
      if (s.sessionId === sessionId) {
        const netTotal = Math.max(0, s.total - discountAmount);
        return {
          ...s,
          discount: discountAmount,
          total: netTotal,
          paymentStatus: "Paid",
          paymentMethod,
          status: "Billed"
        };
      }
      return s;
    }));
    addNotification("Payment Settled", `Session #${sessionId} paid via ${paymentMethod}.`);
  };

  const completeSessionAndCleanTable = (sessionId) => {
    const session = sessions.find(s => s.sessionId === sessionId);
    if (!session) return;

    // Complete session
    setSessions(prev => prev.map(s => s.sessionId === sessionId ? {
      ...s,
      status: "Completed",
      checkOutTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } : s));

    // Move table to Cleaning
    setTables(prev => prev.map(t => t.number === session.tableNumber ? {
      ...t,
      status: "Cleaning",
      activeSessionId: null
    } : t));

    addNotification("Table Cleared", `Table ${session.tableNumber} moved to Cleaning.`);
  };

  // ORDER MANAGEMENT (Linked to Session ID)
  const placeOrder = ({ sessionId, tableNumber, items, placedBy = "Customer", waiter = "Julian Vance" }) => {
    const orderId = "ORD-" + Math.floor(100 + Math.random() * 900);
    const kotId = "KOT-" + Math.floor(100 + Math.random() * 900);

    const newOrder = {
      id: orderId,
      kotId,
      sessionId,
      tableNumber,
      waiter,
      placedBy,
      time: "Just now",
      status: "New", // New -> Accepted -> Preparing -> Ready to Serve -> Served
      rejectReason: "",
      isDelayed: false,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty || 1,
        notes: item.notes || "",
        customizations: item.customizations || ""
      }))
    };

    // Add Order
    setOrders(prev => [newOrder, ...prev]);

    // Recalculate Session Bill
    const orderSum = items.reduce((sum, it) => sum + (it.price * (it.qty || 1)), 0);
    setSessions(prev => prev.map(s => {
      if (s.sessionId === sessionId) {
        const newSubtotal = s.subtotal + orderSum;
        const newTax = Number((newSubtotal * 0.09).toFixed(2));
        const newService = Number((newSubtotal * 0.10).toFixed(2));
        const grandTotal = Number((newSubtotal + newTax + newService - s.advancePayment).toFixed(2));
        return {
          ...s,
          orders: [...(s.orders || []), orderId],
          subtotal: newSubtotal,
          tax: newTax,
          serviceCharge: newService,
          total: Math.max(0, grandTotal)
        };
      }
      return s;
    }));

    addNotification("New Kitchen Order", `Order #${orderId} (${kotId}) received for Table ${tableNumber} (Session #${sessionId}).`);
    return orderId;
  };

  const updateOrderStatus = (orderId, newStatus, rejectReason = "") => {
    setOrders(prev => prev.map(ord => ord.id === orderId ? {
      ...ord,
      status: newStatus,
      rejectReason: rejectReason || ord.rejectReason
    } : ord));

    if (newStatus === 'Ready to Serve') {
      addNotification("Order Ready!", `Dishes for Order #${orderId} are ready at the pass!`);
    }
  };

  // RESERVATION BOOKINGS
  const addBooking = (bookingData) => {
    const id = generateBookingId();
    const qrCode = `${id}-QR-${bookingData.customerName.replace(/\s+/g, '').toUpperCase()}`;
    const newBooking = {
      id,
      qrCode,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      advancePaid: 50.00,
      tableNo: bookingData.tableNo || "Table Assigned upon Check-In",
      ...bookingData
    };
    setBookings(prev => [newBooking, ...prev]);
    addNotification("Reservation Received", `New reservation ${id} by ${bookingData.customerName}.`);
    return newBooking;
  };

  const cancelBooking = (bookingId, reason = "Cancelled by patron") => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: "Cancelled", cancelReason: reason } : b));
    addNotification("Booking Cancelled", `Reservation ${bookingId} has been cancelled.`);
  };

  // WAITING LIST
  const addWaitingGuest = ({ name, phone, guests, waitTime = "15 mins", notes = "" }) => {
    const id = "W-" + Math.floor(100 + Math.random() * 900);
    const newGuest = {
      id,
      name,
      phone,
      guests,
      waitTime,
      notes,
      status: "Waiting",
      addedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setWaitingList(prev => [...prev, newGuest]);
    addNotification("Waiting Queue Updated", `${name} (${guests}) added to waitlist.`);
  };

  const updateWaitingStatus = (id, newStatus) => {
    setWaitingList(prev => prev.map(w => w.id === id ? { ...w, status: newStatus } : w));
  };

  // CART OPERATIONS
  const addToCart = (item, qty = 1, customizations = "", notes = "") => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id && c.customizations === customizations);
      if (existing) {
        return prev.map(c => c === existing ? { ...c, qty: c.qty + qty, notes } : c);
      }
      return [...prev, { ...item, qty, customizations, notes }];
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateCartQty = (index, qty) => {
    if (qty <= 0) {
      removeFromCart(index);
    } else {
      setCart(prev => prev.map((c, i) => i === index ? { ...c, qty } : c));
    }
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (dishId) => {
    setWishlist(prev => prev.includes(dishId) ? prev.filter(id => id !== dishId) : [...prev, dishId]);
  };

  // INVENTORY OPERATIONS
  const updateInventoryStock = (itemId, change) => {
    setInventory(prev => prev.map(inv => {
      if (inv.id === itemId) {
        const newStock = Math.max(0, inv.stock + change);
        return {
          ...inv,
          stock: newStock,
          status: newStock <= inv.minStock ? "Low Stock" : "Optimal"
        };
      }
      return inv;
    }));
  };

  const addNotification = (title, message) => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: "Just now",
      unread: true
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const value = {
    // Current User
    currentUser,
    login,
    logout,

    // Tables
    tables,
    updateTableStatus,
    assignTableWaiter,

    // Sessions
    sessions,
    startTableSession,
    settleSessionPayment,
    completeSessionAndCleanTable,

    // Bookings
    bookings,
    addBooking,
    cancelBooking,

    // Orders
    orders,
    placeOrder,
    updateOrderStatus,

    // Menu
    menuItems,
    setMenuItems,

    // Waiting list
    waitingList,
    addWaitingGuest,
    updateWaitingStatus,

    // Offers & Discounts
    offers,
    setOffers,
    appliedCoupon,
    setAppliedCoupon,

    // Reviews & Complaints
    reviews,
    setReviews,
    complaints,
    setComplaints,

    // Inventory
    inventory,
    updateInventoryStock,

    // Cart & Wishlist
    cart,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    wishlist,
    toggleWishlist,

    // Notifications
    notifications,
    addNotification,
    markNotificationRead
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
