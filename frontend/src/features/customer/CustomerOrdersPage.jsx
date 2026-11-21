import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store/store';
import { formatCurrency } from '../../utils/helpers';
import { 
  UtensilsCrossed, 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  Sparkles, 
  ShoppingBag, 
  ArrowRight,
  Receipt,
  Navigation,
  Calendar,
  Eye,
  Check
} from 'lucide-react';

export const CustomerOrdersPage = () => {
  const { currentUser } = useAuth();
  const { orders, sessions } = useAppStore();
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // Find active session for user or demo
  const userSession = sessions.find(s => s.guestName === currentUser?.name && s.status === 'Active') || sessions[0];

  // All orders for customer or session
  const customerOrders = orders.filter(o => 
    o.placedBy?.toLowerCase().includes('customer') || 
    (userSession && o.sessionId === userSession.sessionId) ||
    o.tableNumber === userSession?.tableNumber ||
    o.placedBy?.toLowerCase().includes('waiter')
  );

  const filteredOrders = customerOrders.filter(order => {
    if (filter === 'active') {
      return order.status !== 'Served' && order.status !== 'Rejected';
    }
    if (filter === 'completed') {
      return order.status === 'Served';
    }
    return true;
  });

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16 font-hanken">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#EADBCC] shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#754D45]">
                Customer Orders & History
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B181C]">
              My Orders & Table Dining
            </h1>
            <p className="text-xs sm:text-sm text-[#754D45] mt-1">
              {userSession ? (
                <>Seated at <strong className="text-[#4C1824]">Table {userSession.tableNumber}</strong> • Active Session <strong className="font-mono text-[#2B181C]">#{userSession.sessionId}</strong></>
              ) : (
                'Review your table orders, track live kitchen preparation, and view tax invoices.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/menu"
              className="bg-[#4C1824] hover:bg-[#38111A] text-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#FABE24]" />
              <span>Order More Dishes</span>
            </Link>

            <Link
              to="/book-table"
              className="bg-white hover:bg-[#FAF7F2] text-[#4C1824] border border-[#EADBCC] px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xs transition-all hover:scale-105 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-[#EADBCC] shadow-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#4C1824] text-white shadow-xs'
                  : 'text-[#754D45] hover:bg-[#FAF7F2]'
              }`}
            >
              All Orders ({customerOrders.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'active'
                  ? 'bg-[#4C1824] text-white shadow-xs'
                  : 'text-[#754D45] hover:bg-[#FAF7F2]'
              }`}
            >
              Active in Kitchen ({customerOrders.filter(o => o.status !== 'Served').length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'completed'
                  ? 'bg-[#4C1824] text-white shadow-xs'
                  : 'text-[#754D45] hover:bg-[#FAF7F2]'
              }`}
            >
              Served / Completed ({customerOrders.filter(o => o.status === 'Served').length})
            </button>
          </div>

          <span className="text-xs text-[#754D45]">
            Showing <strong>{filteredOrders.length}</strong> dining orders
          </span>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EADBCC] shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF5EE] text-[#4C1824] mx-auto flex items-center justify-center">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2B181C]">No Orders Placed Yet</h3>
            <p className="text-sm text-[#754D45] max-w-md mx-auto">
              Explore our luxury food menu or book your table reservation to begin your dining experience.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                to="/menu"
                className="bg-[#4C1824] hover:bg-[#38111A] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md transition-all hover:scale-105"
              >
                Browse Food Menu
              </Link>
              <Link
                to="/book-table"
                className="bg-white border border-[#EADBCC] text-[#4C1824] px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#FAF7F2] transition-all"
              >
                Book a Table
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const isReady = order.status === 'Ready to Serve' || order.status === 'Ready';
              const isServed = order.status === 'Served';
              const isPreparing = order.status === 'Preparing';

              const orderTotal = (order.items || []).reduce((sum, item) => sum + (item.price * item.qty), 0);

              return (
                <div 
                  key={order.id} 
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCC] shadow-sm hover:shadow-md transition-all space-y-6"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#F0E5D8]">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-xs bg-[#4C1824] text-white px-2.5 py-0.5 rounded-lg">
                          {order.id}
                        </span>
                        <span className="font-mono text-xs text-[#754D45]">
                          KOT Ticket: <strong className="text-[#2B181C]">{order.kotId}</strong>
                        </span>
                        <span className="text-xs text-[#754D45]">
                          • Placed {order.time || '10 mins ago'}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#2B181C] mt-1">
                        Table {order.tableNumber} Service • Session #{order.sessionId}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                        isReady 
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                          : isServed 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : isPreparing 
                          ? 'bg-orange-50 text-orange-800 border border-orange-200'
                          : 'bg-[#FAF5EE] text-[#754D45] border border-[#EADBCC]'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{order.status === 'Ready to Serve' ? 'Ready at Pass' : order.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Dishes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(order.items || []).map((item, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EADBCC]/70 flex items-start justify-between gap-2 text-xs">
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-[#2B181C]">
                            <span className="text-[#4C1824]">{item.qty}x</span>
                            <span>{item.name}</span>
                          </div>
                          {item.customizations && (
                            <p className="text-[11px] text-[#754D45] mt-0.5">
                              {item.customizations}
                            </p>
                          )}
                        </div>
                        <span className="font-bold text-[#2B181C] whitespace-nowrap">
                          {formatCurrency(item.price * item.qty)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer & Direct Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#F0E5D8]">
                    <div className="flex items-center gap-3 text-xs text-[#754D45]">
                      <span>Server: <strong className="text-[#2B181C]">{order.waiter || 'Julian Vance'}</strong></span>
                      <span>•</span>
                      <span>Total Amount: <strong className="text-base text-[#4C1824] font-bold">{formatCurrency(orderTotal * 1.10)}</strong> (Inc. GST)</span>
                    </div>

                    {/* Step 6 & Step 7 Flow Links */}
                    <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                      {/* Step 6: Live Order Tracking */}
                      <Link
                        to={`/customer/order-tracking?orderId=${order.id}`}
                        className="flex-1 sm:flex-initial bg-[#FABE24] hover:bg-[#E5AC18] text-[#1F1416] px-4 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all hover:scale-105 cursor-pointer"
                        title="View live 5-stage kitchen preparation progress"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Track Order (Step 6)</span>
                      </Link>

                      {/* Step 7: Payment & Invoice */}
                      <Link
                        to={`/customer/invoice?orderId=${order.id}`}
                        className="flex-1 sm:flex-initial bg-[#4C1824] hover:bg-[#38111A] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all hover:scale-105 cursor-pointer"
                        title="View and download certified tax invoice"
                      >
                        <Receipt className="w-3.5 h-3.5 text-[#FABE24]" />
                        <span>Invoice (Step 7)</span>
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerOrdersPage;
