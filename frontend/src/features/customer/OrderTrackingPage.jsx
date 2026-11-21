import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store/store';
import { formatCurrency } from '../../utils/helpers';
import { 
  Navigation, 
  UtensilsCrossed, 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  Bell, 
  Sparkles, 
  Receipt, 
  ArrowRight,
  ShieldCheck,
  User,
  ShoppingBag,
  RotateCcw,
  PhoneCall,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const OrderTrackingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { orders, sessions } = useAppStore();

  // Read orderId from query string or default to first active order
  const queryParams = new URLSearchParams(location.search);
  const initialOrderId = queryParams.get('orderId');

  // Customer active orders
  const customerOrders = orders.filter(o => 
    o.placedBy?.toLowerCase().includes('customer') || 
    o.placedBy?.toLowerCase().includes('waiter') ||
    o.tableNumber
  );

  const selectedOrder = customerOrders.find(o => o.id === initialOrderId) || customerOrders[0] || {
    id: "ORD-501",
    kotId: "KOT-101",
    sessionId: "000001",
    tableNumber: 14,
    waiter: "Julian Vance",
    placedBy: "Customer",
    time: "10 mins ago",
    status: "Preparing",
    items: [
      { id: 1, name: "Dry-Aged Mocha Ribeye", price: 48.00, qty: 2, customizations: "Medium Rare, Mocha Butter" },
      { id: 5, name: "Artisanal Burrata & Heirloom Fig", price: 22.00, qty: 1, customizations: "Nut-Free" },
      { id: 7, name: "Velvet Espresso Crème Brûlée", price: 16.00, qty: 1, customizations: "Gold Flakes" }
    ]
  };

  // Local simulated status for testing live progression
  const [currentStatus, setCurrentStatus] = useState(selectedOrder.status || 'Preparing');
  const [estimatedMinutes, setEstimatedMinutes] = useState(12);

  useEffect(() => {
    if (selectedOrder) {
      setCurrentStatus(selectedOrder.status || 'Preparing');
    }
  }, [selectedOrder.id]);

  const stages = [
    { 
      key: 'New', 
      title: 'Order Received', 
      desc: 'Transmitted to Lunar Kitchen station', 
      icon: ShoppingBag, 
      time: '0 mins' 
    },
    { 
      key: 'Accepted', 
      title: 'Confirmed by Chef', 
      desc: 'Kitchen review & ingredients staged', 
      icon: CheckCircle2, 
      time: '2 mins' 
    },
    { 
      key: 'Preparing', 
      title: 'Cooking at Station', 
      desc: 'Executive chefs crafting with perfection', 
      icon: ChefHat, 
      time: '8 mins' 
    },
    { 
      key: 'Ready', 
      title: 'Ready at Pass', 
      desc: 'Plated, garnished & temperature checked', 
      icon: Sparkles, 
      time: '12 mins' 
    },
    { 
      key: 'Served', 
      title: 'Served at Table', 
      desc: 'Delivered to your table by assigned server', 
      icon: UtensilsCrossed, 
      time: 'Served' 
    }
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'New': return 0;
      case 'Accepted': return 1;
      case 'Preparing': return 2;
      case 'Ready to Serve':
      case 'Ready': return 3;
      case 'Served': return 4;
      default: return 2;
    }
  };

  const activeIndex = getStageIndex(currentStatus);

  const calculateTotal = (items = []) => {
    return items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  const subtotal = calculateTotal(selectedOrder.items);
  const tax = subtotal * 0.05;
  const serviceCharge = subtotal * 0.05;
  const grandTotal = subtotal + tax + serviceCharge;

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16 font-hanken">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Page Top Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCC] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#754D45]">
                Step 6 of 8 • Real-Time Kitchen Tracker
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B181C]">
              Live Order & Kitchen Tracking
            </h1>
            <p className="text-xs sm:text-sm text-[#754D45] mt-1">
              Watch your dining experience progress from the executive chef’s pan to your table.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to={`/customer/invoice?orderId=${selectedOrder.id}`}
              className="bg-[#4C1824] hover:bg-[#38111A] text-white px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Receipt className="w-3.5 h-3.5 text-[#FABE24]" />
              <span>Payment & Invoice</span>
            </Link>

            <Link
              to="/menu"
              className="bg-white hover:bg-[#FAF7F2] text-[#4C1824] border border-[#EADBCC] px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xs transition-all hover:scale-105 cursor-pointer"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#4C1824]" />
              <span>Order More Food</span>
            </Link>
          </div>
        </div>

        {/* Order Selector (if multiple orders exist) */}
        {customerOrders.length > 1 && (
          <div className="bg-white rounded-2xl p-4 border border-[#EADBCC] flex items-center gap-3 overflow-x-auto shadow-xs">
            <span className="text-xs font-bold text-[#754D45] whitespace-nowrap">Your Orders:</span>
            {customerOrders.map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  navigate(`/customer/order-tracking?orderId=${o.id}`);
                  setCurrentStatus(o.status || 'Preparing');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  o.id === selectedOrder.id
                    ? 'bg-[#4C1824] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#754D45] hover:bg-[#F0E5D8]'
                }`}
              >
                {o.id} (Table {o.tableNumber})
              </button>
            ))}
          </div>
        )}

        {/* Main 5-Stage Live Visual Progress Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EADBCC] shadow-md space-y-8">
          
          {/* Status Headline Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#F0E5D8]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#4C1824] text-[#FABE24] flex items-center justify-center shadow-md">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-[#FAF5EE] text-[#4C1824] px-2.5 py-0.5 rounded border border-[#EADBCC]">
                    {selectedOrder.id}
                  </span>
                  <span className="text-xs text-[#754D45]">
                    KOT Ticket: <strong className="font-mono text-[#2B181C]">{selectedOrder.kotId}</strong>
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2B181C] mt-1">
                  Table {selectedOrder.tableNumber} • Dinner Service
                </h3>
              </div>
            </div>

            {/* Current Stage Pill & Countdown */}
            <div className="flex items-center gap-3">
              <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-amber-900">
                <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                <span>Est. Delivery: ~{estimatedMinutes} mins</span>
              </div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#4C1824] text-[#FABE24] shadow-xs">
                {stages[activeIndex]?.title}
              </span>
            </div>
          </div>

          {/* 5-Stage Visual Progress Stepper */}
          <div className="space-y-6">
            <div className="relative">
              {/* Background Connecting Line */}
              <div className="absolute top-5 left-4 right-4 sm:left-10 sm:right-10 h-1 bg-[#F0E5D8] -z-0" />
              
              {/* Active Connecting Line */}
              <div 
                className="absolute top-5 left-4 sm:left-10 h-1 bg-gradient-to-r from-[#4C1824] to-[#FABE24] transition-all duration-700 -z-0"
                style={{ width: `${(activeIndex / (stages.length - 1)) * 88}%` }}
              />

              {/* 5 Step Icons */}
              <div className="grid grid-cols-5 gap-2 relative z-10 text-center">
                {stages.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isDone = idx < activeIndex;
                  const isCurrent = idx === activeIndex;

                  return (
                    <div key={stage.key} className="flex flex-col items-center">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isDone 
                          ? 'bg-[#4C1824] text-white shadow-md' 
                          : isCurrent 
                          ? 'bg-[#FABE24] text-[#1F1416] ring-4 ring-[#FABE24]/30 shadow-lg scale-110 font-bold' 
                          : 'bg-white text-[#754D45] border-2 border-[#EADBCC]'
                      }`}>
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>

                      <span className={`text-[11px] sm:text-xs font-bold mt-2.5 transition-colors ${
                        isCurrent ? 'text-[#4C1824]' : isDone ? 'text-[#2B181C]' : 'text-[#754D45]'
                      }`}>
                        {stage.title}
                      </span>
                      
                      <span className="text-[10px] text-[#754D45] hidden sm:block mt-0.5 max-w-[100px] leading-tight">
                        {stage.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Simulation Controls (for instant customer testing!) */}
          <div className="bg-[#FAF5EE] rounded-2xl p-4 border border-[#EADBCC] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#754D45]">
              <Sparkles className="w-4 h-4 text-[#FABE24]" />
              <span className="font-semibold text-[#2B181C]">Simulate Live Kitchen Progression:</span>
              <span className="text-white/40 hidden sm:inline">•</span>
              <span>Test stage updates in real time</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {stages.map((s, idx) => (
                <button
                  key={s.key}
                  onClick={() => {
                    setCurrentStatus(s.key);
                    setEstimatedMinutes(Math.max(0, 15 - idx * 3));
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                    idx === activeIndex
                      ? 'bg-[#4C1824] text-white shadow-xs'
                      : 'bg-white text-[#754D45] hover:bg-[#F0E5D8] border border-[#EADBCC]'
                  }`}
                >
                  Stage {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Order Details & Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#F0E5D8]">
            
            {/* Left: Table & Server Details */}
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#2B181C] flex items-center gap-2">
                <User className="w-4 h-4 text-[#4C1824]" />
                <span>Service & Table Details</span>
              </h4>

              <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EADBCC] space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-[#EADBCC]/60">
                  <span className="text-[#754D45]">Dining Table</span>
                  <span className="font-bold text-[#2B181C]">Table {selectedOrder.tableNumber} (Indoor/Terrace)</span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#EADBCC]/60">
                  <span className="text-[#754D45]">Assigned Waiter</span>
                  <span className="font-bold text-[#2B181C] flex items-center gap-1.5">
                    <span>{selectedOrder.waiter || 'Julian Vance'}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">Active</span>
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#EADBCC]/60">
                  <span className="text-[#754D45]">Dining Session</span>
                  <span className="font-mono text-[#2B181C]">#{selectedOrder.sessionId}</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-[#754D45]">Order Placed At</span>
                  <span className="font-medium text-[#2B181C]">{selectedOrder.time || '7:45 PM'}</span>
                </div>
              </div>

              {/* Call Server Button */}
              <button
                type="button"
                onClick={() => alert(`Server ${selectedOrder.waiter || 'Julian'} has been notified to attend Table ${selectedOrder.tableNumber}.`)}
                className="w-full py-2.5 rounded-full border border-[#4C1824] text-[#4C1824] hover:bg-[#4C1824] hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Ring Table Waiter / Service Request</span>
              </button>
            </div>

            {/* Right: Items in Kitchen */}
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#2B181C] flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-[#4C1824]" />
                <span>Dishes Being Prepared ({selectedOrder.items?.length || 0})</span>
              </h4>

              <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EADBCC] space-y-3">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-3 pb-2 border-b border-[#EADBCC]/60 last:border-none last:pb-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#4C1824] text-white text-[11px] font-bold flex items-center justify-center">
                          {item.qty}x
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-[#2B181C]">
                          {item.name}
                        </span>
                      </div>
                      {item.customizations && (
                        <p className="text-[11px] text-[#754D45] ml-7">
                          • {item.customizations}
                        </p>
                      )}
                    </div>

                    <span className="font-bold text-xs sm:text-sm text-[#2B181C]">
                      {formatCurrency(item.price * item.qty)}
                    </span>
                  </div>
                ))}

                {/* Subtotal & Total */}
                <div className="pt-2 border-t border-[#EADBCC] flex items-center justify-between text-xs">
                  <span className="font-bold text-[#754D45]">Total Bill (Inc. GST)</span>
                  <span className="font-bold text-sm text-[#4C1824]">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              {/* Next Step Flow Button: Go to Invoice */}
              <Link
                to={`/customer/invoice?orderId=${selectedOrder.id}`}
                className="w-full bg-[#4C1824] hover:bg-[#38111A] text-white py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Proceed to Step 7: Payment & Invoice</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FABE24]" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderTrackingPage;
