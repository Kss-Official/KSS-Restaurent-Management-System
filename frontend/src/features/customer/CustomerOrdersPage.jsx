import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store/store';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../components/common/Button';
import { 
  UtensilsCrossed, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChefHat, 
  Bell, 
  Sparkles, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  CheckCheck
} from 'lucide-react';

export const CustomerOrdersPage = () => {
  const { currentUser } = useAuth();
  const { orders, sessions } = useAppStore();

  // Find active session for user or demo
  const userSession = sessions.find(s => s.guestName === currentUser?.name && s.status === 'Active') || sessions[0];

  // All orders for customer or session
  const customerOrders = orders.filter(o => 
    o.placedBy?.toLowerCase().includes('customer') || 
    (userSession && o.sessionId === userSession.sessionId) ||
    o.tableNumber === userSession?.tableNumber
  );

  const steps = [
    { label: 'Order Received', desc: 'Sent to Chef' },
    { label: 'Accepted', desc: 'Kitchen Confirmed' },
    { label: 'Preparing', desc: 'Crafting in Kitchen' },
    { label: 'Ready to Serve', desc: 'Plated at Pass' },
    { label: 'Served', desc: 'Delivered to Table' }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'New': return 0;
      case 'Accepted': return 1;
      case 'Preparing': return 2;
      case 'Ready to Serve':
      case 'Ready': return 3;
      case 'Served': return 4;
      default: return 0;
    }
  };

  return (
    <div className="py-12 bg-[#F4EDE8] min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DDD8]/50 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#754D45]">Live Dining Tracker</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#301A18]">My Live Table Orders</h1>
            <p className="text-xs text-[#754D45] mt-1">
              {userSession ? (
                <>Seated at <strong className="text-[#754D45]">Table {userSession.tableNumber}</strong> • Active Session <strong className="font-mono text-[#754D45]">#{userSession.sessionId}</strong></>
              ) : (
                'Real-time order preparation status direct from the executive kitchen'
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/menu">
              <Button variant="primary" size="md" icon={UtensilsCrossed}>
                Order More Dishes
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Orders Tracker */}
        {customerOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DDD8]/50 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F4EDE8] text-[#754D45] mx-auto flex items-center justify-center">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#301A18]">No Active Orders Placed</h3>
            <p className="text-sm text-[#754D45] max-w-md mx-auto">
              You haven't ordered any dishes for your table yet. Explore our luxury seasonal menu and place an order directly to the kitchen.
            </p>
            <div className="pt-2">
              <Link to="/menu">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Explore Seasonal Menu
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {customerOrders.map((order) => {
              const currentStep = getStepIndex(order.status);
              const isReady = order.status === 'Ready to Serve' || order.status === 'Ready';
              const isServed = order.status === 'Served';

              return (
                <div 
                  key={order.id} 
                  className={`bg-white rounded-3xl p-6 sm:p-8 border-2 shadow-md space-y-6 transition-all ${
                    isReady ? 'border-[#A2766B] bg-amber-50/20' : 'border-[#E8DDD8]/50'
                  }`}
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#FAF7F5]">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm bg-[#754D45] text-white px-2.5 py-0.5 rounded-lg">
                          {order.id}
                        </span>
                        <span className="font-mono text-xs text-[#754D45]">
                          KOT Ticket: {order.kotId}
                        </span>
                        <span className="text-xs text-[#754D45]">
                          • Placed {order.time || '10 mins ago'}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#301A18] mt-1">
                        Table {order.tableNumber} Dining Service
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isReady ? 'bg-[#21845A]/15 text-[#21845A] border border-[#21845A]/30 border border-emerald-300 animate-pulse' :
                        isServed ? 'bg-gray-100 text-gray-800' :
                        order.status === 'Preparing' ? 'bg-orange-100 text-orange-800' :
                        'bg-[#3976B8]/15 text-[#3976B8] border border-[#3976B8]/30'
                      }`}>
                        {order.status === 'Ready to Serve' ? 'Ready at Pass – Waiter En Route' : order.status}
                      </span>
                    </div>
                  </div>

                  {/* 5-Stage Stepper */}
                  <div className="py-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#754D45] mb-4">
                      Real-Time Kitchen Progress
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 relative">
                      {steps.map((step, idx) => {
                        const isDone = idx <= currentStep;
                        const isCurrent = idx === currentStep;

                        return (
                          <div 
                            key={idx} 
                            className={`p-3 rounded-2xl border transition-all text-center flex flex-col justify-between ${
                              isCurrent
                                ? 'bg-[#754D45] text-white border-[#754D45] shadow-md scale-105'
                                : isDone
                                ? 'bg-[#F4EDE8] text-[#301A18] border-[#E8DDD8]'
                                : 'bg-gray-50 text-gray-400 border-gray-200'
                            }`}
                          >
                            <div className="flex justify-center mb-1">
                              {isDone && !isCurrent ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                              ) : isCurrent ? (
                                <ChefHat className="w-5 h-5 text-[#A2766B] animate-bounce" />
                              ) : (
                                <Clock className="w-5 h-5 text-gray-300" />
                              )}
                            </div>
                            <span className="font-bold text-xs">{step.label}</span>
                            <span className={`text-[10px] mt-0.5 ${isCurrent ? 'text-[#FAF7F5]' : 'text-[#754D45]'}`}>
                              {step.desc}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dishes Ordered */}
                  <div className="pt-4 border-t border-[#FAF7F5] space-y-3">
                    <p className="font-bold text-xs uppercase tracking-wider text-[#754D45]">
                      Dishes on This Ticket:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#F4EDE8] flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-[#301A18]">{item.qty} × {item.name}</span>
                            {item.notes && (
                              <p className="text-[10px] text-[#754D45] italic">Note: {item.notes}</p>
                            )}
                          </div>
                          <span className="font-mono font-bold text-[#754D45]">
                            {formatCurrency(item.price * item.qty)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Footer */}
                  <div className="pt-4 border-t border-[#FAF7F5] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[#754D45]">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Dedicated Waiter: <strong className="text-[#301A18]">{order.waiter || 'Julian Vance'}</strong></span>
                    </div>

                    <div className="font-mono text-sm font-bold text-[#301A18]">
                      Ticket Total: <span className="text-[#754D45]">{formatCurrency(
                        order.items.reduce((s, it) => s + (it.price * it.qty), 0)
                      )}</span>
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