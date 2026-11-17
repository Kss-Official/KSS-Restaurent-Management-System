import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Phone, Mail, MapPin, Clock, Globe, Share2, MessageCircle, Sparkles } from 'lucide-react';
import { RESTAURANT_LOCATIONS } from '../../utils/constants';

export const Footer = () => {
  return (
    <footer className="relative bg-[#542334] text-[#FFFFFF] border-t border-[#E8DDD8] shadow-2xl overflow-hidden">
      
      {/* Subtle luxury ambient glow effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#873C50]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C8A66B]/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 border border-[#C8A66B]/40 flex items-center justify-center text-white shadow-lg backdrop-blur-xs">
                <UtensilsCrossed className="w-5 h-5 text-[#C8A66B]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#FFFFFF]">
                  Aura Dining
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C8A66B]">
                  Haute Cuisine & Lounge
                </span>
              </div>
            </div>
            <p className="text-sm text-[#E8D9DD] leading-relaxed font-normal">
              Where culinary craftsmanship meets Burgundy & Champagne elegance. Experience Michelin-inspired tasting menus, artisanal wines, and unforgettable hospitality.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#globe" aria-label="Website" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/20 hover:scale-105 shadow-xs">
                <Globe className="w-4 h-4 text-[#C8A66B]" />
              </a>
              <a href="#social" aria-label="Social Share" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/20 hover:scale-105 shadow-xs">
                <Share2 className="w-4 h-4 text-[#C8A66B]" />
              </a>
              <a href="#messages" aria-label="Messages" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/20 hover:scale-105 shadow-xs">
                <MessageCircle className="w-4 h-4 text-[#C8A66B]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#FFFFFF] tracking-wide border-b border-white/15 pb-2.5 flex items-center gap-2">
              <span>Explore</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C8A66B]" />
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E8D9DD]">
              <li>
                <Link to="/" className="text-[#E8D9DD] hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A66B]"></span>
                  <span>Home Experience</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#E8D9DD] hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A66B]"></span>
                  <span>Our Culinary Story</span>
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-[#E8D9DD] hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A66B]"></span>
                  <span>Seasonal Haute Menu</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#E8D9DD] hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A66B]"></span>
                  <span>Private Dining & Salons</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#E8D9DD] hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A66B]"></span>
                  <span>Reservations & Concierge</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours & Dining */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#FFFFFF] tracking-wide border-b border-white/15 pb-2.5 flex items-center gap-2">
              <span>Dining Hours</span>
              <Clock className="w-3.5 h-3.5 text-[#C8A66B]" />
            </h4>
            <div className="space-y-3 text-sm text-[#E8D9DD]">
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Clock className="w-4 h-4 text-[#C8A66B] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-[#FFFFFF]">Lunch Service</p>
                  <p className="text-xs text-[#E8D9DD]">Mon – Sun: 11:30 AM – 03:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Clock className="w-4 h-4 text-[#C8A66B] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-[#FFFFFF]">Dinner Service</p>
                  <p className="text-xs text-[#E8D9DD]">Mon – Sun: 05:30 PM – 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Clock className="w-4 h-4 text-[#C8A66B] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-[#FFFFFF]">Lounge & Wine Bar</p>
                  <p className="text-xs text-[#E8D9DD]">Fri & Sat: Until 01:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Flagship */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#FFFFFF] tracking-wide border-b border-white/15 pb-2.5 flex items-center gap-2">
              <span>Concierge Desk</span>
              <MapPin className="w-3.5 h-3.5 text-[#C8A66B]" />
            </h4>
            <div className="space-y-3 text-sm text-[#E8D9DD]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8A66B] mt-0.5 shrink-0" />
                <span className="font-medium text-[#FFFFFF]">{RESTAURANT_LOCATIONS[0]}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8A66B] shrink-0" />
                <span className="font-mono font-bold text-[#FFFFFF]">+1 (555) 800-4499</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8A66B] shrink-0" />
                <span className="text-[#FFFFFF] font-medium">concierge@auradining.com</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/customer/book-table"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#873C50] hover:bg-[#6b2c3d] text-[#FFFFFF] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-[1.02]"
                >
                  Reserve Table Online
                </Link>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8D9DD] font-medium">
          <p>© {new Date().getFullYear()} Aura Dining Burgundy & Champagne. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1.5 text-[#C8A66B]">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A66B]" />
            <span>Burgundy & Champagne Design System</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
