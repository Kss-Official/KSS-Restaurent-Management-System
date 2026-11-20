import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/store';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../components/common/Button';
import { 
  Tag, 
  Sparkles, 
  Copy, 
  Check, 
  Calendar, 
  ShieldCheck, 
  Percent, 
  ArrowRight,
  Gift
} from 'lucide-react';

export const OffersPage = () => {
  const { offers, setAppliedCoupon } = useAppStore();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleApplyOffer = (offer) => {
    setAppliedCoupon(offer);
    handleCopy(offer.code);
  };

  return (
    <div className="py-12 bg-[#F4EDE8] min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4EDE8] text-[#75696B] text-xs font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-[#C8A66B]" /> Exclusive Patron Privileges
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2528]">
            Special Offers & Seasonal Vouchers
          </h1>
          <p className="text-sm text-[#75696B]">
            Enhance your dining affair at Aura Dining with our signature culinary rewards and private dining privileges.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl p-6 border border-[#E8DDD8] shadow-md hover:border-[#873C50] hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              {/* Gold Ribbon Tag */}
              <div className="absolute top-0 right-0 bg-[#C8A66B] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-4 rounded-bl-xl shadow-sm">
                {offer.discountPercent}% OFF
              </div>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F4EDE8] border border-[#E8DDD8] flex items-center justify-center text-[#75696B] mb-4">
                  <Tag className="w-6 h-6" />
                </div>

                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#75696B]">
                  Voucher Code
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2D2528] mt-0.5">
                  {offer.title}
                </h3>
                <p className="text-xs text-[#75696B] mt-2 leading-relaxed">
                  {offer.description}
                </p>

                {/* Offer Details */}
                <div className="mt-4 pt-4 border-t border-[#E8DDD8] space-y-1.5 text-xs text-[#75696B]">
                  <div className="flex justify-between">
                    <span>Minimum Spend:</span>
                    <strong className="text-[#2D2528]">{formatCurrency(offer.minSpend)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Valid Until:</span>
                    <strong className="text-[#2D2528]">{offer.validUntil}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Eligible Dining:</span>
                    <strong className="text-emerald-700">Dine-In & Private Rooms</strong>
                  </div>
                </div>
              </div>

              {/* Action Area with Copyable Code */}
              <div className="space-y-3 pt-4 border-t border-[#E8DDD8]">
                <div className="p-3 bg-[#F4EDE8] rounded-2xl border border-dashed border-[#873C50] flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-[#75696B] tracking-wider">
                    {offer.code}
                  </span>
                  <button
                    onClick={() => handleCopy(offer.code)}
                    className="flex items-center gap-1 text-xs font-bold text-[#75696B] hover:text-[#75696B] transition-colors"
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <Link to="/customer/cart">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => handleApplyOffer(offer)}
                    icon={ArrowRight}
                  >
                    Apply & Go to Cart
                  </Button>
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* VIP Dining Pass Banner with 6-Color System */}
        <div className="bg-gradient-to-r from-[#542334] via-[#873C50] to-[#542334] text-[#FFFFFF] rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#E8DDD8]">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8A66B]">
              Black Gold Membership
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Unlock Complimentary Sommelier Pairings
            </h3>
            <p className="text-xs text-[#FFFFFF] opacity-95 max-w-xl">
              Patrons with more than 5 reservations receive exclusive table priority, complimentary chef amuses-bouches, and invitations to private vintner dinners.
            </p>
          </div>

          <Link to="/customer/book-table">
            <Button variant="gold" size="lg" className="shrink-0 shadow-lg">
              Reserve a VIP Table
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OffersPage;