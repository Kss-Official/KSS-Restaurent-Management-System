import React, { useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import CustomerNavTabs from '../../components/layout/CustomerNavTabs';
import { useAppStore } from '../../store/store';
import { formatCurrency } from '../../utils/helpers';
import { 
  Receipt, 
  Printer, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Share2, 
  ShieldCheck, 
  UtensilsCrossed,
  User,
  Calendar,
  Clock,
  Sparkles,
  CreditCard
} from 'lucide-react';

export const PaymentInvoicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { orders } = useAppStore();
  const invoiceRef = useRef(null);

  // Read orderId from query string
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');

  const selectedOrder = orders.find(o => o.id === orderId) || orders[0] || {
    id: "ORD-501",
    kotId: "KOT-101",
    sessionId: "000001",
    tableNumber: 14,
    waiter: "Julian Vance",
    time: "Today, 07:45 PM",
    items: [
      { id: 1, name: "Dry-Aged Mocha Ribeye", price: 48.00, qty: 2, customizations: "Medium Rare, Mocha Butter" },
      { id: 5, name: "Artisanal Burrata & Heirloom Fig", price: 22.00, qty: 1, customizations: "Nut-Free" },
      { id: 7, name: "Velvet Espresso Crème Brûlée", price: 16.00, qty: 1, customizations: "Gold Flakes" }
    ]
  };

  const calculateSubtotal = () => {
    return (selectedOrder.items || []).reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  const subtotal = calculateSubtotal();
  const cgst = subtotal * 0.025; // 2.5% CGST
  const sgst = subtotal * 0.025; // 2.5% SGST
  const serviceCharge = subtotal * 0.05; // 5% Service Charge
  const grandTotal = subtotal + cgst + sgst + serviceCharge;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16 font-hanken">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Navigation tabs */}
        <CustomerNavTabs />

        {/* Top Action Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EADBCC] shadow-xs print:hidden">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#754D45]">
              Official Tax Invoice & Receipt
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B181C] mt-1">
              Payment & Digital Invoice
            </h1>
            <p className="text-xs sm:text-sm text-[#754D45]">
              Verified tax invoice for your table dining session and fine culinary service.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-[#4C1824] hover:bg-[#38111A] text-white px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#FABE24]" />
              <span>Print / Download PDF</span>
            </button>

            <Link
              to="/customer/profile"
              className="bg-white hover:bg-[#FAF7F2] text-[#4C1824] border border-[#EADBCC] px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xs transition-all hover:scale-105 cursor-pointer"
            >
              <span>Step 8: My Profile</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#4C1824]" />
            </Link>
          </div>
        </div>

        {/* The Printable Branded Luxury Tax Invoice Card */}
        <div 
          ref={invoiceRef}
          className="bg-white rounded-3xl p-6 sm:p-12 border border-[#EADBCC] shadow-lg space-y-8 print:border-none print:shadow-none print:p-0"
        >
          {/* Invoice Header: Lunar Restaurant Branding */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8 border-b-2 border-[#FAF5EE]">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-2xl sm:text-3xl tracking-wide text-[#2B181C]">
                  LUNAR
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-[#4C1824] text-[#FABE24] px-2 py-0.5 rounded-full">
                  Fine Dining
                </span>
              </div>
              <p className="text-xs text-[#754D45] max-w-xs">
                The Promenade Skywalk, Level 44, Central Skyline Avenue<br />
                GSTIN: 27AABCL8890C1Z4 • FSSAI Lic: 11524021000492
              </p>
            </div>

            {/* Invoice Meta */}
            <div className="text-left sm:text-right space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>PAID & VERIFIED</span>
              </div>
              <p className="font-mono text-sm font-bold text-[#2B181C]">
                Invoice #: INV-2026-{selectedOrder.id?.replace(/\D/g, '') || '0501'}
              </p>
              <p className="text-xs text-[#754D45]">
                Order Date: {selectedOrder.time || 'Today, 07:45 PM'}
              </p>
              <p className="text-xs text-[#754D45]">
                Session ID: <strong className="font-mono text-[#2B181C]">#{selectedOrder.sessionId || '000001'}</strong>
              </p>
            </div>
          </div>

          {/* Billed To & Service Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-[#FAF7F2] border border-[#EADBCC] text-xs">
            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider text-[#754D45] text-[10px]">
                Billed To (Customer Details)
              </span>
              <p className="font-bold text-sm text-[#2B181C]">
                {currentUser?.name || "Sophia Montgomery"}
              </p>
              <p className="text-[#754D45]">{currentUser?.email || "customer@auramocha.com"}</p>
              <p className="text-[#754D45]">{currentUser?.phone || "+1 (555) 392-8819"}</p>
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="font-bold uppercase tracking-wider text-[#754D45] text-[10px]">
                Dining Service Details
              </span>
              <p className="font-bold text-sm text-[#4C1824]">
                Table {selectedOrder.tableNumber} • Central Court
              </p>
              <p className="text-[#754D45]">Service Waiter: {selectedOrder.waiter || "Julian Vance"}</p>
              <p className="text-emerald-700 font-semibold flex items-center sm:justify-end gap-1">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Paid via Online UPI (Ref: TXN-9948201)</span>
              </p>
            </div>
          </div>

          {/* Itemized Dishes Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#EADBCC] text-[#754D45] font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">Dish Description</th>
                  <th className="py-3 px-2 text-center">Qty</th>
                  <th className="py-3 px-2 text-right">Rate</th>
                  <th className="py-3 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E5D8]">
                {(selectedOrder.items || []).map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF7F2]/50 transition-colors">
                    <td className="py-3.5 px-2 font-mono text-xs text-[#754D45]">{idx + 1}</td>
                    <td className="py-3.5 px-2">
                      <p className="font-bold text-[#2B181C]">{item.name}</p>
                      {item.customizations && (
                        <p className="text-[11px] text-[#754D45] italic">
                          Pref: {item.customizations}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-2 text-center font-bold text-[#2B181C]">{item.qty}</td>
                    <td className="py-3.5 px-2 text-right text-[#754D45]">{formatCurrency(item.price)}</td>
                    <td className="py-3.5 px-2 text-right font-bold text-[#2B181C]">
                      {formatCurrency(item.price * item.qty)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation Summary Box */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t-2 border-[#FAF5EE]">
            
            {/* Payment Verification Seal */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 max-w-xs space-y-1.5 text-xs text-emerald-900">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Payment Settlement</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                This digital invoice is legally certified by Lunar Restaurant Hospitality Systems. Thank you for dining with us!
              </p>
            </div>

            {/* Calculations */}
            <div className="w-full sm:w-72 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-[#754D45]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#2B181C]">{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between text-[#754D45]">
                <span>CGST (2.5%)</span>
                <span>{formatCurrency(cgst)}</span>
              </div>

              <div className="flex justify-between text-[#754D45]">
                <span>SGST (2.5%)</span>
                <span>{formatCurrency(sgst)}</span>
              </div>

              <div className="flex justify-between text-[#754D45]">
                <span>Restaurant Service Charge (5%)</span>
                <span>{formatCurrency(serviceCharge)}</span>
              </div>

              <div className="pt-2 border-t-2 border-[#4C1824] flex justify-between items-center text-sm sm:text-base font-bold text-[#2B181C]">
                <span>Grand Total</span>
                <span className="font-serif text-lg sm:text-xl text-[#4C1824]">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>

          </div>

          {/* Footer Note */}
          <div className="pt-6 border-t border-[#F0E5D8] text-center text-xs text-[#754D45]">
            <p>Lunar Restaurant • Questions regarding your bill? Contact support@lunar-dining.com or call +1 (555) 800-4499.</p>
          </div>

        </div>

        {/* Bottom Flow Navigation Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-[#EADBCC] shadow-xs print:hidden">
          <Link
            to={`/customer/order-tracking?orderId=${selectedOrder.id}`}
            className="text-xs font-semibold text-[#4C1824] hover:text-[#38111A] flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Step 6: Order Tracking</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/menu"
              className="px-4 py-2 rounded-full border border-[#EADBCC] text-xs font-semibold text-[#754D45] hover:bg-[#FAF7F2]"
            >
              Order Again (Menu)
            </Link>

            <Link
              to="/customer/profile"
              className="px-5 py-2 rounded-full bg-[#4C1824] hover:bg-[#38111A] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <span>Step 8: View My Profile</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FABE24]" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentInvoicePage;
