import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { useAppStore } from '../../store/store';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { 
  ChefHat, 
  Flame, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Menu, 
  Bell, 
  Boxes, 
  User, 
  Check, 
  X, 
  AlertTriangle, 
  Plus, 
  Timer, 
  Send 
} from 'lucide-react';

export const KitchenPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Centralized Store
  const { 
    currentUser, 
    orders, 
    updateOrderStatus, 
    inventory, 
    updateInventoryStock, 
    notifications, 
    addNotification 
  } = useAppStore();

  // Reject order modal state
  const [rejectModalOrder, setRejectModalOrder] = useState(null);
  const [rejectReason, setRejectReason] = useState('Ingredient unavailable / item 86ed');

  // Stock requisition modal state
  const [stockReqModal, setStockReqModal] = useState(false);
  const [reqItem, setReqItem] = useState('Dry-Aged Prime Ribeye');
  const [reqQuantity, setReqQuantity] = useState('20 Cuts');

  // Filter orders by lifecycle status
  const newOrders = orders.filter(o => o.status === 'New');
  const acceptedOrders = orders.filter(o => o.status === 'Accepted');
  const preparingOrders = orders.filter(o => o.status === 'Preparing');
  const readyOrders = orders.filter(o => o.status === 'Ready to Serve');
  const delayedOrders = orders.filter(o => o.isDelayed || o.status === 'Preparing');

  // Navigation Links according to Specification
  const navLinks = [
    { label: '1. Kitchen Dashboard', icon: ChefHat, tabId: 'dashboard' },
    { 
      isGroup: true, 
      groupTitle: '2. Order Management', 
      children: [
        { label: 'A. New Orders (KOT)', icon: AlertCircle, tabId: 'orders-new', badge: newOrders.length },
        { label: 'B. Accepted Orders', icon: Clock, tabId: 'orders-accepted', badge: acceptedOrders.length },
        { label: 'C. Preparing Station', icon: Flame, tabId: 'orders-preparing', badge: preparingOrders.length },
        { label: 'D. Ready to Serve', icon: CheckCircle2, tabId: 'orders-ready', badge: readyOrders.length },
      ]
    },
    { label: '3. Kitchen Inventory', icon: Boxes, tabId: 'inventory', badge: inventory.filter(i => i.status === 'Low Stock').length },
    { label: '4. Notifications', icon: Bell, tabId: 'notifications', badge: notifications.filter(n => n.unread).length },
    { label: '5. My Profile', icon: User, tabId: 'profile' },
  ];

  const handleAcceptOrder = (orderId) => {
    updateOrderStatus(orderId, 'Accepted');
    addNotification("KOT Accepted", `Kitchen accepted Order #${orderId}. Entering preparation queue.`);
  };

  const handleStartPreparing = (orderId) => {
    updateOrderStatus(orderId, 'Preparing');
  };

  const handleMarkReady = (orderId) => {
    updateOrderStatus(orderId, 'Ready to Serve');
  };

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!rejectModalOrder) return;
    updateOrderStatus(rejectModalOrder.id, 'Rejected', rejectReason);
    addNotification("KOT Rejected", `Order #${rejectModalOrder.id} rejected: ${rejectReason}`);
    setRejectModalOrder(null);
  };

  const handleSendStockRequest = (e) => {
    e.preventDefault();
    addNotification("Chef Stock Requisition", `Head Chef requested ${reqQuantity} of ${reqItem}.`);
    alert(`Requisition for ${reqQuantity} of ${reqItem} dispatched directly to Floor Manager & Admin.`);
    setStockReqModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F4EDE8] flex">
      {/* Sidebar */}
      <Sidebar
        title="Kitchen Portal"
        subtitle="Culinary Ops & KDS"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={navLinks}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-[#E8DDD8]/40 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#2D2528] hover:bg-[#FAF7F5]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#2D2528] capitalize">
                Kitchen Display System (KDS): {navLinks.find(l => l.tabId === activeTab)?.label.replace(/^\d+\.\s*/, '')}
              </h2>
              <p className="text-xs text-[#873C50]">Live Cooking Stations • Head Chef Marco Pierre</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={Boxes}
              onClick={() => setStockReqModal(true)}
            >
              Request Ingredient Restock
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 sm:p-8 flex-1 space-y-8">
          
          {/* ========================================================
              1. KITCHEN DASHBOARD
             ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* KDS Counter Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#E8DDD8]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#873C50]">New KOTs</p>
                  <p className="font-serif text-3xl font-bold text-amber-700 mt-2">{newOrders.length}</p>
                  <p className="text-[11px] text-[#75696B] mt-1">Awaiting acceptance</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#E8DDD8]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#873C50]">Accepted</p>
                  <p className="font-serif text-3xl font-bold text-blue-700 mt-2">{acceptedOrders.length}</p>
                  <p className="text-[11px] text-[#75696B] mt-1">In station queue</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#E8DDD8]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#873C50]">Preparing</p>
                  <p className="font-serif text-3xl font-bold text-orange-700 mt-2">{preparingOrders.length}</p>
                  <p className="text-[11px] text-[#75696B] mt-1">At cooking ranges</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#E8DDD8]/50 shadow-sm">
                  <p className="text-xs uppercase font-bold text-[#873C50]">Ready to Serve</p>
                  <p className="font-serif text-3xl font-bold text-emerald-800 mt-2">{readyOrders.length}</p>
                  <p className="text-[11px] text-[#75696B] mt-1">At heated pass</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#E8DDD8]/50 shadow-sm col-span-2 sm:col-span-1">
                  <p className="text-xs uppercase font-bold text-[#873C50]">Delayed (&gt;20m)</p>
                  <p className="font-serif text-3xl font-bold text-red-700 mt-2">{delayedOrders.length}</p>
                  <p className="text-[11px] text-red-600 mt-1">Priority rush!</p>
                </div>
              </div>

              {/* Master Tickets Board */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-xl font-bold text-[#2D2528]">Active Cooking Tickets (KOT)</h3>
                  <span className="text-xs text-[#873C50] font-medium">Click order tabs to filter by station</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orders.filter(o => o.status !== 'Served' && o.status !== 'Rejected').map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-2xl border-2 border-[#E8DDD8]/60 shadow-md flex flex-col justify-between overflow-hidden"
                    >
                      <div className="bg-[#F4EDE8] p-4 border-b border-[#E8DDD8]/40 flex justify-between items-center">
                        <div>
                          <span className="font-mono text-xs font-bold text-[#542334] bg-white px-2 py-0.5 rounded border border-[#E8DDD8]/40">
                            {ord.kotId} • #{ord.sessionId}
                          </span>
                          <h4 className="font-serif font-bold text-lg text-[#2D2528] mt-1">Table {ord.tableNumber}</h4>
                        </div>
                        <div className="text-right">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            ord.status === 'Ready to Serve' ? 'bg-[#21845A]/15 text-[#21845A] border border-[#21845A]/30' :
                            ord.status === 'Preparing' ? 'bg-orange-100 text-orange-800 animate-pulse' :
                            ord.status === 'Accepted' ? 'bg-[#3976B8]/15 text-[#3976B8] border border-[#3976B8]/30' : 'bg-[#B7791F]/15 text-[#B7791F] border border-[#B7791F]/30'
                          }`}>
                            {ord.status}
                          </span>
                          <p className="text-[10px] text-[#873C50] mt-1">{ord.time}</p>
                        </div>
                      </div>

                      <div className="p-4 flex-1 space-y-2.5">
                        <ul className="space-y-2 text-xs divide-y divide-[#FAF7F5]">
                          {ord.items.map((it, idx) => (
                            <li key={idx} className="pt-2 first:pt-0">
                              <div className="flex justify-between font-bold text-[#2D2528] text-sm">
                                <span>{it.qty} × {it.name}</span>
                              </div>
                              {it.customizations && (
                                <p className="text-[11px] text-[#542334] font-semibold mt-0.5">
                                  Choice: {it.customizations}
                                </p>
                              )}
                              {it.notes && (
                                <p className="text-[11px] text-red-700 italic mt-0.5 bg-red-50 p-1.5 rounded">
                                  Chef Note: {it.notes}
                                </p>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-[#F4EDE8] border-t border-[#E8DDD8]/40 flex items-center justify-between gap-2">
                        <span className="text-xs text-[#75696B]">Server: {ord.waiter}</span>
                        <div>
                          {ord.status === 'New' && (
                            <div className="flex gap-2">
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleAcceptOrder(ord.id)}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-700"
                                onClick={() => setRejectModalOrder(ord)}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                          {ord.status === 'Accepted' && (
                            <Button
                              variant="primary"
                              size="sm"
                              icon={Flame}
                              onClick={() => handleStartPreparing(ord.id)}
                            >
                              Start Cooking
                            </Button>
                          )}
                          {ord.status === 'Preparing' && (
                            <Button
                              variant="gold"
                              size="sm"
                              icon={CheckCircle2}
                              onClick={() => handleMarkReady(ord.id)}
                            >
                              Mark Ready at Pass
                            </Button>
                          )}
                          {ord.status === 'Ready to Serve' && (
                            <span className="text-xs font-bold text-emerald-800">Ready for Pickup</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              2. ORDER MANAGEMENT - A. NEW ORDERS
             ======================================================== */}
          {activeTab === 'orders-new' && (
            <div className="bg-white rounded-2xl border border-[#E8DDD8]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2D2528]">Incoming KOTs (Awaiting Acceptance)</h3>
                <p className="text-xs text-[#75696B]">Review table orders, dietary notes, and accept or decline with reason.</p>
              </div>

              {newOrders.length === 0 ? (
                <div className="text-center py-12 text-[#873C50]">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600 mb-2" />
                  <p className="font-serif font-bold text-base">All incoming tickets accepted!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {newOrders.map((ord) => (
                    <div key={ord.id} className="p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/50 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs font-bold text-[#542334] bg-white px-2 py-1 rounded">
                          {ord.kotId} • Session #{ord.sessionId}
                        </span>
                        <span className="font-serif font-bold text-lg text-[#2D2528]">Table {ord.tableNumber}</span>
                      </div>

                      <ul className="text-xs text-[#2D2528] space-y-1">
                        {ord.items.map((it, i) => (
                          <li key={i} className="font-bold">• {it.qty} × {it.name} ({it.notes || 'Standard'})</li>
                        ))}
                      </ul>

                      <div className="flex gap-2 pt-2">
                        <Button variant="primary" size="sm" className="w-full" onClick={() => handleAcceptOrder(ord.id)}>
                          Accept Order
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-700" onClick={() => setRejectModalOrder(ord)}>
                          Reject with Reason
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              2. ORDER MANAGEMENT - B. ACCEPTED ORDERS
             ======================================================== */}
          {activeTab === 'orders-accepted' && (
            <div className="bg-white rounded-2xl border border-[#E8DDD8]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2D2528]">Accepted KOT Queue</h3>
                <p className="text-xs text-[#75696B]">Order sequence ready to move to cooking ranges.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {acceptedOrders.map((ord) => (
                  <div key={ord.id} className="p-5 rounded-2xl border border-[#E8DDD8]/50 bg-[#F4EDE8] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-[#542334]">#{ord.sessionId}</span>
                      <span className="font-bold text-base text-[#2D2528]">Table {ord.tableNumber}</span>
                    </div>
                    <ul className="text-xs text-[#75696B] space-y-1">
                      {ord.items.map((it, i) => (
                        <li key={i}>• {it.qty} × {it.name}</li>
                      ))}
                    </ul>
                    <Button variant="primary" size="sm" icon={Flame} className="w-full" onClick={() => handleStartPreparing(ord.id)}>
                      Fire / Start Cooking
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              2. ORDER MANAGEMENT - C. PREPARING ORDERS
             ======================================================== */}
          {activeTab === 'orders-preparing' && (
            <div className="bg-white rounded-2xl border border-[#E8DDD8]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2D2528]">Currently at Cooking Ranges</h3>
                <p className="text-xs text-[#75696B]">Track preparation timers and dispatch to the pass.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {preparingOrders.map((ord) => (
                  <div key={ord.id} className="p-5 rounded-2xl border-2 border-orange-300 bg-orange-50/50 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-[#542334]">{ord.id}</span>
                      <span className="font-serif font-bold text-lg text-[#2D2528]">Table {ord.tableNumber}</span>
                    </div>

                    <ul className="text-xs text-[#2D2528] space-y-1">
                      {ord.items.map((it, i) => (
                        <li key={i} className="font-bold">• {it.qty} × {it.name}</li>
                      ))}
                    </ul>

                    <Button variant="gold" size="sm" icon={CheckCircle2} className="w-full" onClick={() => handleMarkReady(ord.id)}>
                      Mark Plated & Ready at Pass
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              2. ORDER MANAGEMENT - D. READY TO SERVE
             ======================================================== */}
          {activeTab === 'orders-ready' && (
            <div className="bg-white rounded-2xl border border-[#E8DDD8]/50 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2D2528]">Dishes at Heated Pass</h3>
                <p className="text-xs text-[#75696B]">Orders marked ready; waitstaff notified for immediate table delivery.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {readyOrders.map((ord) => (
                  <div key={ord.id} className="p-5 rounded-2xl border-2 border-emerald-400 bg-emerald-50/50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-emerald-800">{ord.id}</span>
                      <span className="font-serif font-bold text-base text-[#2D2528]">Table {ord.tableNumber}</span>
                    </div>
                    <p className="text-xs text-[#75696B]">Server assigned: <span className="font-bold">{ord.waiter}</span></p>
                    <ul className="text-xs text-[#2D2528] space-y-1 font-semibold">
                      {ord.items.map((it, i) => (
                        <li key={i}>• {it.qty} × {it.name}</li>
                      ))}
                    </ul>
                    <span className="inline-block text-[11px] font-bold text-emerald-800 bg-white px-2 py-1 rounded-md border border-emerald-300">
                      Heated under lamp
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              3. INVENTORY & INGREDIENT THRESHOLDS
             ======================================================== */}
          {activeTab === 'inventory' && (
            <div className="bg-white rounded-2xl border border-[#E8DDD8]/50 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#2D2528]">Kitchen Ingredients & Low-Stock Alerts</h3>
                  <p className="text-xs text-[#75696B]">Track essential meats, truffles, and dairy stock levels.</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus} onClick={() => setStockReqModal(true)}>
                  Submit Requisition
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#FAF7F5] text-[#873C50] uppercase text-xs">
                      <th className="py-3 px-2">Item</th>
                      <th className="py-3 px-2">Current Stock</th>
                      <th className="py-3 px-2">Min Warning</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Quick Requisition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FAF7F5]">
                    {inventory.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#F4EDE8]">
                        <td className="py-3 px-2 font-bold text-[#2D2528]">{inv.item}</td>
                        <td className="py-3 px-2 font-mono">{inv.stock} {inv.unit}</td>
                        <td className="py-3 px-2 text-xs">{inv.minStock} {inv.unit}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            inv.status === 'Low Stock' ? 'bg-[#C44747]/15 text-[#C44747] border border-[#C44747]/30 animate-pulse' : 'bg-[#21845A]/15 text-[#21845A] border border-[#21845A]/30'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => {
                              addNotification("Chef Requisition", `Replenish request for ${inv.item}`);
                              alert(`Requisition for ${inv.item} sent to Manager & Admin.`);
                            }}
                            className="text-xs font-bold text-[#542334] hover:underline"
                          >
                            Request Restock
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              4. NOTIFICATIONS
             ======================================================== */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-[#E8DDD8]/50 shadow-sm p-6 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#2D2528]">Kitchen Display Notifications</h3>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="p-4 rounded-xl bg-[#F4EDE8] border border-[#E8DDD8]/40 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm text-[#2D2528]">{n.title}</p>
                      <p className="text-xs text-[#75696B] mt-0.5">{n.message}</p>
                      <p className="text-[10px] text-[#873C50] mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              5. MY PROFILE
             ======================================================== */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-[#E8DDD8]/50 shadow-sm p-8 space-y-6 max-w-2xl">
              <div className="flex items-center gap-6 border-b border-[#FAF7F5] pb-6">
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80"}
                  alt={currentUser?.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#542334]"
                />
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2D2528]">{currentUser?.name}</h3>
                  <p className="text-xs text-[#542334] font-semibold">Head Chef - Hot Kitchen & Plating</p>
                  <p className="text-xs text-[#873C50]">{currentUser?.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input label="Chef Name" id="chk-name" defaultValue={currentUser?.name} />
                <Input label="Kitchen Direct Extension" id="chk-ext" defaultValue="+1 (555) 777-2211" />
                <Input label="Change Terminal Password" id="chk-pass" type="password" placeholder="New passcode" />
                <Button variant="primary" size="md" onClick={() => alert("Kitchen staff settings updated.")}>
                  Save Profile Settings
                </Button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Modal: Reject Order */}
      {rejectModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 border border-[#E8DDD8] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#FAF7F5] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#2D2528]">Reject Order #{rejectModalOrder.id}</h3>
              <button onClick={() => setRejectModalOrder(null)}><X className="w-5 h-5 text-[#873C50]" /></button>
            </div>
            <form onSubmit={handleConfirmReject} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#2D2528]">Reason for Rejection</label>
                <select
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E8DDD8]"
                >
                  <option>Ingredient unavailable / item 86ed</option>
                  <option>Kitchen at maximum capacity (delay &gt; 45m)</option>
                  <option>Severe allergy cross-contamination risk</option>
                  <option>Special modification cannot be accommodated</option>
                </select>
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full">
                Confirm Rejection & Alert Waiter
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Stock Requisition */}
      {stockReqModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 border border-[#E8DDD8] shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#FAF7F5] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#2D2528]">Chef Stock Requisition</h3>
              <button onClick={() => setStockReqModal(false)}><X className="w-5 h-5 text-[#873C50]" /></button>
            </div>
            <form onSubmit={handleSendStockRequest} className="space-y-4 text-xs">
              <Input label="Ingredient Item" id="req-item" value={reqItem} onChange={e => setReqItem(e.target.value)} required />
              <Input label="Required Quantity" id="req-qty" value={reqQuantity} onChange={e => setReqQuantity(e.target.value)} required />
              <Button type="submit" variant="primary" size="md" className="w-full">
                Dispatch to Manager
              </Button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default KitchenPortal;
