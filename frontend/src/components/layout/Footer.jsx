import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Phone, Mail, MapPin, Clock, Globe, Share2, MessageCircle, Sparkles } from 'lucide-react';
import { RESTAURANT_LOCATIONS } from '../../utils/constants';

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#301A18] via-[#754D45] to-[#301A18] text-[#FFFFFF] border-t-2 border-[#A2766B]/60 shadow-2xl overflow-hidden">
      
      {/* Subtle luxury ambient glow effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A2766B]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#754D45]/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/15 border border-[#A2766B]/40 flex items-center justify-center text-white shadow-lg backdrop-blur-sm">
                <UtensilsCrossed className="w-5 h-5 text-[#A2766B]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#FFFFFF]">
                  Aura Mocha
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A2766B]">
                  Haute Cuisine & Lounge
                </span>
              </div>
            </div>
            <p className="text-sm text-[#FFFFFF] leading-relaxed font-normal opacity-95">
              Where culinary craftsmanship meets warm mocha & terracotta elegance. Experience Michelin-inspired tasting menus, artisanal espresso roasting, and unforgettable hospitality.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#globe" aria-label="Website" className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all border border-white/20 hover:scale-105 shadow-sm">
                <Globe className="w-4 h-4 text-[#A2766B]" />
              </a>
              <a href="#social" aria-label="Social Share" className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all border border-white/20 hover:scale-105 shadow-sm">
                <Share2 className="w-4 h-4 text-[#A2766B]" />
              </a>
              <a href="#messages" aria-label="Messages" className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-all border border-white/20 hover:scale-105 shadow-sm">
                <MessageCircle className="w-4 h-4 text-[#A2766B]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#FFFFFF] tracking-wide border-b border-[#A2766B]/30 pb-2.5 flex items-center gap-2">
              <span>Explore</span>
              <Sparkles className="w-3.5 h-3.5 text-[#A2766B]" />
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FFFFFF]">
              <li>
                <Link to="/" className="text-[#FFFFFF] opacity-90 hover:opacity-100 hover:text-[#A2766B] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A2766B]"></span>
                  <span>Home Experience</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#FFFFFF] opacity-90 hover:opacity-100 hover:text-[#A2766B] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A2766B]"></span>
                  <span>Our Culinary Story</span>
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-[#FFFFFF] opacity-90 hover:opacity-100 hover:text-[#A2766B] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A2766B]"></span>
                  <span>Seasonal Haute Menu</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#FFFFFF] opacity-90 hover:opacity-100 hover:text-[#A2766B] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A2766B]"></span>
                  <span>Private Dining & Salons</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#FFFFFF] opacity-90 hover:opacity-100 hover:text-[#A2766B] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A2766B]"></span>
                  <span>Reservations & Concierge</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours & Dining */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#FFFFFF] tracking-wide border-b border-[#A2766B]/30 pb-2.5 flex items-center gap-2">
              <span>Dining Hours</span>
              <Clock className="w-3.5 h-3.5 text-[#A2766B]" />
            </h4>
            <div className="space-y-3 text-sm text-[#FFFFFF]">
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Clock className="w-4 h-4 text-[#A2766B] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-[#FFFFFF]">Lunch Service</p>
                  <p className="text-xs text-[#FFFFFF] opacity-90">Mon – Sun: 11:30 AM – 03:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Clock className="w-4 h-4 text-[#A2766B] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-[#FFFFFF]">Dinner Service</p>
                  <p className="text-xs text-[#FFFFFF] opacity-90">Mon – Sun: 05:30 PM – 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Clock className="w-4 h-4 text-[#A2766B] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-[#FFFFFF]">Lounge & Espresso Bar</p>
                  <p className="text-xs text-[#FFFFFF] opacity-90">Fri & Sat: Until 01:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Flagship */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#FFFFFF] tracking-wide border-b border-[#A2766B]/30 pb-2.5 flex items-center gap-2">
              <span>Concierge Desk</span>
              <MapPin className="w-3.5 h-3.5 text-[#A2766B]" />
            </h4>
            <div className="space-y-3 text-sm text-[#FFFFFF]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A2766B] mt-0.5 shrink-0" />
                <span className="font-medium text-[#FFFFFF]">{RESTAURANT_LOCATIONS[0]}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A2766B] shrink-0" />
                <span className="font-mono font-bold text-[#FFFFFF]">+1 (555) 800-4499</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#A2766B] shrink-0" />
                <span className="text-[#FFFFFF] font-medium">concierge@auramocha.com</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/customer/book-table"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#A2766B] hover:bg-[#754D45] text-[#FFFFFF] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-[1.02]"
                >
                  Reserve Table Online
                </Link>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFFFFF] font-medium">
          <p>© {new Date().getFullYear()} Aura Mocha Haute Cuisine. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1.5 text-[#A2766B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mocha, Terracotta & Rose Taupe Luxury Aesthetic</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;