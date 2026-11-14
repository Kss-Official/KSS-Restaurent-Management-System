import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store/store';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  UtensilsCrossed,
  ShieldCheck,
  Send
} from 'lucide-react';

export const CartPage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { 
    cart, 
    updateCartQty, 
    removeFromCart, 
    clearCart, 
    tables, 
    sessions, 
    offers, 
    appliedCoupon, 
    setAppliedCoupon, 
    placeOrder 
  } = useAppStore();

  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [selectedTable, setSelectedTable] = useState(2);
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subtotal calculation
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  // Tax & Service Charge
  const tax = Number((subtotal * 0.09).toFixed(2));
  const serviceCharge = Number((subtotal * 0.10).toFixed(2));
  
  // Discount from applied coupon
  let discount = 0;
  if (appliedCoupon) {
    discount = Number((subtotal * (appliedCoupon.discountPercent / 100)).toFixed(2));
  }

  const grandTotal = Math.max(0, Number((subtotal + tax + serviceCharge - discount).toFixed(2)));

  // Coupon handling
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');

    const trimmed = couponInput.trim().toUpperCase();
    const foundOffer = offers.find(o => o.code.toUpperCase() === trimmed && o.active);

    if (!foundOffer) {
      setCouponError('Invalid or expired coupon code. Try WELCOME10 or MOCHA20.');
      return;
    }

    if (subtotal < (foundOffer.minSpend || 0)) {
      setCouponError(`Minimum spend of ${formatCurrency(foundOffer.minSpend)} required for this code.`);
      return;
    }

    setAppliedCoupon(foundOffer);
    setCouponInput('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  // Place order directly
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      // Find active session for selected table
      const activeSession = sessions.find(s => s.tableNumber === Number(selectedTable) && s.status === 'Active');
      const sessionId = activeSession ? activeSession.sessionId : '000001';

      const orderId = placeOrder({
        sessionId,
        tableNumber: Number(selectedTable),
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          notes: orderNotes
        })),
        placedBy: currentUser ? `Customer (${currentUser.name})` : 'Dine-In Customer',
        waiter: 'Julian Vance'
      });

      clearCart();
      setIsSubmitting(false);
      navigate('/customer/orders');
    }, 600);
  };

  return (
    <div className="py-12 bg-[#F4EDE8] min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DDD8]/50 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#754D45]">Table Dining Cart</span>
              <Sparkles className="w-4 h-4 text-[#A2766B]" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#301A18]">Your Curated Selection</h1>
            <p className="text-xs text-[#754D45] mt-1">
              Review your dishes and dispatch them directly to our executive culinary brigade.
            </p>
          </div>

          <Link to="/menu">
            <Button variant="outline" size="sm" icon={UtensilsCrossed}>
              Back to Menu
            </Button>
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DDD8]/50 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F4EDE8] text-[#754D45] mx-auto flex items-center justify-center">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#301A18]">Your Table Order is Empty</h3>
            <p className="text-sm text-[#754D45] max-w-md mx-auto">
              You haven't selected any dishes yet. Browse our exquisite appetizers, signature steaks, and artisan desserts.
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-[#E8DDD8]/50 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#FAF7F5]">
                  <h3 className="font-serif text-xl font-bold text-[#301A18]">
                    Order Items ({cart.reduce((a, b) => a + b.qty, 0)})
                  </h3>
                  <button
                    onClick={clearCart}
                    className="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear Cart
                  </button>
                </div>

                <div className="space-y-4 divide-y divide-[#FAF7F5]">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#E8DDD8]/40"
                        />
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#754D45]">{item.category}</span>
                          <h4 className="font-serif font-bold text-base sm:text-lg text-[#301A18]">
                            {item.name}
                          </h4>
                          <p className="font-mono text-xs font-bold text-[#754D45] mt-0.5">
                            {formatCurrency(item.price)} each
                          </p>
                        </div>
                      </div>

                      {/* Quantity Modifier & Subtotal */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[#E8DDD8] rounded-xl bg-[#F4EDE8] p-1">
                          <button
                            onClick={() => updateCartQty(item.id, item.qty - 1)}
                            className="p-1 rounded-lg hover:bg-white text-[#754D45] transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono font-bold text-xs px-3">{item.qty}</span>
                          <button
                            onClick={() => updateCartQty(item.id, item.qty + 1)}
                            className="p-1 rounded-lg hover:bg-white text-[#754D45] transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right min-w-[70px]">
                          <p className="font-mono font-bold text-sm text-[#301A18]">
                            {formatCurrency(item.price * item.qty)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[10px] text-red-600 hover:underline mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8DDD8]/50 shadow-sm space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#754D45]">
                  Kitchen Preparation & Allergy Notes
                </label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Please bring appetizers together, gluten-free preparation, dressing on the side..."
                  className="w-full text-xs p-3 rounded-xl border border-[#E8DDD8] focus:ring-2 focus:ring-[#754D45]"
                ></textarea>
              </div>
            </div>

            {/* Order Summary & Table Selector */}
            <div className="space-y-6">
              
              {/* Table Selection Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8DDD8]/50 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#301A18]">Table Delivery Details</h3>
                
                <div>
                  <label className="text-xs font-bold uppercase text-[#754D45] block mb-1">
                    Select Your Table Number
                  </label>
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-[#E8DDD8] bg-[#F4EDE8] text-xs font-bold text-[#301A18] focus:ring-2 focus:ring-[#754D45]"
                  >
                    {tables.map(t => (
                      <option key={t.id} value={t.number}>
                        Table {t.number} ({t.status}) {t.activeSessionId ? `[Session #${t.activeSessionId}]` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-[#F4EDE8] border border-[#E8DDD8]/40 flex items-center gap-2 text-xs text-[#754D45]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Orders are synchronized with our front desk and assigned waitstaff.</span>
                </div>
              </div>

              {/* Coupon / Promo Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8DDD8]/50 shadow-sm space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#301A18]">Promotional Privilege</h3>
                
                {appliedCoupon ? (
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {appliedCoupon.code} Applied
                      </p>
                      <p className="text-[11px] text-emerald-700">{appliedCoupon.discountPercent}% Off ({appliedCoupon.title})</p>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. WELCOME10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 p-2.5 rounded-xl border border-[#E8DDD8] text-xs uppercase"
                      />
                      <Button variant="primary" size="sm" type="submit">
                        Apply
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {couponError}
                      </p>
                    )}
                    <p className="text-[10px] text-[#754D45]">
                      Hint: Use <strong>WELCOME10</strong> or <strong>MOCHA20</strong>
                    </p>
                  </form>
                )}
              </div>

              {/* Grand Total Breakdown */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8DDD8]/50 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#301A18]">Order Summary</h3>

                <div className="space-y-2 text-xs border-b border-[#FAF7F5] pb-4">
                  <div className="flex justify-between">
                    <span className="text-[#754D45]">Subtotal:</span>
                    <span className="font-mono font-bold text-[#301A18]">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#754D45]">State Dining Tax (9%):</span>
                    <span className="font-mono font-bold text-[#301A18]">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#754D45]">Staff Service Gratuity (10%):</span>
                    <span className="font-mono font-bold text-[#301A18]">{formatCurrency(serviceCharge)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Privilege Discount ({appliedCoupon.code}):</span>
                      <span className="font-mono">-{formatCurrency(discount)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-baseline pt-2">
                  <span className="font-serif text-lg font-bold text-[#301A18]">Grand Total:</span>
                  <span className="font-serif text-2xl font-bold text-[#754D45]">{formatCurrency(grandTotal)}</span>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full shadow-xl"
                  icon={Send}
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Dispatching to Kitchen...' : `Dispatch Order to Table ${selectedTable}`}
                </Button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartPage;