import React, { useState } from 'react';
import { useAdminDatabase } from '../adminStore';
import { formatCurrency } from '../../../utils/helpers';
import { 
  CreditCard, 
  Settings, 
  Receipt, 
  Percent, 
  DollarSign, 
  Sliders, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Check, 
  X, 
  Smartphone, 
  Building2, 
  FileText, 
  Printer, 
  Tag, 
  QrCode,
  ShieldCheck,
  Eye,
  Store
} from 'lucide-react';

export const PosSystemSettings = () => {
  const {
    getPosConfig, savePosConfig,
    getPosCounters, savePosCounters,
    getPaymentMethods, savePaymentMethods,
    getTaxConfig, saveTaxConfig,
    getDiscountConfig, saveDiscountConfig,
    getReceiptSettings, saveReceiptSettings
  } = useAdminDatabase();

  const [activeSubTab, setActiveSubTab] = useState('pos-config'); // 'pos-config', 'counters', 'payments', 'tax', 'discounts', 'receipt'

  // Persistent States
  const [posConfig, setPosConfig] = useState(() => getPosConfig());
  const [counters, setCounters] = useState(() => getPosCounters());
  const [paymentMethods, setPaymentMethods] = useState(() => getPaymentMethods());
  const [taxes, setTaxes] = useState(() => getTaxConfig());
  const [discounts, setDiscounts] = useState(() => getDiscountConfig());
  const [receiptSettings, setReceiptSettings] = useState(() => getReceiptSettings());

  // Save feedback state
  const [saveSuccess, setSaveSuccess] = useState('');

  // Modals
  const [counterModalOpen, setCounterModalOpen] = useState(false);
  const [editingCounter, setEditingCounter] = useState(null);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const [taxModalOpen, setTaxModalOpen] = useState(false);
  const [editingTax, setEditingTax] = useState(null);

  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [deleteDiscountTarget, setDeleteDiscountTarget] = useState(null);

  // Forms
  const [counterForm, setCounterForm] = useState({
    name: '',
    assignedCashier: '',
    openingDrawerCash: 3000,
    currentDrawerCash: 3000,
    shiftStartTime: '10:00 AM',
    status: 'Open'
  });

  const [paymentForm, setPaymentForm] = useState({
    name: '',
    provider: 'Direct Cash',
    surcharge: 0,
    minAmount: 1,
    maxAmount: 100000,
    active: true
  });

  const [taxForm, setTaxForm] = useState({
    name: '',
    ratePercent: 2.5,
    applicableOn: 'All Food & Beverage',
    active: true
  });

  const [discountForm, setDiscountForm] = useState({
    code: '',
    title: '',
    discountPercent: 10,
    minSpend: 500,
    maxDiscountCap: 300,
    validUntil: '2026-12-31',
    active: true
  });

  const triggerSaveNotification = (msg) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  // --- Handlers ---
  const handleSavePosConfig = (e) => {
    e.preventDefault();
    savePosConfig(posConfig);
    triggerSaveNotification('POS Terminal configuration saved!');
  };

  const handleSaveReceiptSettings = (e) => {
    e.preventDefault();
    saveReceiptSettings(receiptSettings);
    triggerSaveNotification('Guest receipt layout updated!');
  };

  // Counter Handlers
  const handleOpenAddCounter = () => {
    setEditingCounter(null);
    setCounterForm({
      name: '',
      assignedCashier: 'Cashier On Duty',
      openingDrawerCash: 3000,
      currentDrawerCash: 3000,
      shiftStartTime: '11:00 AM',
      status: 'Open'
    });
    setCounterModalOpen(true);
  };

  const handleOpenEditCounter = (c) => {
    setEditingCounter(c);
    setCounterForm({
      name: c.name,
      assignedCashier: c.assignedCashier,
      openingDrawerCash: c.openingDrawerCash,
      currentDrawerCash: c.currentDrawerCash,
      shiftStartTime: c.shiftStartTime,
      status: c.status
    });
    setCounterModalOpen(true);
  };

  const handleSaveCounter = (e) => {
    e.preventDefault();
    if (!counterForm.name) return;

    let updated;
    if (editingCounter) {
      updated = counters.map(c => 
        c.id === editingCounter.id ? { ...c, ...counterForm } : c
      );
    } else {
      const newCounter = {
        id: `CTR-0${counters.length + 1}`,
        ...counterForm,
        openingDrawerCash: Number(counterForm.openingDrawerCash),
        currentDrawerCash: Number(counterForm.currentDrawerCash)
      };
      updated = [...counters, newCounter];
    }
    setCounters(updated);
    savePosCounters(updated);
    setCounterModalOpen(false);
    triggerSaveNotification('POS Register saved!');
  };

  const handleToggleCounterStatus = (counterId) => {
    const updated = counters.map(c => 
      c.id === counterId 
        ? { ...c, status: c.status === 'Open' ? 'Closed' : 'Open' } 
        : c
    );
    setCounters(updated);
    savePosCounters(updated);
  };

  // Payment Handlers
  const handleTogglePaymentStatus = (pId) => {
    const updated = paymentMethods.map(p => 
      p.id === pId ? { ...p, active: !p.active } : p
    );
    setPaymentMethods(updated);
    savePaymentMethods(updated);
  };

  const handleSavePaymentMethod = (e) => {
    e.preventDefault();
    if (!paymentForm.name) return;

    let updated;
    if (editingPayment) {
      updated = paymentMethods.map(p => 
        p.id === editingPayment.id ? { ...p, ...paymentForm } : p
      );
    } else {
      const newP = {
        id: `PAY-0${paymentMethods.length + 1}`,
        ...paymentForm,
        surcharge: Number(paymentForm.surcharge),
        minAmount: Number(paymentForm.minAmount),
        maxAmount: Number(paymentForm.maxAmount)
      };
      updated = [...paymentMethods, newP];
    }
    setPaymentMethods(updated);
    savePaymentMethods(updated);
    setPaymentModalOpen(false);
    triggerSaveNotification('Payment method saved!');
  };

  // Tax Handlers
  const handleToggleTaxStatus = (taxId) => {
    const updated = taxes.map(t => 
      t.id === taxId ? { ...t, active: !t.active } : t
    );
    setTaxes(updated);
    saveTaxConfig(updated);
  };

  const handleSaveTax = (e) => {
    e.preventDefault();
    if (!taxForm.name) return;

    let updated;
    if (editingTax) {
      updated = taxes.map(t => 
        t.id === editingTax.id ? { ...t, ...taxForm, ratePercent: Number(taxForm.ratePercent) } : t
      );
    } else {
      const newTax = {
        id: `TAX-0${taxes.length + 1}`,
        ...taxForm,
        ratePercent: Number(taxForm.ratePercent)
      };
      updated = [...taxes, newTax];
    }
    setTaxes(updated);
    saveTaxConfig(updated);
    setTaxModalOpen(false);
    triggerSaveNotification('Tax configuration saved!');
  };

  // Discount Handlers
  const handleToggleDiscountStatus = (dId) => {
    const updated = discounts.map(d => 
      d.id === dId ? { ...d, active: !d.active } : d
    );
    setDiscounts(updated);
    saveDiscountConfig(updated);
  };

  const handleSaveDiscount = (e) => {
    e.preventDefault();
    if (!discountForm.code) return;

    let updated;
    if (editingDiscount) {
      updated = discounts.map(d => 
        d.id === editingDiscount.id ? { ...d, ...discountForm } : d
      );
    } else {
      const newD = {
        id: `DSC-0${discounts.length + 1}`,
        ...discountForm,
        code: discountForm.code.toUpperCase(),
        discountPercent: Number(discountForm.discountPercent),
        minSpend: Number(discountForm.minSpend),
        maxDiscountCap: Number(discountForm.maxDiscountCap)
      };
      updated = [...discounts, newD];
    }
    setDiscounts(updated);
    saveDiscountConfig(updated);
    setDiscountModalOpen(false);
    triggerSaveNotification('Promo coupon saved!');
  };

  const handleDeleteDiscount = () => {
    if (!deleteDiscountTarget) return;
    const updated = discounts.filter(d => d.id !== deleteDiscountTarget.id);
    setDiscounts(updated);
    saveDiscountConfig(updated);
    setDeleteDiscountTarget(null);
    triggerSaveNotification('Coupon removed.');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Save Notification Toast */}
      {saveSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-[#500F1D] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-[#E5A81E]/40 animate-slideDown">
          <CheckCircle2 size={18} className="text-[#E5A81E]" />
          <span className="text-xs font-semibold">{saveSuccess}</span>
        </div>
      )}

      {/* Header & Subtabs */}
      <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#500F1D]/10 flex items-center justify-center text-[#500F1D]">
            <CreditCard size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#500F1D]">POS & System Settings</h1>
            <p className="text-xs text-[#500F1D]/70 font-medium">Terminal parameters, cash drawers, GST rates, loyalty discounts, and guest receipts.</p>
          </div>
        </div>

        <div className="flex items-center bg-[#FAF7F5] p-1.5 rounded-2xl border border-[#E8DDD8] gap-1 overflow-x-auto self-start sm:self-auto">
          {[
            { id: 'pos-config', label: 'POS Terminal' },
            { id: 'counters', label: `Counters (${counters.length})` },
            { id: 'payments', label: `Payment Modes (${paymentMethods.length})` },
            { id: 'tax', label: `Tax Rules (${taxes.length})` },
            { id: 'discounts', label: `Coupons (${discounts.length})` },
            { id: 'receipt', label: 'Receipt Layout' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-[#500F1D] text-white shadow-sm'
                  : 'text-[#500F1D]/70 hover:text-[#500F1D] hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUBTAB 1: POS TERMINAL CONFIGURATION */}
      {activeSubTab === 'pos-config' && (
        <div className="bg-white rounded-3xl border border-[#E8DDD8] p-6 sm:p-8 shadow-sm max-w-4xl">
          <div className="flex items-center gap-3 pb-5 border-b border-[#E8DDD8] mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#500F1D]/10 flex items-center justify-center text-[#500F1D]">
              <Settings size={20} />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#500F1D]">General POS Engine Setup</h2>
              <p className="text-xs text-[#500F1D]/70">Set restaurant identity, tax registration, and billing automation behaviors.</p>
            </div>
          </div>

          <form onSubmit={handleSavePosConfig} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">POS Master Terminal ID</label>
                <input
                  type="text"
                  value={posConfig.terminalId}
                  onChange={(e) => setPosConfig({ ...posConfig, terminalId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Restaurant Legal Trade Name</label>
                <input
                  type="text"
                  value={posConfig.restaurantName}
                  onChange={(e) => setPosConfig({ ...posConfig, restaurantName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Branch / Premise</label>
                <input
                  type="text"
                  value={posConfig.restaurantBranch}
                  onChange={(e) => setPosConfig({ ...posConfig, restaurantBranch: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Currency Symbol</label>
                <input
                  type="text"
                  value={posConfig.currencySymbol}
                  onChange={(e) => setPosConfig({ ...posConfig, currencySymbol: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">GSTIN Registration Number</label>
                <input
                  type="text"
                  value={posConfig.gstin}
                  onChange={(e) => setPosConfig({ ...posConfig, gstin: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">FSSAI Food License Number</label>
                <input
                  type="text"
                  value={posConfig.fssaiNumber}
                  onChange={(e) => setPosConfig({ ...posConfig, fssaiNumber: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Total Amount Rounding</label>
                <select
                  value={posConfig.roundingMode}
                  onChange={(e) => setPosConfig({ ...posConfig, roundingMode: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                >
                  <option value="Nearest Integer">Round to Nearest ₹1</option>
                  <option value="No Rounding">Exact Decimals (₹0.00)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Default Dining Mode</label>
                <select
                  value={posConfig.defaultServiceType}
                  onChange={(e) => setPosConfig({ ...posConfig, defaultServiceType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                >
                  <option value="Dine-In">Dine-In (Table Service)</option>
                  <option value="Takeaway">Takeaway Express</option>
                  <option value="Delivery">Room / Home Delivery</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E8DDD8]">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={posConfig.autoPrintReceiptOnSettle}
                  onChange={(e) => setPosConfig({ ...posConfig, autoPrintReceiptOnSettle: e.target.checked })}
                  className="w-4 h-4 accent-[#500F1D] rounded"
                />
                <span className="text-xs font-bold text-[#500F1D]">Auto-Print Customer Receipt upon Settlement</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={posConfig.allowSplitPayments}
                  onChange={(e) => setPosConfig({ ...posConfig, allowSplitPayments: e.target.checked })}
                  className="w-4 h-4 accent-[#500F1D] rounded"
                />
                <span className="text-xs font-bold text-[#500F1D]">Allow Split Bills Across Multiple Payment Methods</span>
              </label>
            </div>

            <div className="pt-6 border-t border-[#E8DDD8] flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] shadow-sm"
              >
                Save POS Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUBTAB 2: POS COUNTERS & CASH REGISTERS */}
      {activeSubTab === 'counters' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#500F1D]">Billing Registers & Cash Drawers</h2>
              <p className="text-xs text-[#500F1D]/70">Track drawer balances, opening floats, active cashiers, and register shifts.</p>
            </div>
            <button
              onClick={handleOpenAddCounter}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] transition-all shadow-sm"
            >
              <Plus size={16} />
              <span>+ Add Billing Counter</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {counters.map((c) => (
              <div 
                key={c.id} 
                className="bg-white rounded-3xl border border-[#E8DDD8] p-6 shadow-sm flex flex-col justify-between hover:border-[#500F1D]/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#500F1D]/10 text-[#500F1D]">
                      {c.id}
                    </span>
                    <button
                      onClick={() => handleToggleCounterStatus(c.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        c.status === 'Open'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {c.status}
                    </button>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#500F1D] mb-1">{c.name}</h3>
                  <p className="text-xs text-[#500F1D]/70 mb-4">Cashier: <strong>{c.assignedCashier}</strong></p>

                  <div className="space-y-2 p-3 bg-[#FAF7F5] rounded-2xl border border-[#E8DDD8] text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Opening Cash Float:</span>
                      <span className="font-semibold text-[#500F1D]">{formatCurrency(c.openingDrawerCash)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Current Cash in Drawer:</span>
                      <span className="font-bold text-[#500F1D]">{formatCurrency(c.currentDrawerCash)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Shift Commenced:</span>
                      <span className="text-[#500F1D] font-mono">{c.shiftStartTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DDD8] flex items-center justify-between">
                  <span className="text-xs text-[#500F1D]/60">{c.status === 'Open' ? 'Active Shift' : 'Shift Ended'}</span>
                  <button
                    onClick={() => handleOpenEditCounter(c)}
                    className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8]"
                    title="Edit Counter"
                  >
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: PAYMENT METHODS */}
      {activeSubTab === 'payments' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#500F1D]">Tender Payment Gateways & Methods</h2>
              <p className="text-xs text-[#500F1D]/70">Enable or disable accepted tender options, transaction surcharges, and min/max limits.</p>
            </div>
            <button
              onClick={() => {
                setEditingPayment(null);
                setPaymentForm({
                  name: '',
                  provider: 'Payment Gateway',
                  surcharge: 0,
                  minAmount: 1,
                  maxAmount: 100000,
                  active: true
                });
                setPaymentModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] transition-all shadow-sm"
            >
              <Plus size={16} />
              <span>+ Add Payment Mode</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map((p) => (
              <div 
                key={p.id} 
                className="bg-white rounded-3xl border border-[#E8DDD8] p-6 shadow-sm flex flex-col justify-between hover:border-[#500F1D]/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#FAF7F5] border border-[#E8DDD8] text-[#500F1D]">
                      {p.id}
                    </span>
                    <button
                      onClick={() => handleTogglePaymentStatus(p.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        p.active
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}
                    >
                      {p.active ? 'Active' : 'Disabled'}
                    </button>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#500F1D] mb-1">{p.name}</h3>
                  <p className="text-xs text-[#500F1D]/60 mb-4">{p.provider}</p>

                  <div className="p-3 bg-[#FAF7F5] rounded-2xl border border-[#E8DDD8] text-xs space-y-1.5 mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Processing Fee / Surcharge:</span>
                      <span className="font-bold text-[#500F1D]">{p.surcharge}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Accepted Limits:</span>
                      <span className="font-semibold text-[#500F1D]">{formatCurrency(p.minAmount)} – {formatCurrency(p.maxAmount)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DDD8] flex items-center justify-end">
                  <button
                    onClick={() => {
                      setEditingPayment(p);
                      setPaymentForm({
                        name: p.name,
                        provider: p.provider,
                        surcharge: p.surcharge,
                        minAmount: p.minAmount,
                        maxAmount: p.maxAmount,
                        active: p.active
                      });
                      setPaymentModalOpen(true);
                    }}
                    className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8]"
                    title="Edit Payment Method"
                  >
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: TAX CONFIGURATION */}
      {activeSubTab === 'tax' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#500F1D]">GST & Statutory Tax Configuration</h2>
              <p className="text-xs text-[#500F1D]/70">Define Central GST, State GST, Service Charge, and special bar liquor duties.</p>
            </div>
            <button
              onClick={() => {
                setEditingTax(null);
                setTaxForm({
                  name: '',
                  ratePercent: 2.5,
                  applicableOn: 'All Food & Beverage',
                  active: true
                });
                setTaxModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] transition-all shadow-sm"
            >
              <Plus size={16} />
              <span>+ Add Tax Rule</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {taxes.map((t) => (
              <div 
                key={t.id} 
                className="bg-white rounded-3xl border border-[#E8DDD8] p-6 shadow-sm flex flex-col justify-between hover:border-[#500F1D]/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#500F1D]/10 text-[#500F1D]">
                      {t.id}
                    </span>
                    <button
                      onClick={() => handleToggleTaxStatus(t.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        t.active
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}
                    >
                      {t.active ? 'Applied' : 'Disabled'}
                    </button>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#500F1D] mb-1">{t.name}</h3>
                  <p className="text-2xl font-bold text-[#500F1D] my-2">{t.ratePercent}%</p>
                  <p className="text-xs text-[#500F1D]/70 bg-[#FAF7F5] p-3 rounded-xl border border-[#E8DDD8] mb-4">
                    Applies to: <strong>{t.applicableOn}</strong>
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8DDD8] flex items-center justify-end">
                  <button
                    onClick={() => {
                      setEditingTax(t);
                      setTaxForm({
                        name: t.name,
                        ratePercent: t.ratePercent,
                        applicableOn: t.applicableOn,
                        active: t.active
                      });
                      setTaxModalOpen(true);
                    }}
                    className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8]"
                    title="Edit Tax Rule"
                  >
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 5: DISCOUNT CONFIGURATION */}
      {activeSubTab === 'discounts' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#500F1D]">Promotional Coupons & Dining Discounts</h2>
              <p className="text-xs text-[#500F1D]/70">Set up marketing promo codes, minimum spend thresholds, and maximum discount caps.</p>
            </div>
            <button
              onClick={() => {
                setEditingDiscount(null);
                setDiscountForm({
                  code: '',
                  title: '',
                  discountPercent: 10,
                  minSpend: 500,
                  maxDiscountCap: 300,
                  validUntil: '2026-12-31',
                  active: true
                });
                setDiscountModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] transition-all shadow-sm"
            >
              <Plus size={16} />
              <span>+ Create Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discounts.map((d) => (
              <div 
                key={d.id} 
                className="bg-white rounded-3xl border border-[#E8DDD8] p-6 shadow-sm flex flex-col justify-between hover:border-[#500F1D]/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-[#E5A81E]/15 text-[#996500] border border-[#E5A81E]/30 tracking-wider">
                      {d.code}
                    </span>
                    <button
                      onClick={() => handleToggleDiscountStatus(d.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        d.active
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {d.active ? 'Active' : 'Expired'}
                    </button>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#500F1D] mb-1">{d.title}</h3>
                  <p className="text-2xl font-bold text-[#500F1D] my-2">{d.discountPercent}% OFF</p>

                  <div className="p-3 bg-[#FAF7F5] rounded-2xl border border-[#E8DDD8] text-xs space-y-1.5 mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Min Order Spend:</span>
                      <span className="font-semibold text-[#500F1D]">{formatCurrency(d.minSpend)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Max Discount Limit:</span>
                      <span className="font-bold text-[#500F1D]">{formatCurrency(d.maxDiscountCap)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Valid Through:</span>
                      <span className="text-[#500F1D] font-mono">{d.validUntil}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DDD8] flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingDiscount(d);
                      setDiscountForm({
                        code: d.code,
                        title: d.title,
                        discountPercent: d.discountPercent,
                        minSpend: d.minSpend,
                        maxDiscountCap: d.maxDiscountCap,
                        validUntil: d.validUntil,
                        active: d.active
                      });
                      setDiscountModalOpen(true);
                    }}
                    className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8]"
                    title="Edit Coupon"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteDiscountTarget(d)}
                    className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-red-50 text-red-600 border border-[#E8DDD8]"
                    title="Delete Coupon"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 6: RECEIPT SETTINGS & PREVIEW */}
      {activeSubTab === 'receipt' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl">
          {/* Settings Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8DDD8] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 pb-5 border-b border-[#E8DDD8] mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#500F1D]/10 flex items-center justify-center text-[#500F1D]">
                <Receipt size={20} />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-[#500F1D]">Guest Dining Bill & Receipt Designer</h2>
                <p className="text-xs text-[#500F1D]/70">Customize printed paper slips and digital SMS/WhatsApp receipt layouts.</p>
              </div>
            </div>

            <form onSubmit={handleSaveReceiptSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Header Banner Text</label>
                <input
                  type="text"
                  value={receiptSettings.headerText}
                  onChange={(e) => setReceiptSettings({ ...receiptSettings, headerText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Restaurant Address Line</label>
                <input
                  type="text"
                  value={receiptSettings.address}
                  onChange={(e) => setReceiptSettings({ ...receiptSettings, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Support Phone</label>
                  <input
                    type="text"
                    value={receiptSettings.phone}
                    onChange={(e) => setReceiptSettings({ ...receiptSettings, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Website</label>
                  <input
                    type="text"
                    value={receiptSettings.website}
                    onChange={(e) => setReceiptSettings({ ...receiptSettings, website: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Footer Thank-You Greeting</label>
                <textarea
                  rows={2}
                  value={receiptSettings.footerGreeting}
                  onChange={(e) => setReceiptSettings({ ...receiptSettings, footerGreeting: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div className="space-y-3 pt-3 border-t border-[#E8DDD8]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={receiptSettings.showTaxBreakdown}
                    onChange={(e) => setReceiptSettings({ ...receiptSettings, showTaxBreakdown: e.target.checked })}
                    className="w-4 h-4 accent-[#500F1D] rounded"
                  />
                  <span className="text-xs font-bold text-[#500F1D]">Itemize CGST / SGST Tax Breakdown Table</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={receiptSettings.showQrFeedback}
                    onChange={(e) => setReceiptSettings({ ...receiptSettings, showQrFeedback: e.target.checked })}
                    className="w-4 h-4 accent-[#500F1D] rounded"
                  />
                  <span className="text-xs font-bold text-[#500F1D]">Print Feedback & Loyalty QR Code at Receipt Bottom</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={receiptSettings.showTipLine}
                    onChange={(e) => setReceiptSettings({ ...receiptSettings, showTipLine: e.target.checked })}
                    className="w-4 h-4 accent-[#500F1D] rounded"
                  />
                  <span className="text-xs font-bold text-[#500F1D]">Print Server Tip / Gratuity Line</span>
                </label>
              </div>

              <div className="pt-6 border-t border-[#E8DDD8] flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] shadow-sm"
                >
                  Save Receipt Settings
                </button>
              </div>
            </form>
          </div>

          {/* Live Thermal Receipt Preview */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E8DDD8] p-6 shadow-md flex flex-col items-center">
            <p className="text-xs font-bold text-[#500F1D]/70 uppercase tracking-wider mb-4">Live Thermal Slip Preview (80mm)</p>
            
            <div className="w-full max-w-sm bg-[#FFFDF9] border border-dashed border-gray-300 p-6 rounded-2xl font-mono text-xs text-gray-800 shadow-inner space-y-3">
              <div className="text-center space-y-1">
                <h4 className="text-base font-bold font-serif uppercase tracking-widest text-black">{posConfig.restaurantName}</h4>
                <p className="text-[10px] text-gray-600">{receiptSettings.headerText}</p>
                <p className="text-[10px] text-gray-600">{receiptSettings.address}</p>
                <p className="text-[10px] text-gray-600">Ph: {receiptSettings.phone} • GSTIN: {posConfig.gstin}</p>
              </div>

              <div className="border-t border-b border-dashed border-gray-400 py-1.5 flex justify-between text-[11px]">
                <span>Table: <strong>T04</strong></span>
                <span>Order #1004</span>
                <span>16 Nov 2026</span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span>1x Truffle Risotto</span>
                  <span>₹420.00</span>
                </div>
                <div className="flex justify-between">
                  <span>1x Chicken Milanese</span>
                  <span>₹380.00</span>
                </div>
                <div className="flex justify-between">
                  <span>2x Hibiscus Berry Cooler</span>
                  <span>₹440.00</span>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-400 pt-2 space-y-1 text-[11px]">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>₹1,240.00</span>
                </div>
                {receiptSettings.showTaxBreakdown && (
                  <>
                    <div className="flex justify-between text-gray-600">
                      <span>CGST (2.5%):</span>
                      <span>₹31.00</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>SGST (2.5%):</span>
                      <span>₹31.00</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-black font-bold text-sm pt-1 border-t border-dashed border-gray-300">
                  <span>NET TOTAL:</span>
                  <span>₹1,302.00</span>
                </div>
              </div>

              {receiptSettings.showTipLine && (
                <div className="border-t border-dashed border-gray-400 pt-2 text-[10px] text-gray-500">
                  <div className="flex justify-between">
                    <span>Server Gratuity / Tip:</span>
                    <span>________________</span>
                  </div>
                </div>
              )}

              {receiptSettings.showQrFeedback && (
                <div className="text-center pt-2">
                  <div className="w-20 h-20 bg-gray-100 border border-gray-300 mx-auto rounded-lg flex items-center justify-center">
                    <QrCode size={40} className="text-gray-700" />
                  </div>
                  <p className="text-[9px] text-gray-500 mt-1">Scan for Digital Bill & Rewards</p>
                </div>
              )}

              <p className="text-center text-[10px] text-gray-600 italic pt-2 border-t border-dashed border-gray-300">
                "{receiptSettings.footerGreeting}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- MODALS --- */}

      {/* COUNTER MODAL */}
      {counterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DDD8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8] mb-6">
              <h3 className="text-xl font-serif font-bold text-[#500F1D]">
                {editingCounter ? 'Edit POS Register' : 'Add POS Register'}
              </h3>
              <button onClick={() => setCounterModalOpen(false)} className="text-[#500F1D]/60 hover:text-[#500F1D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCounter} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Counter Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Terrace Mobile Billing POS"
                  value={counterForm.name}
                  onChange={(e) => setCounterForm({ ...counterForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Assigned Cashier</label>
                <input
                  type="text"
                  placeholder="Priyanka"
                  value={counterForm.assignedCashier}
                  onChange={(e) => setCounterForm({ ...counterForm, assignedCashier: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Opening Cash (₹)</label>
                  <input
                    type="number"
                    value={counterForm.openingDrawerCash}
                    onChange={(e) => setCounterForm({ ...counterForm, openingDrawerCash: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Shift Commenced</label>
                  <input
                    type="text"
                    value={counterForm.shiftStartTime}
                    onChange={(e) => setCounterForm({ ...counterForm, shiftStartTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setCounterModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0A15]"
                >
                  Save Counter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PAYMENT METHOD MODAL */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DDD8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8] mb-6">
              <h3 className="text-xl font-serif font-bold text-[#500F1D]">
                {editingPayment ? 'Edit Payment Method' : 'Add Payment Method'}
              </h3>
              <button onClick={() => setPaymentModalOpen(false)} className="text-[#500F1D]/60 hover:text-[#500F1D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePaymentMethod} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Method Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UPI / BharatQR"
                  value={paymentForm.name}
                  onChange={(e) => setPaymentForm({ ...paymentForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Provider / Gateway</label>
                <input
                  type="text"
                  placeholder="Razorpay / Pine Labs / Bank"
                  value={paymentForm.provider}
                  onChange={(e) => setPaymentForm({ ...paymentForm, provider: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Surcharge (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={paymentForm.surcharge}
                    onChange={(e) => setPaymentForm({ ...paymentForm, surcharge: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Max Limit (₹)</label>
                  <input
                    type="number"
                    value={paymentForm.maxAmount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, maxAmount: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setPaymentModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0A15]"
                >
                  Save Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAX MODAL */}
      {taxModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DDD8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8] mb-6">
              <h3 className="text-xl font-serif font-bold text-[#500F1D]">
                {editingTax ? 'Edit Tax Rule' : 'Add Tax Rule'}
              </h3>
              <button onClick={() => setTaxModalOpen(false)} className="text-[#500F1D]/60 hover:text-[#500F1D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTax} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Tax Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CGST"
                  value={taxForm.name}
                  onChange={(e) => setTaxForm({ ...taxForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Tax Rate (%) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="2.5"
                  value={taxForm.ratePercent}
                  onChange={(e) => setTaxForm({ ...taxForm, ratePercent: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Applicability</label>
                <input
                  type="text"
                  placeholder="All Food & Beverage"
                  value={taxForm.applicableOn}
                  onChange={(e) => setTaxForm({ ...taxForm, applicableOn: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setTaxModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0A15]"
                >
                  Save Tax
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DISCOUNT MODAL */}
      {discountModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DDD8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8] mb-6">
              <h3 className="text-xl font-serif font-bold text-[#500F1D]">
                {editingDiscount ? 'Edit Coupon' : 'Create Promo Coupon'}
              </h3>
              <button onClick={() => setDiscountModalOpen(false)} className="text-[#500F1D]/60 hover:text-[#500F1D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveDiscount} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="ROYAL15"
                    value={discountForm.code}
                    onChange={(e) => setDiscountForm({ ...discountForm, code: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Discount %</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={discountForm.discountPercent}
                    onChange={(e) => setDiscountForm({ ...discountForm, discountPercent: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Campaign Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal VIP Guest Dining"
                  value={discountForm.title}
                  onChange={(e) => setDiscountForm({ ...discountForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Min Spend (₹)</label>
                  <input
                    type="number"
                    value={discountForm.minSpend}
                    onChange={(e) => setDiscountForm({ ...discountForm, minSpend: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Max Cap (₹)</label>
                  <input
                    type="number"
                    value={discountForm.maxDiscountCap}
                    onChange={(e) => setDiscountForm({ ...discountForm, maxDiscountCap: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Valid Until</label>
                <input
                  type="date"
                  value={discountForm.validUntil}
                  onChange={(e) => setDiscountForm({ ...discountForm, validUntil: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setDiscountModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0A15]"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE DISCOUNT CONFIRM */}
      {deleteDiscountTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8DDD8] text-center">
            <h4 className="text-lg font-serif font-bold text-[#500F1D] mb-1">Delete Coupon?</h4>
            <p className="text-xs text-[#500F1D]/70 mb-6">
              Delete coupon "{deleteDiscountTarget.code}"? Customers will no longer be able to apply it.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteDiscountTarget(null)}
                className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDiscount}
                className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PosSystemSettings;
